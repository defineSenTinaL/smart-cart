import { Controller, Get } from '@nestjs/common';
import { FeaturedProductService } from './featured-product.service';
import { FeaturedProductDocument } from './featured-product.schema';

@Controller('featured-products')
export class FeaturedProductController {
  constructor(
    private readonly featuredProductService: FeaturedProductService,
  ) {}

  @Get()
  async getAllFeaturedProducts(): Promise<FeaturedProductDocument[]> {
    return this.featuredProductService.getFeaturedProducts();
  }
}
