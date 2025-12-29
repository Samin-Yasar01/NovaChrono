
import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsNumber()
    @Min(0)
    totalAmount: number;
}
