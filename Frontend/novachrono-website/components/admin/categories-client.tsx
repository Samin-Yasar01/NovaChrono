'use client';

import { useState, useCallback } from 'react';
import { Category } from '@/actions/categories/types';
import { getCategories } from '@/actions/categories/service';
import CategoryTable from '@/components/admin/category-table';
import CategoryForm from '@/components/admin/category-form';
import { Plus } from 'lucide-react';

interface CategoriesClientProps {
    initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    const refreshCategories = useCallback(async () => {
        try {
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Failed to refresh categories:', error);
        }
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        await refreshCategories();
    }, [refreshCategories]);

    const handleCreate = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleFormClose = async () => {
        setIsModalOpen(false);
        await refreshCategories();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your product categories
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CategoryForm
                isOpen={isModalOpen}
                category={editingCategory}
                onClose={handleFormClose}
            />
        </div>
    );
}
