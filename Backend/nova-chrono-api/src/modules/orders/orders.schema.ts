import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop([
    {
      productId: { type: String, required: true }, // Could be ObjectId ref
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ])
  items: Record<string, any>[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    default: 'pending',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
