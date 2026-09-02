/**
 * Weight Formatting Utilities
 * 
 * Provides consistent display formatting for load cell physical weights,
 * catalog expected weights, and weight differences across the admin application.
 */

export const formatWeight = (valInKg) => {
  if (valInKg === null || valInKg === undefined || isNaN(Number(valInKg))) {
    return '—';
  }

  const num = Number(valInKg);
  if (num < 1 && num > -1 && num !== 0) {
    const grams = Math.round(num * 1000);
    return `${grams} g`;
  }

  return `${num.toFixed(2)} kg`;
};

export const formatDifference = (diffKg) => {
  if (diffKg === null || diffKg === undefined || isNaN(Number(diffKg))) {
    return '—';
  }

  const num = Number(diffKg);
  if (Math.abs(num) < 0.001) {
    return '0.00 kg';
  }

  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)} kg`;
};

export default {
  formatWeight,
  formatDifference,
};
