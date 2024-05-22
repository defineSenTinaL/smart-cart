import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ProductDocument } from '../product/product.schema';

export type ObjectId = MongooseSchema.Types.ObjectId;

@Schema({ timestamps: true, collection: 'FeaturedProduct' })
export class FeaturedProduct {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: ObjectId;
}

export type FeaturedProductDocument = FeaturedProduct & Document;

export const FeaturedProductSchema =
  SchemaFactory.createForClass(FeaturedProduct);
