import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'The status of the order',
    example: 'shipped',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'shipped', 'delivered', 'cancelled'])
  status?: string;
}
