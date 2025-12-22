import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    // Controller methods will go here
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async createProduct(@Body() body: { name: string, description: string, price: number }) {
        return this.productsService.createProduct(body.name, body.description, body.price);
    }

}
