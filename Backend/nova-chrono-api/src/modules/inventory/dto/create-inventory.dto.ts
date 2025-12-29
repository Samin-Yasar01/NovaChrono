import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({
    description: 'The ID of the product',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
