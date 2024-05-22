import { IsString, IsNumber, IsObject } from 'class-validator';

class PaymentInstrumentDto {
  @IsString()
  type?: string;
}

export class CreatePaymentDto {
  @IsString()
  merchantId?: string;

  @IsString()
  orderId?: string;

  @IsString()
  merchantTransactionId?: string;

  @IsString()
  merchantUserId?: string;

  @IsNumber()
  amount?: number;

  @IsString()
  redirectUrl?: string;

  @IsString()
  redirectMode?: string;

  @IsString()
  callbackUrl?: string;

  @IsString()
  mobileNumber?: string;

  @IsObject()
  paymentInstrument?: PaymentInstrumentDto;
}
