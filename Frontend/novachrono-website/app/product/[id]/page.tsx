"use client";

import { useProduct, useProductImages } from '@/actions/products/business';
import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import ProductImageGallery from '@/components/product-image-gallery';
import { Loader2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';
import { motion } from 'framer-motion';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { product, isLoading, isError } = useProduct(resolvedParams.id);
    const { images } = useProductImages(product?._id);
    const { cart, addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ _id: product._id, name: product.name, price: product.price, quantity });
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <p className="text-red-400">Product not found.</p>
                <Link href="/shop"><Button variant="outline">Back to Shop</Button></Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <ProductImageGallery
                        images={images}
                        productName={product.name}
                    />
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
                        <p className="text-gold-500 text-2xl font-semibold">${product.price.toLocaleString()}</p>
                    </div>

                    <div className="prose prose-invert text-gray-400">
                        <p>{product.description || "Experience the pinnacle of craftsmanship with this exquisite timepiece. Designed for those who appreciate the finer things in life, it combines precision engineering with timeless aesthetics."}</p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400 uppercase tracking-widest">Quantity</span>
                            <div className="flex items-center border border-white/10 rounded-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:bg-white/5 text-white transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:bg-white/5 text-white transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row">
                            <Button
                                size="lg"
                                className="w-full md:w-auto min-w-[200px] cursor-pointer"
                                onClick={handleAddToCart}
                            >
                                <ShoppingBag className="mr-2 w-5 h-5 " /> Add to Cart
                            </Button>
                            {cart.length > 0 && (
                                <Link href="/checkout">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full md:w-auto min-w-[200px] cursor-pointer"
                                    >
                                        Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">SKU</span>
                            <span>NC-{product._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">Warranty</span>
                            <span>2 Year International</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">Shipping</span>
                            <span>Free Worldwide</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">Authenticity</span>
                            <span>Certified Original</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
