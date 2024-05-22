import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ObjectId = MongooseSchema.Types.ObjectId;

@Schema({ _id: false })
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Variation' })
  variationId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;
}

// Convert the Product class into a Mongoose schema
export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema({ _id: false })
export class Address {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  mobile: number;

  @Prop({ type: String, required: true })
  addressLine: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  pincode: string;

  @Prop({ type: String, required: true })
  addressType: string;
}

@Schema({ _id: false })
export class ShipmentDetails {
  @Prop({ index: true })
  order_id: number;

  @Prop({ index: true })
  awb: string;

  @Prop({ index: true })
  shipment_id: number;

  @Prop()
  manifest_url: string;

  @Prop()
  label_url: string;

  @Prop()
  delivered_date: Date;

  // Any additional fields related to the shipment
}

export enum OrderStatus {
  PaymentFailed = 'Payment_Failed',
  Pending = 'Pending',
  Placed = 'Placed',
  Processing = 'Processing',
  Packed = 'Packed',
  Intransit = 'In_Transit',
  OutForDelivery = 'Out_for_delivery',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Returned = 'Returned',
}

export enum PaymentMethod {
  Prepaid = 'Prepaid',
  COD = 'COD',
}

@Schema({ timestamps: true, collection: 'Order' })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ type: Address, required: true })
  shippingAddress: Address;

  @Prop({ default: OrderStatus.Pending, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Prop()
  paymentStatus: string;

  @Prop()
  invoice_url: string;

  @Prop({ default: 0 })
  paymentRetryCount: number;

  @Prop({ type: [Date] })
  paymentRetryAttempts: Date[];

  @Prop({ index: true })
  merchantTransactionId: string;

  @Prop()
  transactionId: string;

  @Prop({ required: true, index: true })
  orderId: string;

  @Prop({ type: [ProductSchema], required: true }) // Use the Mongoose schema for the Product subdocument
  products: Product[];

  @Prop({ type: Types.ObjectId, ref: 'Coupon' })
  coupon: ObjectId;

  @Prop({ required: true })
  orderTotal: number;

  @Prop({ default: 0 })
  shippingCharge: number;

  @Prop()
  total: number;

  @Prop({ type: ShipmentDetails })
  shipment: ShipmentDetails;

  @Prop({ default: false })
  isReturnRequested: boolean;

  @Prop()
  returnRequestDate: Date;

  @Prop({ default: false })
  returnAccepted: boolean;

  @Prop({ default: false })
  returnRejected: boolean;

  @Prop({ default: false })
  returnedItemReceived: boolean;

  @Prop()
  returnedItemReceivedDate: Date;

  @Prop()
  returnReason: string;

  @Prop()
  returnComment: string;

  @Prop()
  returnRejectReason: string;

  @Prop({ default: false })
  returnCancelled: boolean;

  @Prop()
  return_order_id: string;

  @Prop()
  return_shipment_id: string;

  @Prop()
  returnId: string;

  @Prop({ type: Object })
  pickupDetail: any;

  @Prop({ default: false })
  isCancelled: boolean;

  @Prop()
  cancellationDate: Date;

  @Prop({ default: false })
  cancelledItemReceived: boolean;

  @Prop()
  cancelledItemReceivedDate: Date;

  @Prop()
  cancellationReason: string;

  @Prop()
  cancellationComment: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
