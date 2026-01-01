"use client";

import Link from 'next/link';
import Button from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mb-8"
            >
                <CheckCircle2 className="w-24 h-24 text-gold-500" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
                Thank you for choosing NovaChrono. Your order has been confirmed and will be shipped shortly.
            </p>

            <Link href="/">
                <Button size="lg">Continue Shopping</Button>
            </Link>
        </div>
    );
}
