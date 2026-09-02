import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const CART_STATUS_OPTIONS = ['Shopping', 'Verification Required', 'Payment Pending', 'Checkout Ready'];
export const WEIGHT_STATUS_OPTIONS = ['Verified', 'Checking', 'Mismatch'];
export const CONNECTION_OPTIONS = ['Connected', 'Disconnected'];

export const CartFilters = ({
  status,
  weightStatus,
  connectionStatus,
  onStatusChange,
  onWeightStatusChange,
  onConnectionStatusChange,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(status || weightStatus || connectionStatus);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Cart Status Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Cart Statuses</option>
          {CART_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Weight Status Dropdown */}
      <div className="w-36 sm:w-40">
        <select
          value={weightStatus}
          onChange={(e) => onWeightStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Weight Statuses</option>
          {WEIGHT_STATUS_OPTIONS.map((ws) => (
            <option key={ws} value={ws}>
              {ws}
            </option>
          ))}
        </select>
      </div>

      {/* Connection Status Dropdown */}
      <div className="w-32 sm:w-36">
        <select
          value={connectionStatus}
          onChange={(e) => onConnectionStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Connections</option>
          {CONNECTION_OPTIONS.map((conn) => (
            <option key={conn} value={conn}>
              {conn}
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

export default CartFilters;
