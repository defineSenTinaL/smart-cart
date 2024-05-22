import { Controller, Post, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post()
  // initiatePayment(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentService.initiatePayment(createPaymentDto);
  // }

  @Post('server/:merchantTransactionId')
  async paymentStatus(
    @Param('merchantTransactionId') merchantTransactionId: string,
  ) {
    await this.paymentService.paymentStatus(merchantTransactionId);
  }

  @Get('user/:merchantTransactionId')
  async clientPaymentStatus(
    @Param('merchantTransactionId') merchantTransactionId: string,
  ) {
    const status = await this.paymentService.clientPaymentStatus(
      merchantTransactionId,
    );
    return status;
  }
}
