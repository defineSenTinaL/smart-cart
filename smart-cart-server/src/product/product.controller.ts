import { ProductDocument } from './product.schema';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
//import { ProductExceptionFilter } from 'src/filters/product-exception-filter';
@Controller('product')
//@UseFilters(ProductExceptionFilter)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') _id: string) {
    const data = this.productService.getProductById(_id);
    return data;
  }

  @Post('add')
  async createProduct(@Body() productData: Partial<ProductDocument>) {
    await this.productService.createProduct(productData);
    return { status: 200, message: 'Product created successfully' };
  }

  @Get('related-products/:productId')
  async getRelatedProducts(@Param('productId') productId: string) {
    const data = await this.productService.getRelatedProducts(productId);
    return data;
  }

  @Get('best-selling-products')
  async getBestSellingProducts() {
    const data = await this.productService.getBestSellingProducts();
    return data;
  }

  @Get('newly-added-products')
  async getNewlyAddedProducts() {
    const data = await this.productService.getNewlyAddedProducts();
    return data;
  }
}
