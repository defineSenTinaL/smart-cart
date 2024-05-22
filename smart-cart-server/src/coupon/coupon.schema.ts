import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'Coupon' })
export class Coupon {
  @Prop({ required: true, index: true })
  name: string;

  @Prop()
  percent: number;

  @Prop()
  maxAmount: number;

  @Prop()
  amount: number;

  @Prop({ required: true })
  minAmountRequired: number;

  @Prop({ required: true, type: Date }) // Expiry date field
  expiryDate: Date;

  @Prop({ required: true, default: false }) // Add the isReusable field
  isReusable: boolean;
}

export type CouponDocument = Coupon & Document;
export const CouponSchema = SchemaFactory.createForClass(Coupon);

// User Coupon Usage details
@Schema({ timestamps: true, collection: 'UserCoupon' })
export class UserCoupon {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference the 'User' schema
  userId: string;

  @Prop({ required: true })
  couponId: string;
}

export type UserCouponDocument = UserCoupon & Document;
export const UserCouponSchema = SchemaFactory.createForClass(UserCoupon);
