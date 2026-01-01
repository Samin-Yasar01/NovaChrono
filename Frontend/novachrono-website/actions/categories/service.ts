import { api } from '../instance';

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};
