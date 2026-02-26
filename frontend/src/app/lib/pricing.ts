export function getDiscountedPrice(price: number, discountPercent?: number) {
  const safeDiscount = Math.min(90, Math.max(0, Number(discountPercent || 0)));
  const discounted = price - (price * safeDiscount) / 100;
  return Math.max(0, Number(discounted.toFixed(2)));
}

export function hasDiscount(discountPercent?: number) {
  return Number(discountPercent || 0) > 0;
}

export function formatPKR(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}
