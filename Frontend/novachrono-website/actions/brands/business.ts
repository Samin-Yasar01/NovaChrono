"use client";

import useSWR from 'swr';
import * as services from './service';

export function useBrands() {
    const { data, error, isLoading } = useSWR('/brands', services.getBrands);

    return {
        brands: data,
        isLoading,
        isError: error,
    };
}

export function useBrand(id: string) {
    const { data, error, isLoading } = useSWR(id ? `/brands/${id}` : null, () => services.getBrandById(id));

    return {
        brand: data,
        isLoading,
        isError: error,
    };
}
