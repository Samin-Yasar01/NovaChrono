"use client";

import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't made your choice yet.</p>
                <Link href="/shop">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-grow space-y-6">
                    {cart.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={item._id}
                            className="flex flex-col sm:flex-row items-center gap-6 bg-gunmetal-800 p-6 rounded-sm border border-white/5"
                        >
                            <div className="w-24 h-24 bg-gunmetal-900 rounded-sm flex-shrink-0 flex items-center justify-center text-gunmetal-700 font-bold border border-white/5">
                                NC
                            </div>

                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-medium text-white">{item.name}</h3>
                                <p className="text-gold-500 font-medium mt-1">${item.price.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-white/10 rounded-sm">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="p-2 hover:bg-white/5 text-white transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="p-2 hover:bg-white/5 text-white transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-96 flex-shrink-0">
                    <div className="bg-gunmetal-800 p-6 rounded-sm border border-white/5 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white">${cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white">Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg font-bold text-white mb-8">
                            <span>Total</span>
                            <span className="text-gold-500">${cartTotal.toLocaleString()}</span>
                        </div>

                        <Link href="/checkout" className="block">
                            <Button size="lg" className="w-full">
                                Checkout <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
