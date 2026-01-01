"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/button';
import { useCart } from '@/context/cart-context';
import { ShoppingBag } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    description?: string;
    // image field missing in backend schema, using placeholder
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addToCart({ _id: product._id, name: product.name, price: product.price, quantity: 1 });
    };

    return (
        <Link href={`/product/${product._id}`} className="group block">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-gunmetal-800 rounded-sm border border-white/5 overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5"
            >
                {/* Image Placeholder */}
                <div className="aspect-square bg-gunmetal-900 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-gunmetal-700 font-bold text-6xl select-none group-hover:scale-110 transition-transform duration-500">
                        NC
                    </span>

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
                        <span className="text-gray-400 text-sm">Luxury Series</span>
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
