import {
  Controller,
  Post,
  Patch,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { Product } from './product-old.model';
import { ProductsService } from './products-old.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const newProduct: Partial<Product> = {
      title,
      description,
      price,
    };

    const product = await this.productsService.create(newProduct);
    return { product };
  }

  // @Get()
  // async getAllProducts() {
  //   return await this.productsService.getProducts();
  // }

  // @Get(':id')
  // getProduct(
  //   @Param('id') id: string,
  //   @Body('title') title: string,
  //   @Body('desc') desc: string,
  //   @Body('price') price: number,
  // ) {
  //   return this.productsService.getProduct(id);
  // }

  // @Patch(':id')
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body('title') title: string,
  //   @Body('desc') desc: string,
  //   @Body('price') price: number,
  // ): Promise<void> {
  //   await this.productsService.updateProduct(id, title, desc, price);
  //   return null;
  // }

  // @Delete(':id')
  // async removeProduct(@Param('id') id: string): Promise<void> {
  //   await this.productsService.removeProduct(id);
  //   return null;
  // }
}
