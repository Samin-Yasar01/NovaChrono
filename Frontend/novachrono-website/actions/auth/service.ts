'use server';

import axios from 'axios';
import { Api_path } from '../../constant/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2341';

export async function validateApiKey(apiKey: string) {
    try {
        await axios.get(`${API_URL}${Api_path.ADMIN.DASHBOARD}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}
