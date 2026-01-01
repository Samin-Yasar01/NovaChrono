"use client";

import { useProducts } from '@/actions/products/business';
import { useCategories } from '@/actions/categories/business';
import ProductCard from '@/components/product-card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ShopPage() {
    const { products, isLoading: productsLoading } = useProducts();
    const { categories, isLoading: categoriesLoading } = useCategories();
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Filter products based on active category
    // Note: Backend might need a filter endpoint, but for now filtering clientside since dataset is likely small initially
    // Assuming Backend product schema will eventually link to Category. For now getting all products.

    // Mock category filtering logic if products don't have categoryId populated in response,
    // or if we rely on simple all-fetch.
    // In a real scenario, we'd pass ?category=ID to useProducts hook.

    const filteredProducts = activeCategory === 'all'
        ? products
        : products?.filter((p: any) => p.category === activeCategory); // Adjust 'p.category' based on actual data shape

    if (productsLoading || categoriesLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar / Filters */}
                <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Collections</h3>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={cn(
                                        "w-full text-left py-1 text-sm transition-colors",
                                        activeCategory === 'all' ? "text-gold-500 font-medium" : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    All Timepieces
                                </button>
                            </li>
                            {categories?.map((category: any) => (
                                <li key={category._id}>
                                    <button
                                        onClick={() => setActiveCategory(category._id)}
                                        className={cn(
                                            "w-full text-left py-1 text-sm transition-colors",
                                            activeCategory === category._id ? "text-gold-500 font-medium" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-grow">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">Shop All</h1>
                        <p className="text-gray-400 text-sm">Showing {filteredProducts?.length || 0} results</p>
                    </div>

                    {!filteredProducts?.length ? (
                        <div className="text-center py-20 bg-gunmetal-800 rounded-sm border border-white/5">
                            <p className="text-gray-400">No timepieces found in this collection.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredProducts.map((product: any) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
