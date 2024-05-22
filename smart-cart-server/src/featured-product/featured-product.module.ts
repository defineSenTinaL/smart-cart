import { Module } from '@nestjs/common';
import { FeaturedProductService } from './featured-product.service';
import { FeaturedProductController } from './featured-product.controller';
import { MongooseModule } from '@nestjs/mongoose';

import {
  FeaturedProduct,
  FeaturedProductSchema,
} from './featured-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeaturedProduct.name, schema: FeaturedProductSchema },
    ]),
  ],
  controllers: [FeaturedProductController],
  providers: [FeaturedProductService],
})
export class FeaturedProductModule {}
