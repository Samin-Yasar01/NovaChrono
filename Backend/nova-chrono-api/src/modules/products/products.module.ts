import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products.schema';
import { Image, ImageSchema } from './images.schema';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ImagesService],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
})
export class ProductsModule {}
