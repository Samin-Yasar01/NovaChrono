"use client";

import { motion } from 'framer-motion';
import Button from './ui/button';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-gunmetal-900 flex items-center justify-center">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_50%)] animate-spin-slow" />
            </div>

            <div className="container mx-auto px-4 md:px-6 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block text-gold-500 font-medium tracking-[0.2em] uppercase text-sm"
                    >
                        Timeless Elegance
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-tight">
                        Discover the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-white">
                            Perfect Moment
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
                        Elevate your style with our curated collection of luxury timepieces.
                        Precision engineering meets sophisticated design.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/shop">
                            <Button size="lg" className="min-w-[160px]">Shop Collection</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="min-w-[160px]">Our Story</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Gradient Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gunmetal-900 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
