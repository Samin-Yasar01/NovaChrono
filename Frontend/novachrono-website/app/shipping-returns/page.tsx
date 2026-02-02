'use client';

import { Package, RefreshCw, Clock, Shield, MapPin, CreditCard, Zap, Truck } from 'lucide-react';

export default function ShippingReturnsPage() {
    return (
        <div className="min-h-screen bg-gunmetal-900">
            <div className="container mx-auto px-4 md:px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Shipping & Returns
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Fast, reliable delivery all over Bangladesh with our trusted courier service.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Our Services */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Package className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Our Delivery Services</h2>
                        </div>
                        <div className="space-y-6 text-gray-400">
                            <p className="leading-relaxed text-center mb-6">
                                <strong className="text-white text-lg">Merchant and Customer Satisfaction is Our First Priority</strong>
                                <br />
                                We offer the lowest delivery charge with the highest value along with 100% safety of your product. Our courier service delivers your parcels in every corner of Bangladesh right on time.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Express & Standard Delivery */}
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Zap className="w-6 h-6 text-gold-500" />
                                        <h3 className="text-lg font-semibold text-white">Express & Standard Delivery</h3>
                                    </div>
                                    <p className="leading-relaxed text-sm">
                                        We deliver parcels in metropolitan cities of Dhaka, Chittagong, Sylhet, Khulna, Rajshahi within <strong className="text-white">24-72 hours</strong> and provide express delivery on-demand within <strong className="text-white">4-6 hours</strong> from Pick-up point to customer drop point (Dhaka Only).
                                    </p>
                                </div>

                                {/* Nationwide Delivery */}
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Truck className="w-6 h-6 text-gold-500" />
                                        <h3 className="text-lg font-semibold text-white">Nationwide Delivery</h3>
                                    </div>
                                    <p className="leading-relaxed text-sm">
                                        Our Courier service delivers parcels all over Bangladesh. Home delivery available in every district where you can receive your products at your doorstep within <strong className="text-white">48-72 hours</strong>.
                                    </p>
                                </div>

                                {/* Cash on Delivery */}
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CreditCard className="w-6 h-6 text-gold-500" />
                                        <h3 className="text-lg font-semibold text-white">Cash on Delivery</h3>
                                    </div>
                                    <p className="leading-relaxed text-sm">
                                        100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.
                                    </p>
                                </div>

                                {/* Parcel Return */}
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <RefreshCw className="w-6 h-6 text-gold-500" />
                                        <h3 className="text-lg font-semibold text-white">Parcel Return</h3>
                                    </div>
                                    <p className="leading-relaxed text-sm">
                                        Through our reverse logistics facility we allow customers to return or exchange their products hassle-free.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Charges */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Delivery Charges</h2>
                        </div>
                        <div className="space-y-6 text-gray-400">
                            <h3 className="text-lg font-semibold text-white mb-4">Same City Delivery (Pickup & Delivery Same District/City)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-4 text-white font-semibold">Delivery Time</th>
                                            <th className="text-left py-3 px-4 text-white font-semibold">Up to 500 gm</th>
                                            <th className="text-left py-3 px-4 text-white font-semibold">500 gm to 1 Kg</th>
                                            <th className="text-left py-3 px-4 text-white font-semibold">1 Kg to 2 Kg</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5">
                                            <td className="py-3 px-4">24 Hours</td>
                                            <td className="py-3 px-4">BDT 60</td>
                                            <td className="py-3 px-4">BDT 70</td>
                                            <td className="py-3 px-4">BDT 90</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="space-y-2 text-sm mt-4">
                                <p className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>1% COD charge will be applicable</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>This price/plan is exclusive of any VAT/TAX</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>For weight more than 2KG, additional BDT 15/Per KG (SAME CITY) will be applicable</span>
                                </p>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                                <p className="text-sm">
                                    <strong className="text-white">Note:</strong> Different delivery charges apply for suburbs delivery, inter-city Dhaka, and inter-city outside Dhaka. Contact us for detailed pricing information.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Order Processing */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Order Processing & Delivery Time</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                Orders are typically processed within 1-2 business days. Once your order is confirmed and payment is verified, we will arrange pickup with our courier service.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">Metropolitan Cities</h4>
                                    <p className="text-sm">Dhaka, Chittagong, Sylhet, Khulna, Rajshahi: <strong className="text-white">24-72 hours</strong></p>
                                    <p className="text-sm mt-1">Express Delivery (Dhaka Only): <strong className="text-white">4-6 hours</strong></p>
                                </div>
                                <div className="bg-gunmetal-900 border border-white/5 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">Other Districts</h4>
                                    <p className="text-sm">Nationwide delivery to all districts: <strong className="text-white">48-72 hours</strong></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tracking */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Package Tracking</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                Once your order ships, you will receive a tracking number via SMS and email. You can track your package status in real-time through our tracking system or contact our customer service team for assistance.
                            </p>
                            <p className="leading-relaxed">
                                Our delivery partners ensure safe handling and timely delivery of your luxury timepiece. For any delivery-related queries, contact our customer service team through the contact page.
                            </p>
                        </div>
                    </section>

                    {/* Returns Policy */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <RefreshCw className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Returns & Exchange Policy</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                We want you to be completely satisfied with your purchase. Through our reverse logistics facility, we allow customers to return or exchange their products hassle-free within <strong className="text-white">7 days of delivery</strong>.
                            </p>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Return Requirements:</h3>
                                <ul className="space-y-2 ml-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 mt-1">•</span>
                                        <span>Watch must be unworn and in original condition</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 mt-1">•</span>
                                        <span>All original packaging, tags, and documentation must be included</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 mt-1">•</span>
                                        <span>No visible signs of wear, scratches, or alterations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-500 mt-1">•</span>
                                        <span>Product must not have been damaged or modified</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">How to Return or Exchange:</h3>
                                <ol className="space-y-2 ml-4 list-decimal">
                                    <li>Contact our customer service team within 7 days of delivery</li>
                                    <li>Provide your order number and reason for return/exchange</li>
                                    <li>Receive return authorization and instructions</li>
                                    <li>We will arrange pickup through our courier service</li>
                                    <li>Refund or exchange will be processed within 7-10 business days</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Refunds */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Refunds</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                Refunds are processed within 7-10 business days after we receive and inspect your return. The amount will be refunded to your original payment method or can be credited to your account for future purchases.
                            </p>
                            <p className="leading-relaxed">
                                For Cash on Delivery orders, refunds will be processed via bank transfer (bKash/Nagad/Bank Account). Please provide your preferred payment details when initiating the return.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-white">Note:</strong> Delivery charges are non-refundable unless the return is due to our error or a defective product.
                            </p>
                        </div>
                    </section>

                    {/* Damaged or Defective */}
                    <section className="bg-gunmetal-800 border border-white/10 rounded-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-8 h-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-white">Damaged or Defective Items</h2>
                        </div>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                In the rare event that your watch arrives damaged or defective, please contact us immediately upon receipt. We guarantee 100% safety of your product during transit. If any damage occurs, we will:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>Arrange free return pickup via our courier service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>Provide immediate replacement or full refund including delivery charges</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gold-500 mt-1">•</span>
                                    <span>Process your request on priority within 24 hours</span>
                                </li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                Please inspect your package upon delivery. If the packaging appears damaged, please note this with the delivery agent and take photos before opening. Contact us immediately at the phone number provided below.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <div className="text-center pt-8">
                        <p className="text-gray-400 mb-4">
                            Questions about shipping or returns?
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-gold-500 hover:bg-gold-600 text-gunmetal-900 font-semibold px-8 py-3 rounded-sm transition-colors"
                        >
                            Contact Customer Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
