import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

@Schema({ _id: true })
export class Address {
  @Prop() // Enable _id for Address
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  addressLine: string;

  @Prop({ required: true })
  street: string;

  @Prop()
  landmark: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: string;

  @Prop()
  addressType: string;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
export class CartProduct {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: ObjectId;

  @Prop({ type: [String], required: true })
  rfids: string[];

  @Prop({ required: true })
  quantity: number;
}

export type CartProductDocument = CartProduct & Document;
export const CartProductSchema = SchemaFactory.createForClass(CartProduct);

@Schema({ _id: false })
export class WishlistProduct {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: ObjectId;
}

export type WishlistProductDocument = WishlistProduct & Document;
export const WishlistProductSchema =
  SchemaFactory.createForClass(WishlistProduct);

@Schema({ timestamps: true, collection: 'User' })
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  mobileNumber: string;

  @Prop({ type: [AddressSchema] })
  address: Address[];

  @Prop({ type: [CartProductSchema] })
  cart: CartProduct[];

  @Prop({ type: [WishlistProductSchema] })
  wishlist: WishlistProduct[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
