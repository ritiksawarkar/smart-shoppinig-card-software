import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const PAYMENT_STATUS_OPTIONS = ['Paid', 'Pending', 'Processing', 'Failed', 'Cancelled', 'Refunded'];
export const PAYMENT_METHOD_OPTIONS = ['UPI', 'Card', 'Cash'];
export const RECONCILIATION_STATUS_OPTIONS = ['Matched', 'Pending Review', 'Mismatch', 'N/A'];
export const DATE_RANGE_OPTIONS = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'];

export const PaymentFilters = ({
  paymentStatus,
  paymentMethod,
  reconciliationStatus,
  dateRange,
  onPaymentStatusChange,
  onPaymentMethodChange,
  onReconciliationStatusChange,
  onDateRangeChange,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(paymentStatus || paymentMethod || reconciliationStatus || dateRange);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Payment Status Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={paymentStatus}
          onChange={(e) => onPaymentStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Payment Statuses</option>
          {PAYMENT_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Method Dropdown */}
      <div className="w-32 sm:w-36">
        <select
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Methods</option>
          {PAYMENT_METHOD_OPTIONS.map((pm) => (
            <option key={pm} value={pm}>
              {pm}
            </option>
          ))}
        </select>
      </div>

      {/* Reconciliation Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={reconciliationStatus}
          onChange={(e) => onReconciliationStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Reconciliation</option>
          {RECONCILIATION_STATUS_OPTIONS.map((rc) => (
            <option key={rc} value={rc}>
              {rc}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Dropdown */}
      <div className="w-32 sm:w-36">
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Dates</option>
          {DATE_RANGE_OPTIONS.map((dr) => (
            <option key={dr} value={dr}>
              {dr}
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

export default PaymentFilters;
