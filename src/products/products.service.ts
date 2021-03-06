import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private configService: ConfigService,
  ) {}

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }

    if (!product) throw new NotFoundException('Could not find product.');

    return product;
  }

  async removeProduct(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Could not find product.');
  }

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });

    const { _id } = await newProduct.save();
    return _id as string;
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
    };
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
    }));
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(id);
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    updatedProduct.save();
  }
}
