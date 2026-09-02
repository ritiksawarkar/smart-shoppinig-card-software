/**
 * Percentage Formatting Utility
 * 
 * Formats period-over-period percentage growth, rate indicators, and distributions.
 */

export const formatPercentage = (val, { includeSign = true, decimals = 1 } = {}) => {
  if (val === null || val === undefined || isNaN(Number(val))) {
    return '0.0%';
  }

  const num = Number(val);
  const formatted = Math.abs(num).toFixed(decimals);

  if (includeSign) {
    if (num > 0) return `+${formatted}%`;
    if (num < 0) return `-${formatted}%`;
    return `0.0%`;
  }

  return `${formatted}%`;
};

export default formatPercentage;
