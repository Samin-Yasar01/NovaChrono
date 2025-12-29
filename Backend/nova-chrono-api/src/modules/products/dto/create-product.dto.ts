import { IsString, IsNumber, Min, Length } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @Length(3, 100)
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(1)
    price: number;
}
