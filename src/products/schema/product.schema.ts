import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/user/schema/user.schema';

@Schema()
export class Products {
  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: [String] })
  images: string[];

  @Prop({
    required: true,
    type: [
      {
        quantity: Number,
        size: String,
      },
    ],
  })
  stock: {
    quantity: number;
    size: string;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  seller: Users;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
