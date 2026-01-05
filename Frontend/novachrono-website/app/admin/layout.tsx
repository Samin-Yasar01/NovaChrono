'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getCookie, deleteCookie } from '@/lib/cookie-utils';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const apiKey = getCookie('nova_admin_api_key');
        if (!apiKey && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        deleteCookie('nova_admin_api_key');
        router.push('/admin/login');
    };

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null; // Don't verify until check is done (though middleware is better, client check is ok for this scale)
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Categories', href: '/admin/categories', icon: Menu },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-900">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        NovaChrono
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Admin Panel</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                pathname.startsWith(item.href)
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        NovaChrono
                    </h1>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                        <Menu className="h-6 w-6" />
                    </button>
                </header>

                {/* Desktop Header */}
                <header className="hidden md:flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Admin Console</h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-zinc-950 p-4" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-lg">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">Close</button>
                            </div>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                            pathname.startsWith(item.href)
                                                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors mt-4"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
