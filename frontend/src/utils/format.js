/**
 * Pure utility functions for consistent data formatting across the app
 */

export const formatFee = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatFeeShort = (amount) => {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(1)}L`;
  }
  return formatFee(amount);
};

export const formatRating = (rating) => {
  return `★ ${rating.toFixed(1)}`;
};

export const formatRatingFull = (rating, count) => {
  const formattedCount = new Intl.NumberFormat('en-IN').format(count);
  return `★ ${rating.toFixed(1)} (${formattedCount} reviews)`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};
