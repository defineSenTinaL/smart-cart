import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { OrderService } from '../order/order.service';
import { MTIGenerator } from 'src/function/mti-generator';

export type WrapperType<T> = T;

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: WrapperType<OrderService>,
  ) {}

  private readonly logger = new Logger(PaymentService.name);

  async initiatePayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const merchantTransactionId = MTIGenerator.generate();
    const merchantUserId = createPaymentDto.merchantUserId;
    const amount = createPaymentDto.amount;
    const mobileNumber = createPaymentDto.mobileNumber;
    const orderId = createPaymentDto.orderId;
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    // Constructing the payment request
    const paymentRequest = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount,
      redirectUrl: `http:localhost:3000/api/order-status/${merchantTransactionId}`,
      redirectMode: 'POST',
      callbackUrl: `http://localhost:5000/payment/server/${merchantTransactionId}`,
      mobileNumber,
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    // Convert to Base64 encoded payload
    const base64Payload = Buffer.from(JSON.stringify(paymentRequest)).toString(
      'base64',
    );

    // Compute X-Verify/Checksum header
    const checksum = crypto
      .createHash('sha256')
      .update(`${base64Payload}/pg/v1/pay${saltKey}`)
      .digest('hex');
    const xVerify = `${checksum}###${saltIndex}`;

    console.log(xVerify);

    //Send the request
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
          {
            request: base64Payload,
          },
          {
            headers: { 'X-Verify': xVerify },
          },
        ),
      );

      console.log(response);

      await this.orderService.updateMerchantTransactionId(
        merchantTransactionId,
        orderId,
      );

      this.logger.log(
        `Payment initiated successfully ${merchantTransactionId} (Payment Service) `,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `${error.message} Error in payment initialization:  ${merchantTransactionId} (Payment Service) `,
      );

      throw new Error(`Error in payment initialization: ${error.message}`);
    }
  }

  async paymentStatus(merchantTransactionId: string): Promise<any> {
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    // Construct the URL for the GET request
    const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

    // Compute X-Verify header
    const xVerifyString = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;
    const xVerifyHash = crypto
      .createHash('sha256')
      .update(xVerifyString)
      .digest('hex');
    const xVerify = `${xVerifyHash}###${saltIndex}`;

    //Send the request
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify,
            'X-MERCHANT-ID': merchantId,
          },
        }),
      );
      const paymentStatusCode = response.data.code;
      const phonepeTransaction = response.data.data.transactionId;

      await this.orderService.updatePaymentStatus(
        merchantTransactionId,
        paymentStatusCode,
        phonepeTransaction,
      );

      // Schedule reconciliation task for certain statuses
      if (
        [
          'BAD_REQUEST',
          'AUTHORIZATION_FAILED',
          'INTERNAL_SERVER_ERROR',
          'TRANSACTION_NOT_FOUND',
          'PAYMENT_ERROR',
          'PAYMENT_PENDING',
          'PAYMENT_DECLINED',
          'TIMED_OUT',
        ].includes(paymentStatusCode)
      ) {
      }

      this.logger.log(
        `Payment status successfully ${merchantTransactionId} (Payment Service) `,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `${error.message} Error in payment status:  ${merchantTransactionId} (Payment Service) `,
      );
      throw new Error(`Error in checking payment status: ${error.message}`);
    }
  }

  async clientPaymentStatus(merchantTransactionId: string): Promise<any> {
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    // Construct the URL for the GET request
    const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`;

    // Compute X-Verify header
    const xVerifyString = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;
    const xVerifyHash = crypto
      .createHash('sha256')
      .update(xVerifyString)
      .digest('hex');
    const xVerify = `${xVerifyHash}###${saltIndex}`;

    //Send the request
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xVerify,
            'X-MERCHANT-ID': merchantId,
          },
        }),
      );
      console.log(response);
      const paymentStatusCode = response.data.code;
      const phonepeTransaction = response.data.data.transactionId;

      await this.orderService.updatePaymentStatus(
        merchantTransactionId,
        paymentStatusCode,
        phonepeTransaction,
      );

      // Schedule reconciliation task for certain statuses
      if (
        [
          'BAD_REQUEST',
          'AUTHORIZATION_FAILED',
          'INTERNAL_SERVER_ERROR',
          'TRANSACTION_NOT_FOUND',
          'PAYMENT_ERROR',
          'PAYMENT_PENDING',
          'PAYMENT_DECLINED',
          'TIMED_OUT',
        ].includes(paymentStatusCode)
      ) {
      }

      this.logger.log(
        `Client payment status successfully ${merchantTransactionId} (Payment Service) `,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `${error.message} Error in client payment status: ${merchantTransactionId} (Payment Service) `,
      );
      throw new Error(`Error in checking payment status: ${error.message}`);
    }
  }
}
