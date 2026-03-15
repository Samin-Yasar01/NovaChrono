"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/button';
import { useCart } from '@/context/cart-context';
import { useProductImages } from '@/actions/products/business';
import { computeDiscountedPrice } from '@/lib/discount';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category?: { _id: string; name: string } | string;
    discountType?: string | null;
    discountValue?: number | null;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const { images } = useProductImages(product._id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Auto-rotate images every 4 seconds if there are multiple images
    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    // Reset image loaded state when the current image changes
    useEffect(() => {
        setIsImageLoaded(false);
    }, [images, currentImageIndex]);

    const discountedPrice = computeDiscountedPrice(product.price, product.discountType, product.discountValue);
    const effectivePrice = discountedPrice ?? product.price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({ _id: product._id, name: product.name, price: effectivePrice, quantity: 1 });
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
                    {images === undefined ? (
                        // images are still loading — show full skeleton
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-300 dark:bg-zinc-700 animate-pulse">
                            <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-zinc-600" />
                        </div>
                    ) : currentImage ? (
                        <>
                            {/* Product Image */}
                            <div className="absolute inset-0">
                                {/* Skeleton shown while image loads */}
                                {!isImageLoaded && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-300 dark:bg-zinc-700 animate-pulse">
                                        <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-zinc-600" />
                                    </div>
                                )}

                                <img
                                    src={currentImage.url}
                                    alt={currentImage.name || product.name}
                                    onLoad={() => setIsImageLoaded(true)}
                                    className={`absolute inset-0 z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </div>

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
                            {/* Placeholder when images exist but empty */}
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
                        <div className="flex flex-col items-end gap-0.5">
                            {discountedPrice != null && (
                                <span className="text-gray-500 text-xs line-through">
                                    {product.price.toLocaleString()}/-
                                </span>
                            )}
                            <span className={`font-semibold tracking-wide ${discountedPrice != null ? 'text-emerald-400' : 'text-white'}`}>
                                {effectivePrice ? Math.round(effectivePrice).toLocaleString() : 'N/A'}/-
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
