/**
 * Currency Formatting Utility
 * 
 * Formats financial amounts using standard Indian Rupee (INR) formatting.
 */

export const formatCurrency = (val, { includeDecimals = false } = {}) => {
  if (val === null || val === undefined || isNaN(Number(val))) {
    return '₹0';
  }

  const num = Number(val);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(num);
};

export default formatCurrency;
