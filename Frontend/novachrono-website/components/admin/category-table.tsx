'use client';

import { useState } from 'react';
import { Category } from '@/actions/categories/types';
import { deleteCategory } from '@/actions/categories/service';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
}

export default function CategoryTable({ categories, onEdit }: CategoryTableProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        setDeletingId(id);
        try {
            await deleteCategory(id);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow border border-gray-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Description</th>
                            <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No categories found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {category.description || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                disabled={deletingId === category._id}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50"
                                                title="Delete"
                                            >
                                                {deletingId === category._id ? (
                                                    <span className="w-4 h-4 block animate-spin border-2 border-current border-t-transparent rounded-full" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
