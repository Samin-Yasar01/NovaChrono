import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateInventoryDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(0)
    stock: number;
}
