'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/actions/categories/service';
import CategoriesClient from '@/components/admin/categories-client';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading categories...</div>
            </div>
        );
    }

    return <CategoriesClient initialCategories={categories} />;
}
