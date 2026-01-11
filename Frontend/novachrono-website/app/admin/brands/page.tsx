'use client';

import { useEffect, useState } from 'react';
import { getBrands } from '@/actions/brands/service';
import BrandsClient from '@/components/admin/brands-client';

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (error) {
                console.error("Failed to fetch brands", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading brands...</div>
            </div>
        );
    }

    return <BrandsClient initialBrands={brands} />;
}
