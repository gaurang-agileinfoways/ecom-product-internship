import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductSchema, Products } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productSchema: Model<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productSchema.create(createProductDto);
  }

  async findAll() {
    return await this.productSchema.find().populate('seller').exec();
  }

  async findOne(_id: string) {
    return await this.productSchema.findById(_id);
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    return await this.productSchema.findByIdAndUpdate(_id, updateProductDto);
  }

  async remove(_id: string) {
    return await this.productSchema.findByIdAndDelete(_id);
  }
}
