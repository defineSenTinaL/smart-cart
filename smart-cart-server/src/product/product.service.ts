import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  private readonly logger = new Logger(ProductService.name);

  async createProduct(
    productData: Partial<Product>,
  ): Promise<ProductDocument | null> {
    const session = await this.productModel.startSession();
    session.startTransaction();

    try {
      if (!productData.title) {
        throw new HttpException(
          'Title is required for creating a product',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slug = slugify(productData.title, { lower: true, trim: true });
      productData.slug = slug;

      const createdProduct = new this.productModel(productData);
      await createdProduct.save({ session });
      await session.commitTransaction();

      this.logger.log(`Product created successfully: ${createdProduct._id}`);
      return createdProduct;
    } catch (error) {
      await session.abortTransaction();
      this.logger.error('Failed to create product', error.stack);
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      session.endSession();
    }
  }

  async getProductById(_id: string): Promise<ProductDocument | null> {
    try {
      // Use populate to fetch the category, subcategory, and subsubcategory information along with the product
      const data = await this.productModel.findById(_id).exec();

      this.logger.log(`got product by id (Product Service)`);
      return data;
    } catch (error) {
      this.logger.error(`${error} Error getting Product (Product Service)`);
      throw new HttpException(
        'Error getting Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRelatedProducts(productId: string): Promise<ProductDocument[]> {
    try {
      const product = await this.getProductById(productId); // Use your existing getProductById method
      // Check if the product is null
      if (!product) {
        this.logger.log(`Product not found (Product Service)`);
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const data = await this.productModel
        .find({ tag: { $in: product.tag } }) // Query for products with matching tags
        .limit(10)
        .exec();
      this.logger.log(`Got related product (Product Service)`);

      return data;
    } catch (error) {
      this.logger.error(
        `${error} Error getting Related Product (Product Service)`,
      );
      throw new HttpException(
        'Error getting Related Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBestSellingProducts(): Promise<ProductDocument[]> {
    try {
      // Query for the best-selling products, you can define your own logic here
      const data = await this.productModel
        .find()
        .sort({ sold: -1 }) // Sort by the 'sold' field in descending order
        .limit(10)
        .exec();

      this.logger.log(`Got best selling product (Product Service)`);

      return data;
    } catch (error) {
      this.logger.error(
        `${error} Error getting best selling Product (Product Service)`,
      );
      throw new HttpException(
        'Error getting best selling Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getNewlyAddedProducts(): Promise<ProductDocument[]> {
    try {
      // Query for the newly added products, you can define your own logic here
      const data = await this.productModel
        .find()
        .sort({ createdAt: -1 }) // Sort by the 'createdAt' field in descending order
        .limit(10)
        .exec();

      this.logger.log(`Got newly added product (Product Service)`);

      return data;
    } catch (error) {
      this.logger.error(
        `${error} Error getting newly added Product (Product Service)`,
      );
      throw new HttpException(
        'Error getting newly added Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
