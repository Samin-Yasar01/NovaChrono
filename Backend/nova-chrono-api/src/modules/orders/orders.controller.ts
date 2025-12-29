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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order details' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(ApiKeyGuard)
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
