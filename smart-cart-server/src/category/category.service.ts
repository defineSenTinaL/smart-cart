import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
  SubCategory,
  SubCategoryDocument,
  SubSubCategory,
  SubSubCategoryDocument,
} from './category.schema';

// Category
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  private readonly logger = new Logger(CategoryService.name);

  async getAllCategory(): Promise<CategoryDocument[]> {
    try {
      const category = await this.categoryModel.find().exec();
      this.logger.log(`get all category (Category Service)`);
      return category;
    } catch (error) {
      this.logger.error(`${error} Error getting category (Category Service)`);
      throw new HttpException(
        'Error getting category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

//Sub Category
@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,
  ) {}
  private readonly logger = new Logger(CategoryService.name);

  async getAllSubCategory(): Promise<SubCategoryDocument[]> {
    try {
      const category = await this.subCategoryModel.find().exec();
      this.logger.log(`get all sub category (Category Service)`);
      return category;
    } catch (error) {
      this.logger.error(
        `${error} Error getting sub category (Category Service)`,
      );
      throw new HttpException(
        'Error getting sub category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

@Injectable()
export class SubSubCategoryService {
  constructor(
    @InjectModel(SubSubCategory.name)
    private readonly subSubCategoryModel: Model<SubSubCategoryDocument>,
  ) {}
  private readonly logger = new Logger(CategoryService.name);

  async getAllSubSubCategory(): Promise<SubSubCategoryDocument[]> {
    try {
      const category = await this.subSubCategoryModel.find().exec();
      this.logger.log(`get all sub sub category (Category Service)`);
      return category;
    } catch (error) {
      this.logger.error(
        `${error} Error getting sub sub category (Category Service)`,
      );
      throw new HttpException(
        'Error getting sub sub category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
