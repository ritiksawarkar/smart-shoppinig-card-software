import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const CATEGORIES = [
  'Dairy',
  'Groceries',
  'Snacks',
  'Bakery',
  'Beverages',
  'Personal Care',
  'Household',
  'Other',
];

export const STATUS_OPTIONS = ['Active', 'Inactive'];

export const STOCK_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'];

export const ProductFilters = ({
  category,
  status,
  stockFilter,
  onCategoryChange,
  onStatusChange,
  onStockFilterChange,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(category || status || stockFilter);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Category Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Status Dropdown */}
      <div className="w-32 sm:w-36">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Level Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Stock Levels</option>
          {STOCK_OPTIONS.map((stk) => (
            <option key={stk} value={stk}>
              {stk}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Action */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-slate-600 hover:text-slate-900 gap-1.5 h-8 text-xs font-medium"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
