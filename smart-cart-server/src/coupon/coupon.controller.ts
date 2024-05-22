import {
  Controller,
  Get,
  Body,
  Param,
  NotFoundException,
  GoneException,
  ConflictException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get(':couponName')
  @HttpCode(200)
  async applyCoupon(
    @Param('couponName') couponName: string,
    @Param('userId') userId: string,
    @Body('orderTotal') orderTotal: number,
  ) {
    const statusCode = await this.couponService.applyCoupon(
      couponName,
      orderTotal,
      userId,
    );

    if (statusCode === 404) {
      throw new NotFoundException('Coupon not found');
    } else if (statusCode === 410) {
      throw new GoneException('Coupon has expired');
    } else if (statusCode === 409) {
      throw new ConflictException('Coupon has already been used by the user');
    } else if (statusCode === 400) {
      throw new BadRequestException(
        'Order total is less than the minimum required',
      );
    }

    // Return a successful response with a 200 status code
    return { message: 'Coupon applied successfully' };
  }

  @Get()
  async getCoupons() {
    const coupons = await this.couponService.getCoupons();
    return coupons;
  }
}
