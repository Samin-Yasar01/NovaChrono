'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/lib/cookie-utils';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        deleteCookie('nova_admin_api_key');
        router.replace('/admin/login');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-gray-500">Logging out...</p>
        </div>
    );
}
