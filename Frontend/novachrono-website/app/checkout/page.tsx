"use client";

import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import { createOrder } from '@/actions/orders/service';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        email: '',
        deliveryLocation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const deliveryCharge = formData.deliveryLocation === 'inside' ? 60 : formData.deliveryLocation === 'outside' ? 120 : 0;
    const totalWithDelivery = cartTotal + deliveryCharge;

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    if (cart.length === 0) {
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
                email: formData.email,
                address: formData.address,
                deliveryLocation: formData.deliveryLocation,
                items: cart.map(item => ({
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: totalWithDelivery,
                deliveryCharge,
            };

            await createOrder(orderData);
            clearCart();
            setSuccess(true);
            setTimeout(() => {
                router.push('/checkout/success');
            }, 3000);

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
                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="text-green-400 text-2xl font-bold">✓ Order Placed Successfully!</div>
                            <p className="text-gray-300">A confirmation email has been sent to your email address and our team has been notified.</p>
                            <p className="text-sm text-gray-400">Redirecting to success page...</p>
                        </div>
                    ) : (
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
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-gunmetal-900 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Delivery Location</label>
                            <select
                                required
                                className="w-full bg-gunmetal-900 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                value={formData.deliveryLocation}
                                onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                            >
                                <option value="">Select Location</option>
                                <option value="inside">Inside Dhaka</option>
                                <option value="outside">Outside Dhaka</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Detail Address</label>
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
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Delivery Charge</span>
                                    <span className="text-white">{deliveryCharge} Taka</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-white mb-6">
                                <span>Total Amount</span>
                                <span className="text-gold-500">${totalWithDelivery.toLocaleString()}</span>
                            </div>

                            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full cursor-pointer"
                                isLoading={isSubmitting}
                            >
                                Place Order
                            </Button>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </div>
    );
}
