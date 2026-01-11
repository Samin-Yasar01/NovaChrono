import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
    @ApiProperty({
        description: 'The name of the brand',
        example: 'Rolex',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The description of the brand',
        example: 'Luxury Swiss watchmaker',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;
}