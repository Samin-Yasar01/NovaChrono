/**
 * Computes the discounted price for a product.
 * Returns null if no discount is active (so callers can check and show original price only).
 */
export function computeDiscountedPrice(
    price: number,
    discountType?: string | null,
    discountValue?: number | null,
): number | null {
    if (!discountType || discountType === 'none' || !discountValue || discountValue <= 0) return null;
    if (discountType === 'percentage') {
        const pct = Math.min(discountValue, 100);
        return Math.max(0, price * (1 - pct / 100));
    }
    if (discountType === 'fixed') {
        return Math.max(0, price - discountValue);
    }
    return null;
}
