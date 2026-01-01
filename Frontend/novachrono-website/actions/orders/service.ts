import { api } from '../instance';

export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};
