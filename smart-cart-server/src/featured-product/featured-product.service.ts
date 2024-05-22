import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FeaturedProduct,
  FeaturedProductDocument,
} from './featured-product.schema';

@Injectable()
export class FeaturedProductService {
  constructor(
    @InjectModel(FeaturedProduct.name)
    private readonly featuredProductModel: Model<FeaturedProductDocument>,
  ) {}

  private readonly logger = new Logger(FeaturedProductService.name);

  async getFeaturedProducts(): Promise<FeaturedProductDocument[]> {
    try {
      const product = await this.featuredProductModel
        .find()
        .populate('product')
        .exec();
      this.logger.log(`get featured products (Featured Product Service)`);
      return product;
    } catch (error) {
      this.logger.error(
        `${error} Error getting featured products (Featured Product Service)`,
      );
      throw new HttpException(
        'Error getting featured products (Featured Product Service)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
