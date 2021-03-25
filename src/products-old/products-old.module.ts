import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, ModelName } from './product-old.model';
import { ProductsController } from './products-old.controller';
import { ProductsService } from './products-old.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelName, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsOldModule {}
