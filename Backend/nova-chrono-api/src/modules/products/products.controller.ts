import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @UseGuards(ApiKeyGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }

    @UseGuards(ApiKeyGuard)
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.updateProduct(id, updateProductDto);
    }

    @UseGuards(ApiKeyGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}
