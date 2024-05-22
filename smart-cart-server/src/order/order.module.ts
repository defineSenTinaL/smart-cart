import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
  Variation,
  VariationSchema,
} from '../product/product.schema';
import {
  Coupon,
  CouponSchema,
  UserCoupon,
  UserCouponSchema,
} from '../coupon/coupon.schema';
import { User, UserSchema } from '../user/user.schema';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Variation.name, schema: VariationSchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: UserCoupon.name, schema: UserCouponSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => PaymentModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
