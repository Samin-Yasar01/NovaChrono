import { api } from '../instance';

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
