'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { createProduct, updateProduct } from '@/actions/products/service';
import { addProductImages, getProductImages, deleteProductImage } from '@/actions/products/image-service';
import { getCategories } from '@/actions/categories/service';
import { getBrands } from '@/actions/brands/service';
import { Category } from '@/actions/categories/types';
import { Brand } from '@/actions/brands/types';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from './image-upload';

interface ImageUploadItem {
    id: string;
    name: string;
    url: string;
    preview?: string;
    order: number;
}

interface ProductFormProps {
    initialData?: {
        _id?: string;
        name: string;
        price: number;
        description?: string;
        category?: any;
        brand?: any;
    };
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        brand: '',
    });
    const [images, setImages] = useState<ImageUploadItem[]>([]);
    const [existingImages, setExistingImages] = useState<ImageUploadItem[]>([]);
    const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isLoadingBrands, setIsLoadingBrands] = useState(true);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setIsLoadingCategories(false);
            }
        };

        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (err) {
                console.error("Failed to load brands", err);
            } finally {
                setIsLoadingBrands(false);
            }
        };

        fetchCategories();
        fetchBrands();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                price: initialData.price.toString(),
                description: initialData.description || '',
                category: typeof (initialData as any).category === 'object'
                    ? (initialData as any).category?._id
                    : (initialData as any).category || '',
                brand: typeof (initialData as any).brand === 'object'
                    ? (initialData as any).brand?._id
                    : (initialData as any).brand || '',
            });

            // Fetch existing images if editing
            if (isEdit && initialData._id) {
                fetchExistingImages(initialData._id);
            }
        }
    }, [initialData, isEdit]);

    const fetchExistingImages = async (productId: string) => {
        setIsLoadingImages(true);
        try {
            const imgs = await getProductImages(productId);
            const formattedImages = imgs.map((img: any, idx: number) => ({
                id: img._id,
                name: img.name,
                url: img.url,
                preview: img.url,
                order: img.order ?? idx,
            }));
            setExistingImages(formattedImages);
        } catch (err) {
            console.error("Failed to load existing images", err);
        } finally {
            setIsLoadingImages(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const payload = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                category: formData.category || undefined,
                brand: formData.brand || undefined,
            };

            let productId: string;

            if (isEdit && initialData?._id) {
                await updateProduct(initialData._id, payload);
                productId = initialData._id;
            } else {
                const response = await createProduct(payload);
                productId = response._id;
            }

            // Delete removed images
            if (removedImageIds.length > 0) {
                for (const imageId of removedImageIds) {
                    await deleteProductImage(imageId);
                }
            }

            // Only add new images (those without MongoDB _id)
            const newImages = images.filter(img => !img.id.match(/^[0-9a-fA-F]{24}$/));
            if (newImages.length > 0) {
                const imagePayload = newImages.map((img) => ({
                    name: img.name,
                    url: img.url,
                    productId,
                    order: img.order,
                }));
                await addProductImages(productId, imagePayload);
            }

            await mutate('products-list');
            router.push('/admin/products');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Link>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {isEdit ? 'Edit Product' : 'Create Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Wireless Earbuds"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price ($)
                        </label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            disabled={isLoadingCategories}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option value="">Select a category...</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Brand
                        </label>
                        <select
                            id="brand"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            disabled={isLoadingBrands}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option value="">Select a brand...</option>
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product details..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product Images
                    </label>
                    {isLoadingImages && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading existing images...
                        </div>
                    )}
                    <ImageUpload
                        productId={initialData?._id}
                        onImagesChange={setImages}
                        onRemoveExistingImages={setRemovedImageIds}
                        existingImages={existingImages}
                    />
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || isLoadingImages}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-all"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
