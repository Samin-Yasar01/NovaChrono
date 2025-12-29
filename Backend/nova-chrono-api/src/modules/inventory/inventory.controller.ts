import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({ status: 200, description: 'List of all inventory items' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inventory item by ID' })
  @ApiParam({ name: 'id', description: 'Inventory item ID' })
  @ApiResponse({ status: 200, description: 'Inventory item details' })
  @ApiResponse({ status: 404, description: 'Inventory item not found' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get inventory by product ID' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Inventory details for the product',
  })
  @ApiResponse({ status: 404, description: 'Product not found in inventory' })
  findByProductId(@Param('productId') productId: string) {
    return this.inventoryService.findByProductId(productId);
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new inventory item' })
  @ApiBody({ type: CreateInventoryDto })
  @ApiResponse({
    status: 201,
    description: 'Inventory item created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an inventory item' })
  @ApiParam({ name: 'id', description: 'Inventory item ID' })
  @ApiBody({ type: UpdateInventoryDto })
  @ApiResponse({
    status: 200,
    description: 'Inventory item updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Inventory item not found' })
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory item' })
  @ApiParam({ name: 'id', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'Inventory item deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Inventory item not found' })
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
