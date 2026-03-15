import { IsString, IsNumber, Min, Length, IsMongoId, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Wireless Headphones',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'High-quality wireless headphones with noise cancellation',
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 99.99,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    description: 'The category ID of the product',
    example: '60d1b2c3d4e5f6a7b8c9d0e1',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  category?: string;

  @ApiProperty({
    description: 'The brand ID of the product',
    example: '60d1b2c3d4e5f6a7b8c9d0e1',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  brand?: string;

  @ApiProperty({
    description: 'Type of discount applied to the product',
    example: 'percentage',
    required: false,
    enum: ['percentage', 'fixed'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['percentage', 'fixed'])
  discountType?: string;

  @ApiProperty({
    description: 'Discount value (% or fixed amount)',
    example: 20,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountValue?: number;
}
