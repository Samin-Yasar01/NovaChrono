import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable()
export class ProductsService {
    // Service methods will go here
    constructor(@InjectModel('Product') private productModel: Model<Product>) { }

    async createProduct(createProductDto: any) {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateProduct(id: string, updateProductDto: any): Promise<Product> {
        const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async deleteProduct(id: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(id).exec();
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}
