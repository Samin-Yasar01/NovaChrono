"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/button';
import { useCart } from '@/context/cart-context';
import { useProductImages } from '@/actions/products/business';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category?: { _id: string; name: string } | string;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const { images } = useProductImages(product._id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-rotate images every 4 seconds if there are multiple images
    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({ _id: product._id, name: product.name, price: product.price, quantity: 1 });
    };

    const goToPrevious = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const currentImage = images?.[currentImageIndex];
    const hasMultipleImages = images && images.length > 1;

    return (
        <Link href={`/product/${product._id}`} className="group block">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-gunmetal-800 rounded-sm border border-white/5 overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5"
            >
                {/* Image Section */}
                <div className="aspect-square bg-gunmetal-900 relative flex items-center justify-center overflow-hidden">
                    {currentImage ? (
                        <>
                            {/* Product Image */}
                            <img
                                src={currentImage.url}
                                alt={currentImage.name || product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Image Navigation Arrows (visible on hover, only if multiple images) */}
                            {hasMultipleImages && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Placeholder when no images */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="text-gunmetal-700 font-bold text-6xl select-none group-hover:scale-110 transition-transform duration-500">
                                NC
                            </span>
                        </>
                    )}

                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                    <h3 className="text-white font-medium text-lg leading-tight group-hover:text-gold-500 transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">
                            {typeof product.category === 'object' ? product.category?.name : 'Luxury Series'}
                        </span>
                        <span className="text-white font-semibold tracking-wide">
                            ${product.price ? product.price.toLocaleString() : 'N/A'}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
