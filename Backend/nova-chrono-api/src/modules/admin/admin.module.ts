import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Product, ProductSchema } from '../products/products.schema';
import { Order, OrderSchema } from '../orders/orders.schema';
import { Category, CategorySchema } from '../categories/categories.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Order.name, schema: OrderSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
