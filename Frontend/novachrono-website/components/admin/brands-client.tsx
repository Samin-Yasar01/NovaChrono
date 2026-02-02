'use client';

import { useState, useCallback } from 'react';
import { Brand } from '@/actions/brands/types';
import { getBrands } from '@/actions/brands/service';
import BrandTable from '@/components/admin/brand-table';
import BrandForm from '@/components/admin/brand-form';
import { Plus } from 'lucide-react';

interface BrandsClientProps {
    initialBrands: Brand[];
}

export default function BrandsClient({ initialBrands }: BrandsClientProps) {
    const [brands, setBrands] = useState<Brand[]>(initialBrands);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | undefined>(undefined);

    const refreshBrands = useCallback(async () => {
        try {
            const updatedBrands = await getBrands();
            setBrands(updatedBrands);
        } catch (error) {
            console.error('Failed to refresh brands:', error);
        }
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        await refreshBrands();
    }, [refreshBrands]);

    const handleCreate = () => {
        setEditingBrand(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (brand: Brand) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
    };

    const handleFormClose = async () => {
        setIsModalOpen(false);
        await refreshBrands();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Brands</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your product brands
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Brand
                </button>
            </div>

            <BrandTable
                brands={brands}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <BrandForm
                isOpen={isModalOpen}
                brand={editingBrand}
                onClose={handleFormClose}
            />
        </div>
    );
}
