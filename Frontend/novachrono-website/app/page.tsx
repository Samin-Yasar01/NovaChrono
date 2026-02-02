"use client";

import Hero from '@/components/hero';
import ProductCard from '@/components/product-card';
import { useProducts } from '@/actions/products/business';
import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { products, isLoading, isError } = useProducts();

  // Show only first 4 products for homepage
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="flex flex-col gap-16 pb-20">
      <Hero />

      {/* Featured Collection */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Featured Collection</h2>
            <p className="text-gray-400">Handpicked for the discerning collector.</p>
          </div>
          <Link href="/shop" className="hidden md:block">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-400 py-12">
            Failed to load products. Please check the backend connection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/shop">
            <Button variant="outline" className="w-full">View All Collection</Button>
          </Link>
        </div>
      </section>

      {/* Conceptual Banner */}
      <section className="relative h-[400px] w-full bg-gunmetal-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h2 className="text-4xl font-bold text-white">Precision in Every Tick</h2>
          <p className="max-w-xl mx-auto text-gray-300">
            Our watches are not just instruments of time, but heirlooms of history.
            Experience the art of watchmaking.
          </p>
          <Button size="lg" className="mt-4">Explore the Arts</Button>
        </div>
      </section>
    </div>
  );
}
