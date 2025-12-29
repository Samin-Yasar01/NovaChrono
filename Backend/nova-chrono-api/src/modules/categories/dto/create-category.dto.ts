import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Electronic devices and accessories',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
