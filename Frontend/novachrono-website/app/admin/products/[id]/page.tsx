'use client';

import { use, useState, useEffect } from 'react';
import ProductForm from '@/components/admin/product-form';
import { getProductById } from '@/actions/products/service';
import { Loader2 } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-8 text-center text-red-500">
                {error || 'Product not found'}
            </div>
        );
    }

    return <ProductForm initialData={product} isEdit />;
}
