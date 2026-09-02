import React from 'react';
import { Search, X } from 'lucide-react';

export const PaymentSearch = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by payment ID, transaction ID, cart ID or reference...',
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
        <Search className="h-4 w-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-9 text-xs text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default PaymentSearch;
