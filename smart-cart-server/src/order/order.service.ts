// order.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
  OrderStatus,
  PaymentMethod,
  Product,
} from './order.schema';
import { OrderIdGenerator } from '../function/order-id-generator';
import {
  ProductDocument,
  Variation,
  VariationDocument,
} from '../product/product.schema';
import {
  Coupon,
  CouponDocument,
  UserCoupon,
  UserCouponDocument,
} from '../coupon/coupon.schema';
import { User, UserDocument } from '../user/user.schema';
import { PaymentService } from '../payment/payment.service';
import {
  CancellationDataDTO,
  PaymentResponseDTO,
} from './dto/create-order.dto';

export type WrapperType<T> = T;

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    @InjectModel(Variation.name)
    private variationModel: Model<VariationDocument>,
    @InjectModel(UserCoupon.name)
    private userCouponModel: Model<UserCouponDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: WrapperType<PaymentService>,
  ) {}

  private readonly logger = new Logger(OrderService.name);

  async createOrder(
    orderData: Partial<Order>,
  ): Promise<OrderDocument | PaymentResponseDTO | null> {
    // Calculate the total order cost without the discount
    const initialOrderTotal = await this.calculateTotalOrderCost(orderData);

    // Apply coupon discount if applicable
    let finalOrderTotal = await this.applyCouponDiscount(
      orderData,
      initialOrderTotal,
    );

    if (orderData.shippingCharge && orderData.shippingCharge > 0) {
      // If shipping charges exist and are positive, add them to the final order total
      finalOrderTotal += orderData.shippingCharge;
    }

    // Check if the calculated expected order total matches the provided order total
    if (finalOrderTotal !== orderData.orderTotal) {
      this.logger.log(
        `Order total does not match the calculated total. (Order Service)`,
      );
      throw new HttpException(
        'Order total does not match the calculated total.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const session = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      const orders = await this.processAndCreateOrders(orderData, session);

      await this.clearUserCart(orderData.userId, session);

      if (orderData.coupon) {
        await this.handleCouponUsage(
          orderData.coupon,
          orderData.userId,
          session,
        );
      }

      await session.commitTransaction();
      session.endSession();

      // After successful order creation, add a job to the email queue
      const createdOrder = orders[0]; // Assuming the first order is the primary one

      if (orderData.paymentMethod === 'Prepaid') {
        // For prepaid, initiate payment and return its response
        session.endSession(); // End session before payment initiation

        // Assuming you have necessary details like mobileNumber in orderData
        const paymentResponse = await this.handlePayment(
          createdOrder.orderId,
          createdOrder.userId.toString(), // Adjust based on your data structure
          createdOrder.orderTotal,
          createdOrder.shippingAddress.mobile.toString(), // Adjust based on your data structure
        );

        //await this.emailService.enqueueEmailOrderJob(createdOrder.orderId);

        return paymentResponse; // Return the response from initiatePayment
      } else {
        // For COD, just finalize the session and return the created order
        session.endSession();
        //await this.emailService.enqueueEmailOrderJob(createdOrder.orderId);
        this.logger.log(`Order created Successfully (Order Service)`);
        return createdOrder;
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      this.logger.error(`${error} Error creating order (Order Service)`);
      throw error;
    }
  }

  async calculateTotalOrderCost(orderData: Partial<Order>): Promise<number> {
    if (!orderData.products || orderData.products.length === 0) {
      this.logger.log(`Order must have at least one product. (Order Service)`);
      throw new HttpException(
        'Order must have at least one product.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Prepare promises for fetching product and variation info
    const productInfoPromises = orderData.products.map((product) =>
      this.productModel
        .findById(product.productId)
        .exec()
        .then((productInfo) => {
          if (!productInfo) {
            throw new Error(`Product with ID ${product.productId} not found.`);
          }
          return { ...product, productInfo };
        }),
    );

    // Await all product info fetches concurrently
    const productsWithInfo = await Promise.all(productInfoPromises).catch(
      (error) => {
        this.logger.log(error.message);
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      },
    );

    // Now, for variations, we can also process them in parallel if needed
    const totalCalculationPromises = productsWithInfo.map(
      async ({ productInfo, quantity, price, variationId }) => {
        if (variationId) {
          const variation = await this.variationModel
            .findById(variationId)
            .exec();
          if (!variation) {
            throw new Error(`Variation with ID ${variationId} not found.`);
          }
          if (variation.quantity < quantity || variation.price !== price) {
            throw new Error(
              `Invalid quantity or price for variation with ID ${variationId}`,
            );
          }
          return price * quantity;
        } else {
          if (productInfo.price !== price) {
            throw new Error(`Product price does not match the expected price.`);
          }
          return price * quantity;
        }
      },
    );

    // Execute all calculations in parallel
    const totals = await Promise.all(totalCalculationPromises).catch(
      (error) => {
        this.logger.log(error.message);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      },
    );

    // Sum up all the totals
    const expectedOrderTotal = totals.reduce(
      (acc, current) => acc + current,
      0,
    );

    return expectedOrderTotal;
  }

  async applyCouponDiscount(
    orderData: Partial<Order>,
    initialOrderTotal: number,
  ): Promise<number> {
    let adjustedOrderTotal = initialOrderTotal;

    if (orderData.coupon) {
      const couponId = orderData.coupon;

      // Fetch the coupon from the database
      const coupon = await this.couponModel.findById(couponId).exec();

      if (!coupon) {
        this.logger.log(`Coupon not found. (Order Service)`);
        throw new HttpException('Coupon not found.', HttpStatus.NOT_FOUND);
      }

      // Check if the coupon is reusable or if the user has already used it
      if (!coupon.isReusable) {
        const usedCoupon = await this.userCouponModel
          .findOne({
            userId: orderData.userId,
            couponId: couponId,
          })
          .exec();

        if (usedCoupon) {
          this.logger.log(
            `User has already used this non-reusable coupon. (Order Service)`,
          );
          throw new HttpException(
            'This coupon has already been used and is not reusable.',
            HttpStatus.FORBIDDEN,
          );
        }
      }

      const currentDate = new Date();
      if (coupon.expiryDate < currentDate) {
        this.logger.log(`Coupon is expired. (Order Service)`);
        throw new HttpException('Coupon is expired.', HttpStatus.BAD_REQUEST);
      }

      if (adjustedOrderTotal < coupon.minAmountRequired) {
        this.logger.log(
          `Coupon cannot be applied due to minimum amount requirement. (Order Service)`,
        );
        throw new HttpException(
          'Coupon cannot be applied due to minimum amount requirement.',
          HttpStatus.BAD_REQUEST,
        );
      }

      let discountAmount = 0;
      if (coupon.percent) {
        discountAmount = (adjustedOrderTotal * coupon.percent) / 100;
        // Ensure discount does not exceed any maximum amount limit if specified
        if (coupon.maxAmount && discountAmount > coupon.maxAmount) {
          discountAmount = coupon.maxAmount;
        }
      } else if (coupon.amount) {
        discountAmount = coupon.amount;
      }

      adjustedOrderTotal -= discountAmount;
    }

    return adjustedOrderTotal;
  }

  async processAndCreateOrders(
    orderData: Partial<Order>,
    session: any,
  ): Promise<OrderDocument[]> {
    if (!orderData.products || orderData.products.length === 0) {
      this.logger.log(`Order must have at least one product. (Order Service)`);
      throw new HttpException(
        'Order must have at least one product.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const uniqueOrderId = OrderIdGenerator.generate();
    const updatedStatus =
      orderData.paymentMethod === PaymentMethod.COD
        ? OrderStatus.Placed
        : OrderStatus.Pending;

    // Prepare promises for creating orders and updating stock
    const orderPromises = orderData.products.map(async (product) => {
      const { productId, variationId, quantity, price } = product;
      const productTotal = price * quantity;

      // Create order
      const createdOrder = new this.orderModel({
        ...orderData,
        status: updatedStatus,
        orderId: uniqueOrderId,
        products: [product],
        total: productTotal,
      });
      await createdOrder.save({ session });

      // Update stock
      if (variationId) {
        await this.variationModel.updateOne(
          { _id: variationId },
          { $inc: { sold: quantity, quantity: -quantity } },
          { session },
        );
      } else {
        await this.productModel.updateOne(
          { _id: productId },
          { $inc: { sold: quantity, quantity: -quantity } },
          { session },
        );
      }

      return createdOrder;
    });

    // Use Promise.all to wait for all operations to complete
    const orders = await Promise.all(orderPromises);

    return orders;
  }

  async clearUserCart(userId: any, session: any) {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { cart: [] } },
      { session },
    );
  }

  async handleCouponUsage(coupon: any, userId: any, session: any) {
    if (!coupon) return;

    // Assuming `this.userCouponModel` exists and is the correct model for storing used coupons
    const userCoupon = new this.userCouponModel({
      userId,
      couponId: coupon,
    });

    await userCoupon.save({ session });
  }

  async handlePayment(
    orderId: string,
    userId: string,
    amount: number,
    mobileNumber: string,
  ): Promise<any | null> {
    const amountInPaisa = amount * 100; // Convert amount to paisa
    const merchantUserId = userId;

    try {
      const paymentInitiationResponse =
        await this.paymentService.initiatePayment({
          amount: amountInPaisa,
          merchantUserId: merchantUserId,
          mobileNumber: mobileNumber,
          orderId: orderId,
        });

      this.logger.log(`Payment initiated successfully for order ${orderId}`);
      return paymentInitiationResponse;
    } catch (error) {
      this.logger.error(
        `Error in payment initiation for order ${orderId}: ${error.message}`,
      );
    }
  }

  //get particular order by the _id
  async getOrderById(_id: string): Promise<OrderDocument | null> {
    try {
      const order = await this.orderModel
        .findById(_id)
        .populate({
          path: 'products.productId',
          select: 'title image size color return', // Select only title and image fields
        })
        .populate({
          path: 'products.variationId',
          // Here we do not specify `select`, so it will populate all fields of variationId
        })
        .populate({
          path: 'coupon',
          // Here we do not specify `select`, so it will populate all fields of variationId
        })
        .exec();
      this.logger.log(`get order by id (Order Service)`);
      return order;
    } catch (error) {
      this.logger.error(`${error} Error getting order by id (Order Service)`);
      throw new HttpException(
        'Error getting order by id (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get all user orders with pagination.
  // async triggerEmailProcessing(orderId: string): Promise<any> {
  //   const que = await this.emailService.addEmailJob(orderId);
  //   return que;
  // }

  async getUserOrders(userId: string, page: number) {
    const limit = 10; // Fixed limit
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    try {
      const order = await this.orderModel
        .find({ userId: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('orderId createdAt status total products.quantity')
        .populate({
          path: 'products.productId',
          select: 'title image', // Select only title and image fields
        })
        .populate({
          path: 'products.variationId',
          // Here we do not specify `select`, so it will populate all fields of variationId
        })
        .exec();
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async requestOrderCancellation(
    orderId: string,
    data: CancellationDataDTO,
  ): Promise<OrderDocument | null> {
    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) {
        this.logger.log(`Order not found (Order Service)`);
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }

      // Check if the order is eligible for cancellation based on its current status
      if (order.status !== OrderStatus.OutForDelivery) {
        throw new HttpException(
          'Order is not eligible for cancellation.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Update the order status to "Cancelled"
      order.status = OrderStatus.Cancelled;
      order.isCancelled = true;
      order.cancellationReason = data.cancellationReason;
      order.cancellationComment = data.cancellationComment;
      order.status = OrderStatus.Cancelled;
      order.cancellationDate = new Date();
      this.logger.log(
        `Order cancelled successfully ${orderId} (Order Service)`,
      );
      return order.save();
    } catch (error) {
      this.logger.error(
        `${error} | ${orderId} Error cancelling order (Order Service)`,
      );
      throw new HttpException(
        'Error cancelling order (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMerchantTransactionId(
    txnId: string,
    orderId?: string,
  ): Promise<void> {
    try {
      await this.orderModel.updateMany(
        { orderId },
        { merchantTransactionId: txnId },
      );
      this.logger.log(
        `updated order merchant transaction id (Order Service) ${txnId}`,
      );
    } catch (error) {
      this.logger.error(
        `${error} Error updating order merchant transaction id (Order Service)`,
      );
      throw new HttpException(
        'Error updating order merchant transaction id (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCurrentPaymentStatus(
    merchantTransactionId: string,
  ): Promise<string | null> {
    try {
      const order = await this.orderModel.findOne({ merchantTransactionId });
      this.logger.log(
        `fetched current payment status: ${merchantTransactionId} (Order Service)`,
      );
      return order ? order.paymentStatus : null;
    } catch (error) {
      this.logger.error(
        `${error} Error fetching current payment status (Order Service)`,
      );
      throw new HttpException(
        'Error fetching current payment status (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePaymentStatus(
    merchantTransactionId: string,
    paymentStatusCode: string,
    phonepeTransaction: string,
  ): Promise<void> {
    try {
      const currentStatus = await this.getCurrentPaymentStatus(
        merchantTransactionId,
      );

      // Only update if the status has changed
      if (currentStatus !== paymentStatusCode) {
        // Define the update object
        const updateObject: {
          paymentStatus: string;
          transactionId: string;
          status?: OrderStatus;
        } = {
          paymentStatus: paymentStatusCode,
          transactionId: phonepeTransaction,
        };

        // Check if the payment is successful
        if (paymentStatusCode === 'PAYMENT_SUCCESS') {
          updateObject.status = OrderStatus.Placed;
        } else if (
          ['PAYMENT_ERROR', 'PAYMENT_DECLINED'].includes(paymentStatusCode)
        ) {
          updateObject.status = OrderStatus.PaymentFailed;
        }

        // Perform the update
        await this.orderModel.updateMany(
          { merchantTransactionId },
          updateObject,
        );

        this.logger.log(
          `updated order payment (Order Service) ${merchantTransactionId}`,
        );
      } else {
        this.logger.log(
          `No update needed for order payment (Order Service) ${merchantTransactionId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `${error} Error updating order payment (Order Service)`,
      );
      throw new HttpException(
        'Error updating order payment (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrder(orderId: string): Promise<void> {
    const session = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      const orders = await this.orderModel
        .find({ orderId: orderId })
        .session(session)
        .exec();
      if (orders.length === 0) {
        throw new Error('No orders found with the given orderId');
      }

      for (const order of orders) {
        for (const product of order.products) {
          const { productId, variationId, quantity } = product;

          // Check if it's a variation or a regular product
          if (variationId) {
            // Update the variation's quantity and sold count
            await this.variationModel.updateOne(
              { _id: variationId },
              { $inc: { quantity: quantity, sold: -quantity } },
              { session },
            );
          } else {
            // Update the product's quantity and sold count
            await this.productModel.updateOne(
              { _id: productId },
              { $inc: { quantity: quantity, sold: -quantity } },
              { session },
            );
          }
        }
      }

      this.logger.log(
        `updated order quantity and sold (Order Service) ${orderId}`,
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      this.logger.error(
        `${error} Error updating order quantity and sold (Order Service)`,
      );
      throw new HttpException(
        'Error updating order quantity and sold (Order Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      session.endSession();
    }
  }
}

// async createOrder(orderData: Partial<Order>): Promise<OrderDocument | null> {
//   if (!orderData.products || orderData.products.length === 0) {
//     this.logger.log(`Order must have at least one product. (Order Service)`);
//     throw new HttpException(
//       'Order must have at least one product.',
//       HttpStatus.BAD_REQUEST,
//     );
//   }

//   let expectedOrderTotal = 0;

//   for (const product of orderData.products) {
//     const { productId, quantity, price, variationId } = product;

//     // Retrieve the product information from the database
//     const productInfo = await this.productModel.findById(productId).exec();

//     if (!productInfo) {
//       this.logger.log(
//         `Product with ID ${productId} not found. (Order Service)`,
//       );
//       throw new HttpException(
//         `Product with ID ${productId} not found.`,
//         HttpStatus.NOT_FOUND,
//       );
//     }

//     // Check if the product has variations
//     if (variationId) {
//       // If variationId is provided, it's a variation product
//       const variation = await this.variationModel
//         .findById(variationId)
//         .exec();

//       if (!variation) {
//         this.logger.log(
//           `Variation with ID ${variationId} not found. (Order Service)`,
//         );

//         throw new HttpException(
//           `Variation with ID ${variationId} not found.`,
//           HttpStatus.NOT_FOUND,
//         );
//       }

//       if (variation.quantity < quantity || variation.price !== price) {
//         this.logger.log(
//           `Invalid quantity or price for variation with ID ${variationId} (Order Service)`,
//         );

//         throw new HttpException(
//           `Invalid quantity or price for variation with ID ${variationId}`,
//           HttpStatus.BAD_REQUEST,
//         );
//       }

//       const variationTotal = price * quantity;
//       expectedOrderTotal += variationTotal;
//     } else {
//       // Non-variation product
//       if (productInfo.price !== price) {
//         this.logger.log(
//           `Product with ID ${productId} price does not match the expected price. (Order Service)`,
//         );
//         throw new HttpException(
//           `Product with ID ${productId} price does not match the expected price.`,
//           HttpStatus.BAD_REQUEST,
//         );
//       }

//       const productTotal = price * quantity;
//       expectedOrderTotal += productTotal;
//     }
//   }

//   // Check if a discount coupon is provided
//   if (orderData.coupon) {
//     const coupon = orderData.coupon;

//     // Validate the coupon (e.g., check if it meets the minimum amount required)
//     if (expectedOrderTotal < coupon.minAmountRequired) {
//       this.logger.log(
//         `Coupon cannot be applied due to minimum amount requirement. (Order Service)`,
//       );
//       throw new HttpException(
//         'Coupon cannot be applied due to minimum amount requirement.',
//         HttpStatus.BAD_REQUEST,
//       );
//     }

//     // Calculate the discount based on the coupon type (percent or amount)
//     let discountAmount = 0;

//     if (coupon.percent) {
//       discountAmount = (expectedOrderTotal * coupon.percent) / 100;
//     } else if (coupon.amount) {
//       discountAmount = coupon.amount;
//     }

//     // Adjust the expected order total by subtracting the discount
//     expectedOrderTotal -= discountAmount;
//   }

//   // Check if the calculated expected order total matches the provided order total
//   if (expectedOrderTotal !== orderData.orderTotal) {
//     this.logger.log(
//       `Order total does not match the calculated total. (Order Service)`,
//     );
//     throw new HttpException(
//       'Order total does not match the calculated total.',
//       HttpStatus.BAD_REQUEST,
//     );
//   }

//   const session = await this.orderModel.db.startSession();
//   session.startTransaction();

//   try {
//     const { userId, shippingAddress, paymentMethod, coupon } = orderData;

//     const orders: OrderDocument[] = [];
//     const uniqueOrderId = OrderIdGenerator.generate();

//     // Determine the status based on payment method
//     const updatedStatus =
//       paymentMethod === PaymentMethod.COD
//         ? OrderStatus.Placed
//         : OrderStatus.Pending;

//     for (const product of orderData.products) {
//       const { productId, variationId, quantity, price } = product;
//       const productTotal = price * quantity;

//       const createdOrder = new this.orderModel({
//         userId,
//         shippingAddress,
//         status: updatedStatus,
//         orderId: uniqueOrderId,
//         products: [product],
//         paymentMethod,
//         coupon,
//         orderTotal: expectedOrderTotal,
//         total: productTotal,
//       });

//       await createdOrder.save({ session });

//       // Check if it's a variation or a regular product
//       if (variationId) {
//         // Update the variation's quantity and sold count
//         await this.variationModel.updateOne(
//           { _id: variationId },
//           { $inc: { sold: quantity, quantity: -quantity } },
//           { session },
//         );
//       } else {
//         // Update the product's quantity and sold count
//         await this.productModel.updateOne(
//           { _id: productId },
//           { $inc: { sold: quantity, quantity: -quantity } },
//           { session },
//         );
//       }

//       // New: Clear the user's cart
//       await this.userModel.updateOne(
//         { _id: userId },
//         { $set: { cart: [] } }, // Set the cart to an empty array
//         { session },
//       );

//       orders.push(createdOrder);
//     }

//     if (coupon) {
//       // Add the coupon used by the user to UserCoupon collection
//       const userCoupon = new this.userCouponModel({
//         userId,
//         name: coupon.name,
//       });

//       await userCoupon.save({ session });
//     }

//     await session.commitTransaction();
//     session.endSession();

//     // After successful order creation, add a job to the email queue
//     const createdOrder = orders[0]; // Assuming the first order is the primary one
//     await this.emailService.addEmailJob(createdOrder.orderId);

//     this.logger.log(`Order created Successfully  (Order Service)`);
//     return createdOrder;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     this.logger.error(`${error} Error creating order (Order Service)`);
//     throw error;
//   }
// }
