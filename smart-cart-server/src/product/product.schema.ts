import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

// Define the interface for the Image object
export interface Image {
  url: string;
  fileId: string;
}

// Define the interface for the Product Dimension object
export interface ProductDimension {
  length: number;
  breadth: number;
  height: number;
}

//Define the interface for the Variance object
@Schema({ timestamps: true, collection: 'Variation' })
export class Variation {
  @Prop()
  color: string;

  @Prop()
  quantity: number;

  @Prop()
  size: string;

  @Prop()
  price: number;

  @Prop()
  kharidi: number;

  @Prop()
  mrp: number;

  @Prop({ default: 0 })
  sold: number;
}

export type VariationDocument = HydratedDocument<Variation>;
export const VariationSchema = SchemaFactory.createForClass(Variation);

export enum ProductStatus {
  Active = 'Active',
  Paused = 'Paused',
  Discontinued = 'Discontinued',
}

@Schema({ timestamps: true, collection: 'Product' })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ default: ProductStatus.Active, enum: ProductStatus })
  status: ProductStatus;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop([
    {
      url: { type: String, required: true },
      fileId: { type: String, required: true },
    },
  ])
  image: Image[];

  @Prop({ type: [String], required: true }) // Array of RFID codes
  rfids: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory' })
  sub_category_id: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubSubCategory' })
  sub_sub_category_id: ObjectId;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true, index: true })
  sub_category: string;

  @Prop({ required: true, index: true })
  sub_sub_category: string;

  @Prop({ required: true, type: Object })
  product_dimension: ProductDimension;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  component: string;

  @Prop({ required: true })
  fragile: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ default: 0 })
  review: number;

  @Prop({ default: 0 })
  total_rating_sum: number;

  @Prop({ default: 0 })
  total_ratings_count: number;

  @Prop()
  manufacturer_detail: string;

  @Prop()
  manufacturer_part_number: string;

  @Prop({ required: true })
  warranty: string;

  @Prop()
  mrp: number;

  @Prop()
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  bullet: string[];

  @Prop({ required: true, type: [String], index: true })
  tag: string[]; //

  @Prop()
  color: string;

  @Prop()
  material: string;

  @Prop()
  quantity: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop()
  kharidi: number;

  @Prop({ required: true, unique: true })
  dpin: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  gst: number;

  @Prop()
  state: string;

  @Prop({ required: true })
  gift: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  hsn: number;

  @Prop({ required: true, type: [String] })
  keyword: string[];

  @Prop({ required: true })
  weight: number;

  @Prop()
  shape: string;

  @Prop()
  model: string;

  @Prop()
  style: string;

  @Prop()
  size: string;

  @Prop({ required: true })
  delivery: number;

  @Prop({ required: true })
  return: number;

  @Prop({ type: [Types.ObjectId], ref: 'Variation' })
  variation: ObjectId[];
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
