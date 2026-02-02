'use server';

import { serverApiCall } from '../api-action';
import { Api_path } from '../../constant/api';

export const getDashboardStats = async () => {
    return await serverApiCall(Api_path.ADMIN.DASHBOARD);
};
