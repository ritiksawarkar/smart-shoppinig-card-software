import React from 'react';
import { Eye, ArrowUpDown, ShoppingCart, Clock } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { CartStatusBadge } from './CartStatusBadge';
import { WeightStatusBadge } from './WeightStatusBadge';
import { ConnectionStatusBadge } from './ConnectionStatusBadge';
import { Button } from '../ui/Button';

export const ActiveCartTable = ({
  carts = [],
  sortBy,
  sortOrder,
  onSort,
  onViewDetails,
}) => {
  const renderSortHeader = (label, field) => {
    const isActive = sortBy === field;
    return (
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-semibold"
      >
        <span>{label}</span>
        <ArrowUpDown className={`h-3 w-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
      </button>
    );
  };

  const calculateDurationMinutes = (isoStarted) => {
    if (!isoStarted) return '—';
    try {
      const diffMs = Date.now() - new Date(isoStarted).getTime();
      const mins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      return `${mins} min`;
    } catch {
      return '—';
    }
  };

  const formatLastActivity = (isoLast) => {
    if (!isoLast) return '—';
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoLast).getTime()) / 1000);
      if (diffSec < 15) return 'Just now';
      if (diffSec < 60) return `${diffSec} sec ago`;
      const mins = Math.floor(diffSec / 60);
      return `${mins} min ago`;
    } catch {
      return '—';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>{renderSortHeader('Cart ID', 'cartId')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Items', 'itemCount')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Current Bill', 'totalAmount')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Expected Wt', 'expectedWeight')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Actual Wt', 'actualWeight')}</TableHeadCell>
          <TableHeadCell>Weight Status</TableHeadCell>
          <TableHeadCell>Session Time</TableHeadCell>
          <TableHeadCell>Last Activity</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carts.map((cart) => (
          <TableRow key={cart.cartId}>
            {/* Cart ID & Session */}
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold text-xs shrink-0">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs font-mono">{cart.cartId}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {cart.sessionId ? cart.sessionId.slice(-10) : ''}
                  </div>
                </div>
              </div>
            </TableCell>

            {/* Items */}
            <TableCell>
              <span className="font-bold text-slate-800 text-xs">{cart.itemCount} items</span>
            </TableCell>

            {/* Current Bill Amount */}
            <TableCell>
              <span className="font-black text-xs text-slate-900">₹{cart.totalAmount.toLocaleString('en-IN')}</span>
            </TableCell>

            {/* Expected Weight */}
            <TableCell>
              <span className="font-medium text-slate-700 text-xs">{cart.expectedWeight.toFixed(2)} kg</span>
            </TableCell>

            {/* Actual Weight */}
            <TableCell>
              <span
                className={`font-semibold text-xs ${
                  cart.weightStatus === 'Mismatch' ? 'text-rose-700 font-bold' : 'text-slate-800'
                }`}
              >
                {cart.actualWeight.toFixed(2)} kg
              </span>
            </TableCell>

            {/* Weight Status */}
            <TableCell>
              <WeightStatusBadge status={cart.weightStatus} />
            </TableCell>

            {/* Session Duration */}
            <TableCell className="text-slate-600 text-xs">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3 text-slate-400" />
                {calculateDurationMinutes(cart.sessionStartedAt)}
              </span>
            </TableCell>

            {/* Last Activity */}
            <TableCell className="text-slate-500 text-[11px]">
              {formatLastActivity(cart.lastActivityAt)}
            </TableCell>

            {/* Cart Status & Connection */}
            <TableCell>
              <div className="space-y-1">
                <CartStatusBadge status={cart.status} />
                <div>
                  <ConnectionStatusBadge status={cart.connectionStatus} />
                </div>
              </div>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(cart.cartId)}
                className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200/80 rounded-md"
                title="View Live Cart Telemetry & Scanned Items"
              >
                <Eye className="h-3.5 w-3.5 mr-1 inline" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActiveCartTable;
