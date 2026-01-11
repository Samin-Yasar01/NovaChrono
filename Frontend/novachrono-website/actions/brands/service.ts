'use server';

import { serverApiCall } from '../../actions/api-action';
import { Api_path } from '../../constant/api';
import { CreateBrandDto, UpdateBrandDto } from './types';

export const getBrands = async () => {
    return await serverApiCall(Api_path.BRANDS.LIST);
};

export const getBrandById = async (id: string) => {
    return await serverApiCall(Api_path.BRANDS.GET_ONE(id));
};

export const createBrand = async (data: CreateBrandDto) => {
    return await serverApiCall(Api_path.BRANDS.CREATE, 'POST', data);
};

export const updateBrand = async (id: string, data: UpdateBrandDto) => {
    return await serverApiCall(Api_path.BRANDS.UPDATE(id), 'PATCH', data);
};

export const deleteBrand = async (id: string) => {
    return await serverApiCall(Api_path.BRANDS.DELETE(id), 'DELETE');
};
