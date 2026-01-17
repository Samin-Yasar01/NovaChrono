'use server';

import { serverApiCall } from '../api-action';
import { Api_path } from '../../constant/api';

export const getProductImages = async (productId: string) => {
    return await serverApiCall(Api_path.PRODUCTS.IMAGES.LIST(productId));
};

export const addProductImages = async (productId: string, images: any[]) => {
    return await serverApiCall(
        Api_path.PRODUCTS.IMAGES.CREATE(productId),
        'POST',
        images,
    );
};

export const updateProductImage = async (imageId: string, data: any) => {
    return await serverApiCall(
        Api_path.PRODUCTS.IMAGES.UPDATE(imageId),
        'PATCH',
        data,
    );
};

export const deleteProductImage = async (imageId: string) => {
    return await serverApiCall(
        Api_path.PRODUCTS.IMAGES.DELETE(imageId),
        'DELETE',
    );
};
