"use client";

import { useProducts } from "@/actions/products/business";
import { useCategories } from "@/actions/categories/business";
import ProductCard from "@/components/product-card";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ShopPage() {
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  // Filter products based on active category
  // Note: Backend might need a filter endpoint, but for now filtering clientside since dataset is likely small initially
  // Assuming Backend product schema will eventually link to Category. For now getting all products.

  // Mock category filtering logic if products don't have categoryId populated in response,
  // or if we rely on simple all-fetch.
  // In a real scenario, we'd pass ?category=ID to useProducts hook.

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products?.filter((p: any) => {
          const productCategoryId =
            typeof p.category === "object" ? p.category?._id : p.category;
          return productCategoryId === activeCategory;
        });

  // Compute product counts per category for nicer UI
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products?.forEach((p: any) => {
      const id = typeof p.category === "object" ? p.category?._id : p.category;
      if (!id) return;
      map[id] = (map[id] || 0) + 1;
    });
    return map;
  }, [products]);

  const visibleCategories = categories?.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12 ">
        {/* Sidebar / Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 mt-20">
          <div className="sticky top-20 bg-black backdrop-blur-sm border border-white/6 rounded-lg p-4 shadow-md mt-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">Collections</h3>
              <p className="text-sm text-gray-400">
                Discover curated timepieces
              </p>
            </div>

            <div className="mb-3">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full bg-transparent border border-white/6 rounded-md py-2 px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                      "w-full flex items-center justify-between py-2 px-3 rounded-md transition-all text-sm cursor-pointer",
                      activeCategory === "all"
                        ? "bg-gold-500 text-gold-400 font-medium border border-gold-500"
                        : "text-gray-300 hover:bg-white/5",
                    )}
                  >
                    <span>All Timepieces</span>
                    <span className="text-xs">{products?.length || 0}</span>
                  </button>
                </li>

                {visibleCategories?.map((category: any) => (
                  <li key={category._id}>
                    <button
                      onClick={() => setActiveCategory(category._id)}
                      className={cn(
                        "w-full flex items-center justify-between py-2 px-3 rounded-md transition-all text-sm cursor-pointer",
                        activeCategory === category._id
                          ? "bg-gold-500 text-gold-400 font-medium border border-gold-500"
                          : "text-gray-300 hover:bg-white/5",
                      )}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs">
                        {categoryCounts[category._id] || 0}
                      </span>
                    </button>
                  </li>
                ))}
                {!visibleCategories?.length && (
                  <li>
                    <div className="text-sm text-gray-500 py-2 px-3">
                      No categories match "{search}"
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-grow">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Shop All</h1>
            <p className="text-gray-800 text-sm font-bold">
              Showing {filteredProducts?.length || 0} results
            </p>
          </div>

          {!filteredProducts?.length ? (
            <div className="text-center py-20 bg-gunmetal-800 rounded-sm border border-white/5">
              <p className="text-gray-400">
                No timepieces found in this collection.
              </p>
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
