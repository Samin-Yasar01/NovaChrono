import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gunmetal-800 pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter text-white">
                            NOVA<span className="text-gold-500">CHRONO</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting moments of elegance. We offer the finest selection of luxury timepieces for those who value precision and style.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/shop" className="hover:text-gold-500 transition-colors">All Watches</Link></li>
                            <li><Link href="/shop?category=men" className="hover:text-gold-500 transition-colors">Men's Collection</Link></li>
                            <li><Link href="/shop?category=women" className="hover:text-gold-500 transition-colors">Women's Collection</Link></li>
                            <li><Link href="/shop?new=true" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-gold-500 transition-colors">Warranty</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter (Mock) */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gunmetal-900 border border-white/10 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                            />
                            <button className="bg-white/5 hover:bg-gold-500 hover:text-gunmetal-900 text-gold-500 border border-gold-500/20 hover:border-transparent px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} NovaChrono. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-gray-500 text-xs">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
