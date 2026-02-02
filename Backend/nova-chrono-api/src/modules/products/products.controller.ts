import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ImagesService } from './images.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get(':productId/images')
  @ApiOperation({ summary: 'Get all images for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'List of product images' })
  async getProductImages(@Param('productId') productId: string) {
    return this.imagesService.findByProductId(productId);
  }

  @UseGuards(ApiKeyGuard)
  @Post(':productId/images')
  @ApiOperation({ summary: 'Add images to a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiBody({ type: [CreateImageDto] })
  @ApiResponse({ status: 201, description: 'Images added successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async addProductImages(
    @Param('productId') productId: string,
    @Body() createImageDtos: CreateImageDto[],
  ) {
    // Ensure all images belong to the correct product
    const imageDtos = createImageDtos.map((dto) => ({
      ...dto,
      productId,
    }));
    return this.imagesService.createBatch(imageDtos);
  }

  @UseGuards(ApiKeyGuard)
  @Patch('images/:imageId')
  @ApiOperation({ summary: 'Update an image' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiBody({ type: UpdateImageDto })
  @ApiResponse({ status: 200, description: 'Image updated successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async updateImage(
    @Param('imageId') imageId: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(imageId, updateImageDto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete('images/:imageId')
  @ApiOperation({ summary: 'Delete an image' })
  @ApiParam({ name: 'imageId', description: 'Image ID' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async deleteImage(@Param('imageId') imageId: string) {
    return this.imagesService.remove(imageId);
  }
}
