'use client';

import useSWR from 'swr';
import { getDashboardStats } from '@/actions/admin/service';
import { Package, ShoppingCart, DollarSign, List, TrendingUp, AlertCircle } from 'lucide-react';

interface Order {
    _id: string;
    customerName: string; // Assuming these fields exist
    totalAmount: number;
    status: string;
    createdAt: string;
}

interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
    pendingOrders: number;
    recentOrders: Order[];
}

export default function AdminDashboard() {
    const { data, error, isLoading } = useSWR<DashboardStats>('dashboard-stats', getDashboardStats);

    if (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
            return (
                <div className="flex h-full items-center justify-center p-8 text-center text-red-500">
                    Access Denied. Please Login again.
                </div>
            )
        }
        return <div className="p-8 text-center text-red-500">Failed to load dashboard data.</div>;
    }

    if (isLoading) {
        return (
            <div className="flex bg-transparent h-full items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    const { totalProducts, totalOrders, totalCategories, totalRevenue, pendingOrders, recentOrders } = data!;

    const stats = [
        {
            name: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-green-500',
            textColor: 'text-green-500',
        },
        {
            name: 'Total Orders',
            value: totalOrders,
            icon: ShoppingCart,
            color: 'bg-blue-500',
            textColor: 'text-blue-500',
        },
        {
            name: 'Pending Orders',
            value: pendingOrders,
            icon: AlertCircle,
            color: 'bg-yellow-500',
            textColor: 'text-yellow-500',
        },
        {
            name: 'Products',
            value: totalProducts,
            icon: Package,
            color: 'bg-purple-500',
            textColor: 'text-purple-500',
        },
        {
            name: 'Categories',
            value: totalCategories,
            icon: List,
            color: 'bg-orange-500',
            textColor: 'text-orange-500',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            </div>
                            <div className={`rounded-lg p-3 ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                                <stat.icon className={`h-6 w-6 ${stat.textColor}`} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <div className="border-b border-gray-200 dark:border-zinc-800 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{order._id.substring(0, 8)}...</td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{order.customerName || 'Guest'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                                }
                        `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                                            ${order.totalAmount?.toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
