"use client";

import useSWR from 'swr';
import * as services from './service';

export function useCategories() {
    const { data, error, isLoading } = useSWR('/categories', services.getCategories);

    return {
        categories: data,
        isLoading,
        isError: error,
    };
}
