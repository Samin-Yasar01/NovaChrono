export interface Brand {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateBrandDto {
    name: string;
    description?: string;
}

export interface UpdateBrandDto extends Partial<CreateBrandDto> { }
