'use server';

import { serverApiCall } from '../../actions/api-action';
import { Api_path } from '../../constant/api';

export const getProducts = async () => {
    return await serverApiCall(Api_path.PRODUCTS.LIST);
};

export const getProductById = async (id: string) => {
    return await serverApiCall(Api_path.PRODUCTS.GET_ONE(id));
};

export const createProduct = async (data: any) => {
    return await serverApiCall(Api_path.PRODUCTS.CREATE, 'POST', data);
};

export const updateProduct = async (id: string, data: any) => {
    return await serverApiCall(Api_path.PRODUCTS.UPDATE(id), 'PATCH', data);
};

export const deleteProduct = async (id: string) => {
    return await serverApiCall(Api_path.PRODUCTS.DELETE(id), 'DELETE');
};
