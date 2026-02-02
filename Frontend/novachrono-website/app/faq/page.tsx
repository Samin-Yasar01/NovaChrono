'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "How do I place an order?",
        answer: "Browse our collection, select your desired timepiece, and click 'Add to Cart'. Once you've finished shopping, proceed to checkout where you can review your order and complete the purchase securely. We accept all major credit cards and secure payment methods."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, American Express, Discover, and PayPal. All transactions are secured with industry-standard SSL encryption to protect your personal and financial information."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 5-7 business days within the continental United States. Express shipping (2-3 business days) and overnight options are also available. International orders may take 10-15 business days depending on your location."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. All duties and taxes are the responsibility of the customer and may be assessed upon delivery."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn watches in their original condition with all tags, packaging, and documentation. The watch must not show any signs of wear or damage. Return shipping is the customer's responsibility unless the item is defective."
    },
    {
        question: "Are your watches authentic?",
        answer: "Absolutely. All our timepieces are 100% authentic and sourced directly from authorized distributors. Each watch comes with original packaging, documentation, and manufacturer's warranty. We stand behind the authenticity of every product we sell."
    },
    {
        question: "What warranty do your watches come with?",
        answer: "Most of our watches come with a 2-year international manufacturer's warranty covering defects in materials and workmanship. Some premium brands may offer extended warranty periods. Warranty details are specific to each manufacturer and will be included with your purchase."
    },
    {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this number to track your package's journey to your doorstep. Tracking information is usually available within 24 hours of shipment."
    },
    {
        question: "Do you offer gift wrapping?",
        answer: "Yes, we offer complimentary luxury gift wrapping for all purchases. Simply select the gift wrapping option during checkout. Each wrapped item includes a premium presentation box and ribbon, perfect for special occasions."
    },
    {
        question: "How do I care for my luxury watch?",
        answer: "Keep your watch away from extreme temperatures and magnetic fields. Clean it regularly with a soft, lint-free cloth. For water-resistant models, ensure the crown is fully secured before exposure to water. We recommend professional servicing every 3-5 years to maintain optimal performance."
    },
    {
        question: "Can I exchange my watch for a different model?",
        answer: "Yes, exchanges are accepted within 30 days of purchase. The watch must be in unworn, pristine condition with all original packaging. Please contact our customer service team to initiate an exchange. You may be responsible for any price difference and return shipping costs."
    },
    {
        question: "Do you have a physical store location?",
        answer: "Currently, NovaChrono operates exclusively online to provide you with the best prices and selection. However, we maintain the highest standards of customer service and offer virtual consultations to help you find the perfect timepiece."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gunmetal-900">
            <div className="container mx-auto px-4 md:px-6 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Find answers to common questions about our products, shipping, returns, and more.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gunmetal-800 border border-white/10 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-white pr-8">
                                    {faq.question}
                                </h3>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gold-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gold-500 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 mt-4 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-gold-500 hover:bg-gold-600 text-gunmetal-900 font-semibold px-8 py-3 rounded-sm transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
