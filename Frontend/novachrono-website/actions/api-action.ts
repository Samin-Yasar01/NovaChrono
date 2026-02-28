'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2341';
const ADMIN_API_KEY_COOKIE = 'nova_admin_api_key';

export async function serverApiCall(url: string, method: string = 'GET', data?: any) {
    const cookieStore = await cookies();
    const apiKey = cookieStore.get(ADMIN_API_KEY_COOKIE)?.value;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'x-api-key': apiKey } : {}),
    };

    try {
        const response = await fetch(`${API_URL}${url}`, {
            method,
            headers,
            ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
        });

        if (!response.ok) {
            let message = `HTTP ${response.status}`;
            try {
                const errBody = await response.json();
                message = errBody?.message || message;
            } catch {
                // ignore parse errors
            }
            console.error(`Server Action Error [${method} ${url}]:`, message);
            throw new Error(message);
        }

        // Return null for 204 No Content
        if (response.status === 204) return null;

        return response.json();
    } catch (error: any) {
        console.error(`Server Action Error [${method} ${url}]:`, error.message);
        throw new Error(error.message || 'API Request Failed');
    }
}
