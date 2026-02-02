'use server';

import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig, Method } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2341';
const ADMIN_API_KEY_COOKIE = 'nova_admin_api_key';

export async function serverApiCall(url: string, method: Method = 'GET', data?: any) {
    const cookieStore = await cookies();
    const apiKey = cookieStore.get(ADMIN_API_KEY_COOKIE)?.value;

    const config: AxiosRequestConfig = {
        method,
        url: `${API_URL}${url}`,
        headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'x-api-key': apiKey } : {}),
        },
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error: any) {
        console.error(`Server Action Error [${method} ${url}]:`, error.response?.data || error.message);
        // Re-throw so SWR or components can handle it
        throw new Error(error.response?.data?.message || error.message || 'API Request Failed');
    }
}
