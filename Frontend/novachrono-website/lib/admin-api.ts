import axios from 'axios';

const ADMIN_API_KEY_STORAGE_KEY = 'nova_admin_api_key';

export const adminApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2341',
    headers: {
        'Content-Type': 'application/json',
    },
});

adminApi.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const apiKey = localStorage.getItem(ADMIN_API_KEY_STORAGE_KEY);
        if (apiKey) {
            config.headers['x-api-key'] = apiKey;
        }
    }
    return config;
});

export const getAdminApiKey = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(ADMIN_API_KEY_STORAGE_KEY);
    }
    return null;
};

export const setAdminApiKey = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_API_KEY_STORAGE_KEY, key);
    }
};

export const clearAdminApiKey = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(ADMIN_API_KEY_STORAGE_KEY);
    }
};
