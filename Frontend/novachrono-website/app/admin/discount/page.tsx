'use client';

import { useState, useEffect } from 'react';
import { getProducts, updateProduct } from '@/actions/products/service';
import { computeDiscountedPrice } from '@/lib/discount';
import { Loader2, Save, Percent, DollarSign, Tag, Zap, XCircle } from 'lucide-react';
import { mutate } from 'swr';

interface Product {
    _id: string;
    name: string;
    price: number;
    discountType?: string | null;
    discountValue?: number | null;
}

type DiscountRow = { type: string; value: string };

export default function DiscountPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [discounts, setDiscounts] = useState<Record<string, DiscountRow>>({});
    const [saving, setSaving] = useState<Record<string, boolean>>({});
    const [flash, setFlash] = useState<Record<string, { text: string; ok: boolean }>>({});

    // Global discount state
    const [globalType, setGlobalType] = useState('percentage');
    const [globalValue, setGlobalValue] = useState('');
    const [isApplyingAll, setIsApplyingAll] = useState(false);
    const [isClearingAll, setIsClearingAll] = useState(false);
    const [globalFlash, setGlobalFlash] = useState<{ text: string; ok: boolean } | null>(null);

    // Confirmation modal
    const [modal, setModal] = useState<{ open: boolean; action: 'apply' | 'clear' | null }>({
        open: false,
        action: null,
    });
    const openModal = (action: 'apply' | 'clear') => setModal({ open: true, action });
    const closeModal = () => setModal({ open: false, action: null });
    const confirmModal = async () => {
        const action = modal.action;
        closeModal();
        if (action === 'apply') await handleApplyAll();
        if (action === 'clear') await handleClearAll();
    };

    useEffect(() => {
        getProducts().then((data: Product[]) => {
            setProducts(data || []);
            const initial: Record<string, DiscountRow> = {};
            for (const p of data || []) {
                initial[p._id] = {
                    type: p.discountType || 'none',
                    value: p.discountValue != null ? String(p.discountValue) : '',
                };
            }
            setDiscounts(initial);
            setIsLoading(false);
        });
    }, []);

    const showFlash = (id: string, text: string, ok: boolean) => {
        setFlash((prev) => ({ ...prev, [id]: { text, ok } }));
        setTimeout(() => setFlash((prev) => { const n = { ...prev }; delete n[id]; return n; }), 2500);
    };

    const showGlobalFlash = (text: string, ok: boolean) => {
        setGlobalFlash({ text, ok });
        setTimeout(() => setGlobalFlash(null), 3000);
    };

    const handleApplyAll = async () => {
        const numVal = parseFloat(globalValue);
        if (!globalValue || isNaN(numVal) || numVal <= 0) return;
        setIsApplyingAll(true);
        try {
            await Promise.all(
                products.map((p) =>
                    updateProduct(p._id, { discountType: globalType, discountValue: numVal })
                )
            );
            // Sync local row state so the table reflects the change immediately
            setDiscounts((prev) => {
                const next = { ...prev };
                for (const p of products) {
                    next[p._id] = { type: globalType, value: String(numVal) };
                }
                return next;
            });
            mutate('/products');
            showGlobalFlash(`${globalType === 'percentage' ? numVal + '%' : numVal} discount applied to all ${products.length} products!`, true);
        } catch {
            showGlobalFlash('Failed to apply discount to some products.', false);
        } finally {
            setIsApplyingAll(false);
        }
    };

    const handleClearAll = async () => {
        setIsClearingAll(true);
        try {
            await Promise.all(
                products.map((p) =>
                    updateProduct(p._id, { discountType: null, discountValue: null })
                )
            );
            setDiscounts((prev) => {
                const next = { ...prev };
                for (const p of products) {
                    next[p._id] = { type: 'none', value: '' };
                }
                return next;
            });
            mutate('/products');
            showGlobalFlash(`Discounts cleared from all ${products.length} products.`, true);
        } catch {
            showGlobalFlash('Failed to clear discounts from some products.', false);
        } finally {
            setIsClearingAll(false);
        }
    };

    const handleSave = async (product: Product) => {
        const d = discounts[product._id];
        if (!d) return;
        setSaving((prev) => ({ ...prev, [product._id]: true }));
        try {
            const payload: Record<string, unknown> =
                d.type === 'none'
                    ? { discountType: null, discountValue: null }
                    : { discountType: d.type, discountValue: parseFloat(d.value) || 0 };
            await updateProduct(product._id, payload);
            mutate('/products');
            showFlash(product._id, 'Saved!', true);
        } catch {
            showFlash(product._id, 'Error!', false);
        } finally {
            setSaving((prev) => ({ ...prev, [product._id]: false }));
        }
    };

    const setRow = (id: string, partial: Partial<DiscountRow>) =>
        setDiscounts((prev) => ({ ...prev, [id]: { ...prev[id], ...partial } }));

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-0.5">
                    <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discount Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        Apply a percentage or fixed discount to any product. Customers will see the original price
                        with a strikethrough alongside the discounted price.
                    </p>
                </div>
            </div>

            {/* Global Discount Card */}
            <div className="rounded-xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/60 dark:bg-blue-900/10 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="font-semibold text-gray-900 dark:text-white">Apply Discount to All Products</h2>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    {/* Type */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Type</label>
                        <select
                            value={globalType}
                            onChange={(e) => setGlobalType(e.target.value)}
                            className="rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount</option>
                        </select>
                    </div>

                    {/* Value */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {globalType === 'percentage' ? 'Percentage (0–100)' : 'Amount'}
                        </label>
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                min="0"
                                max={globalType === 'percentage' ? 100 : undefined}
                                placeholder={globalType === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                                value={globalValue}
                                onChange={(e) => setGlobalValue(e.target.value)}
                                className="w-32 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {globalType === 'percentage' && (
                                <span className="text-gray-500 font-medium">%</span>
                            )}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={() => openModal('apply')}
                        disabled={isApplyingAll || isClearingAll || !globalValue || parseFloat(globalValue) <= 0}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isApplyingAll ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Zap className="h-4 w-4" />
                        )}
                        Apply to All
                    </button>

                    {/* Clear All Button */}
                    <button
                        onClick={() => openModal('clear')}
                        disabled={isApplyingAll || isClearingAll}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isClearingAll ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <XCircle className="h-4 w-4" />
                        )}
                        Clear All
                    </button>
                </div>

                {/* Global flash */}
                {globalFlash && (
                    <p className={`mt-3 text-sm font-medium ${globalFlash.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {globalFlash.text}
                    </p>
                )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                    <Percent className="h-3.5 w-3.5 text-blue-500" /> Percentage — deducts X% of the original price
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Fixed — deducts a flat amount from price
                </span>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 overflow-x-auto bg-white dark:bg-zinc-950 shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Product</th>
                            <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Listed Price</th>
                            <th className="text-center px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Discount Type</th>
                            <th className="text-center px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Value</th>
                            <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Final Price</th>
                            <th className="text-center px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {products.map((product) => {
                            const d = discounts[product._id] || { type: 'none', value: '' };
                            const numericVal = parseFloat(d.value) || 0;
                            const finalPrice = computeDiscountedPrice(product.price, d.type, numericVal);
                            const isSaving = saving[product._id];
                            const f = flash[product._id];
                            const hasDiscount = d.type !== 'none' && numericVal > 0;

                            return (
                                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/40 transition-colors">
                                    {/* Name */}
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 max-w-[200px] truncate">
                                        {product.name}
                                        {product.discountType && product.discountValue ? (
                                            <span className="ml-2 inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 uppercase tracking-wide">
                                                Active
                                            </span>
                                        ) : null}
                                    </td>

                                    {/* Original Price */}
                                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                        {hasDiscount ? (
                                            <span className="line-through text-gray-400 dark:text-gray-500">
                                                {product.price.toLocaleString()}/-
                                            </span>
                                        ) : (
                                            <span>{product.price.toLocaleString()}/-</span>
                                        )}
                                    </td>

                                    {/* Type Selector */}
                                    <td className="px-4 py-3">
                                        <select
                                            value={d.type}
                                            onChange={(e) => setRow(product._id, { type: e.target.value })}
                                            className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="none">No Discount</option>
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                    </td>

                                    {/* Value Input */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1">
                                            <input
                                                type="number"
                                                min="0"
                                                max={d.type === 'percentage' ? 100 : undefined}
                                                placeholder={d.type === 'percentage' ? '0–100' : '0'}
                                                disabled={d.type === 'none'}
                                                value={d.value}
                                                onChange={(e) => setRow(product._id, { value: e.target.value })}
                                                className="w-24 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                                            />
                                            {d.type === 'percentage' && (
                                                <span className="text-gray-400 text-sm font-medium">%</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Final Price */}
                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                        {finalPrice != null ? (
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                                {Math.round(finalPrice).toLocaleString()}/-
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>

                                    {/* Save Button */}
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => handleSave(product)}
                                            disabled={isSaving}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[75px] justify-center ${
                                                f ? (f.ok ? 'bg-emerald-600' : 'bg-red-600') : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            {isSaving ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <Save className="h-3.5 w-3.5" />
                                            )}
                                            {f ? f.text : 'Save'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                        No products found. Add products first.
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {modal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Dialog */}
                    <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 p-6">
                        {/* Icon */}
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                            modal.action === 'clear'
                                ? 'bg-red-100 dark:bg-red-900/30'
                                : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                            {modal.action === 'clear'
                                ? <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                : <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-1">
                            {modal.action === 'clear' ? 'Clear All Discounts?' : 'Apply Discount to All?'}
                        </h3>

                        {/* Body */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                            {modal.action === 'clear'
                                ? `This will remove the discount from all ${products.length} products. This action cannot be undone automatically.`
                                : `This will apply a ${globalType === 'percentage' ? parseFloat(globalValue) + '%' : parseFloat(globalValue).toLocaleString() + ' fixed'} discount to all ${products.length} products, overwriting any existing discounts.`}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmModal}
                                className={`flex-1 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors ${
                                    modal.action === 'clear'
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {modal.action === 'clear' ? 'Yes, Clear All' : 'Yes, Apply to All'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
