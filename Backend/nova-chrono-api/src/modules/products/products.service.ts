import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable()
export class ProductsService {
    // Service methods will go here
    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async createProduct(name: string, description: string, price: number) {
        const product = new this.productModel({ name, description, price });
        return product.save();
    }
}
