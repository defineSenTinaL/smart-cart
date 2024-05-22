import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Coupon,
  CouponDocument,
  UserCoupon,
  UserCouponDocument,
} from './coupon.schema';
import { Model } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    @InjectModel(UserCoupon.name)
    private userCouponModel: Model<UserCouponDocument>,
  ) {}
  private readonly logger = new Logger(CouponService.name);

  async applyCoupon(
    couponName: string,
    orderTotal: number,
    userId: string,
  ): Promise<number> {
    try {
      const coupon = await this.couponModel.findOne({ couponName }).exec();

      if (!coupon) {
        this.logger.log(`Coupon not found (Coupon Service)`);

        return 404; // Coupon not found
      }

      // Check if the coupon is expired
      if (coupon.expiryDate < new Date()) {
        this.logger.log(`Gone (coupon expired) (Coupon Service)`);
        return 410; // Gone (coupon expired)
      }

      // Check if the coupon is reusable
      if (!coupon.isReusable) {
        const usedCoupon = await this.userCouponModel
          .findOne({ couponName, userId })
          .exec();

        if (usedCoupon) {
          this.logger.log(
            `Conflict (coupon already used by the user) (Coupon Service)`,
          );
          return 409; // Conflict (coupon already used by the user)
        }
      }

      // Check if the order total meets the minimum amount required for the coupon
      if (orderTotal < coupon.minAmountRequired) {
        this.logger.log(
          `Bad Request (order total is less than the minimum required) (Coupon Service)`,
        );
        return 400; // Bad Request (order total is less than the minimum required)
      }

      this.logger.log(
        `Coupon is valid and order total meets the minimum requirement (Coupon Service)`,
      );

      return 200; // Coupon is valid and order total meets the minimum requirement
    } catch (error) {
      this.logger.error(`${error} Error getting Coupon (Coupon Service)`);
      throw new HttpException(
        'Error getting coupon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCoupons(): Promise<Coupon[]> {
    try {
      const currentDate = new Date();

      const coupons = await this.couponModel
        .find({ expiryDate: { $gte: currentDate } })
        .exec();

      this.logger.log(`get all coupons (Coupon Service)`);

      return coupons;
    } catch (error) {
      this.logger.error(`${error} Error getting Coupon (Coupon Service)`);
      throw new HttpException(
        'Error getting coupon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
