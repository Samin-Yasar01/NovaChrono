import { getCategories } from '@/actions/categories/service';
import CategoriesClient from '@/components/admin/categories-client';

export default async function CategoriesPage() {
    let categories = [];
    try {
        categories = await getCategories();
    } catch (error) {
        console.error("Failed to fetch categories", error);
    }

    return <CategoriesClient initialCategories={categories} />;
}
