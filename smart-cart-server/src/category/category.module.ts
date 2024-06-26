import { Module } from '@nestjs/common';
import {
  CategoryService,
  SubCategoryService,
  SubSubCategoryService,
} from './category.service';
import {
  CategoryController,
  SubCategoryController,
  SubSubCategoryController,
} from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
  SubCategory,
  SubCategorySchema,
  SubSubCategory,
  SubSubCategorySchema,
} from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: SubSubCategory.name, schema: SubSubCategorySchema },
    ]),
  ],
  controllers: [
    CategoryController,
    SubCategoryController,
    SubSubCategoryController,
  ],
  providers: [CategoryService, SubCategoryService, SubSubCategoryService],
})
export class CategoryModule {}
