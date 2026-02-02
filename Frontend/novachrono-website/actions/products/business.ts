"use client";

import useSWR from 'swr';
import * as services from './service';
import * as imageServices from './image-service';

export function useProducts() {
    const { data, error, isLoading } = useSWR('/products', services.getProducts);

    return {
        products: data,
        isLoading,
        isError: error,
    };
}

export function useProduct(id: string) {
    const { data, error, isLoading } = useSWR(id ? `/products/${id}` : null, () => services.getProductById(id));

    return {
        product: data,
        isLoading,
        isError: error,
    };
}

export function useProductImages(productId: string | undefined) {
    const { data, error, isLoading } = useSWR(
        productId ? `/products/${productId}/images` : null,
        productId ? () => imageServices.getProductImages(productId) : null
    );

    return {
        images: data || [],
        isLoading,
        isError: error,
    };
}
