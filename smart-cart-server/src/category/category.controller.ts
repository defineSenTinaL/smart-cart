import { Controller, Get, Res, Logger } from '@nestjs/common';
import {
  CategoryService,
  SubCategoryService,
  SubSubCategoryService,
} from './category.service';
//import { validate } from 'class-validator';

// Category

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    // Assuming you have the category service instance injected in your controller
    const category = await this.categoryService.getAllCategory();
    return category;
  }
}

// Sub Category

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  async getAllSubCategory(@Res() res: any) {
    // Assuming you have the category service instance injected in your controller
    const category = await this.subCategoryService.getAllSubCategory();
    return category;
  }
}

// Sub Sub Category

@Controller('subsubcategory')
export class SubSubCategoryController {
  constructor(private readonly subSubCategoryService: SubSubCategoryService) {}

  @Get()
  async getAllSubSubCategory(@Res() res: any) {
    // Assuming you have the category service instance injected in your controller
    const category = await this.subSubCategoryService.getAllSubSubCategory();
    return category;
  }
}
