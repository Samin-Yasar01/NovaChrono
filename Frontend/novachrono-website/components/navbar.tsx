"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Watch } from 'lucide-react'; // Using Watch icon as logo placeholder
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { cart } = useCart();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                isScrolled
                    ? 'bg-gunmetal-900/90 backdrop-blur-md border-white/5 py-4'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Watch className="h-8 w-8 text-gold-500 transition-transform group-hover:rotate-12" />
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        NOVA<span className="text-gold-500">CHRONO</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm uppercase tracking-widest font-medium hover:text-gold-500 transition-colors relative',
                                pathname === link.href ? 'text-gold-500' : 'text-gray-300'
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 top-full block h-[2px] w-full bg-gold-500 mt-1"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-2 text-gray-300 hover:text-gold-500 transition-colors">
                        <ShoppingBag className="h-6 w-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-gunmetal-900 animate-in zoom-in">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gunmetal-900 border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'text-lg font-medium p-2 hover:bg-white/5 rounded-md transition-colors',
                                        pathname === link.href ? 'text-gold-500' : 'text-gray-300'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
