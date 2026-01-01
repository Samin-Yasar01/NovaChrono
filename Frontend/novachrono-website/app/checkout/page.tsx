"use client";

import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import { createOrder } from '@/actions/orders/service';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (cart.length === 0) {
        router.push('/cart');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const orderData = {
                customerName: formData.customerName,
                phone: formData.phone,
                address: formData.address,
                items: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal,
                status: 'pending' // Default status
            };

            await createOrder(orderData);
            clearCart();
            router.push('/checkout/success');

        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Checkout</h1>

                <div className="bg-gunmetal-800 p-8 rounded-sm border border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-gunmetal-900 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                placeholder="John Doe"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                            <input
                                required
                                type="tel"
                                className="w-full bg-gunmetal-900 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                placeholder="+1 234 567 890"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Shipping Address</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full bg-gunmetal-900 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                placeholder="123 Luxury Lane, New York, NY"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex justify-between text-lg font-bold text-white mb-6">
                                <span>Total Amount</span>
                                <span className="text-gold-500">${cartTotal.toLocaleString()}</span>
                            </div>

                            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                isLoading={isSubmitting}
                            >
                                Place Order
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
