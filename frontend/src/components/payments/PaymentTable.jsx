import React from 'react';
import { Eye, ArrowUpDown, CreditCard, ShoppingCart, Receipt } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { ReconciliationBadge } from './ReconciliationBadge';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';

export const PaymentTable = ({
  payments = [],
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>{renderSortHeader('Payment ID', 'id')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Date & Time', 'createdAt')}</TableHeadCell>
          <TableHeadCell>Transaction ID</TableHeadCell>
          <TableHeadCell>Cart ID</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Amount', 'amount')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Method', 'method')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Status', 'status')}</TableHeadCell>
          <TableHeadCell>Reconciliation</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((pay) => (
          <TableRow key={pay.id}>
            {/* Payment ID */}
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold text-xs shrink-0">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs font-mono">{pay.id}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Ref: {pay.paymentReference || 'N/A'}
                  </div>
                </div>
              </div>
            </TableCell>

            {/* Date & Time */}
            <TableCell className="text-slate-700 text-xs font-medium">
              {formatDateTime(pay.createdAt)}
            </TableCell>

            {/* Transaction ID */}
            <TableCell>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                <Receipt className="h-3 w-3 text-blue-500" />
                {pay.transactionId}
              </span>
            </TableCell>

            {/* Cart ID */}
            <TableCell>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                <ShoppingCart className="h-3 w-3 text-slate-500" />
                {pay.cartId}
              </span>
            </TableCell>

            {/* Amount */}
            <TableCell>
              <span className="font-black text-xs text-slate-900">{formatCurrency(pay.amount)}</span>
            </TableCell>

            {/* Payment Method */}
            <TableCell>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800">
                {pay.method}
              </span>
            </TableCell>

            {/* Payment Status */}
            <TableCell>
              <PaymentStatusBadge status={pay.status} />
            </TableCell>

            {/* Reconciliation */}
            <TableCell>
              <ReconciliationBadge status={pay.reconciliationStatus} />
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(pay.id)}
                className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200/80 rounded-md"
                title="View Full Payment Record & Provider Details"
              >
                <Eye className="h-3.5 w-3.5 mr-1 inline" />
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentTable;
