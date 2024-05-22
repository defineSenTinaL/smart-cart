import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema, UserCouponSchema } from './coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coupon', schema: CouponSchema },
      { name: 'UserCoupon', schema: UserCouponSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
