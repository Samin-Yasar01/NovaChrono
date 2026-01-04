'use server';

import { serverApiCall } from '../../actions/api-action';
import { Api_path } from '../../constant/api';

export const createOrder = async (orderData: any) => {
    return await serverApiCall(Api_path.ORDERS.CREATE, 'POST', orderData);
};

export const getOrders = async () => {
    return await serverApiCall(Api_path.ORDERS.LIST);
};

export const updateOrderStatus = async (id: string, status: string) => {
    return await serverApiCall(Api_path.ORDERS.UPDATE(id), 'PATCH', { status });
};
