'use server';

import { serverApiCall } from '../../actions/api-action';
import { Api_path } from '../../constant/api';
import { CreateCategoryDto, UpdateCategoryDto } from './types';

export const getCategories = async () => {
    return await serverApiCall(Api_path.CATEGORIES.LIST);
};

export const getCategoryById = async (id: string) => {
    return await serverApiCall(Api_path.CATEGORIES.GET_ONE(id));
};

export const createCategory = async (data: CreateCategoryDto) => {
    return await serverApiCall(Api_path.CATEGORIES.CREATE, 'POST', data);
};

export const updateCategory = async (id: string, data: UpdateCategoryDto) => {
    return await serverApiCall(Api_path.CATEGORIES.UPDATE(id), 'PATCH', data);
};

export const deleteCategory = async (id: string) => {
    return await serverApiCall(Api_path.CATEGORIES.DELETE(id), 'DELETE');
};

