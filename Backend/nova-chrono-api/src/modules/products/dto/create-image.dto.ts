import { IsString, IsMongoId, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'The name of the image',
    example: 'Product Front View',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The URL or path of the image',
    example: '/images/products/watch-001.jpg',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'The product ID this image belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  productId: string;

  @ApiProperty({
    description: 'The order/priority of the image',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
