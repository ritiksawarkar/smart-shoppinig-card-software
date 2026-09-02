import React from 'react';
import { Eye, ArrowUpDown, Receipt, CreditCard, ShoppingCart } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { TransactionStatusBadge } from './TransactionStatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { VerificationStatusBadge } from '../weightVerification/VerificationStatusBadge';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateTime } from '../../utils/formatDate';

export const TransactionTable = ({
  transactions = [],
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
          <TableHeadCell>{renderSortHeader('Transaction ID', 'id')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Date & Time', 'dateTime')}</TableHeadCell>
          <TableHeadCell>Cart ID</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Items', 'itemCount')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Total Amount', 'total')}</TableHeadCell>
          <TableHeadCell>Payment Method</TableHeadCell>
          <TableHeadCell>Payment Status</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Transaction Status', 'transactionStatus')}</TableHeadCell>
          <TableHeadCell>Verification</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((txn) => (
          <TableRow key={txn.id}>
            {/* Transaction ID & Session Subtitle */}
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold text-xs shrink-0">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs font-mono">{txn.id}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {txn.sessionId ? txn.sessionId.slice(-10) : ''}
                  </div>
                </div>
              </div>
            </TableCell>

            {/* Date & Time */}
            <TableCell className="text-slate-700 text-xs font-medium">
              {formatDateTime(txn.dateTime)}
            </TableCell>

            {/* Cart ID */}
            <TableCell>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <ShoppingCart className="h-3 w-3 text-slate-500" />
                {txn.cartId}
              </span>
            </TableCell>

            {/* Items Count */}
            <TableCell>
              <span className="font-bold text-slate-800 text-xs">{txn.itemCount} items</span>
            </TableCell>

            {/* Total Amount */}
            <TableCell>
              <span className="font-black text-xs text-slate-900">{formatCurrency(txn.total)}</span>
            </TableCell>

            {/* Payment Method */}
            <TableCell>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
                <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                {txn.paymentMethod}
              </span>
            </TableCell>

            {/* Payment Status */}
            <TableCell>
              <PaymentStatusBadge status={txn.paymentStatus} />
            </TableCell>

            {/* Transaction Status */}
            <TableCell>
              <TransactionStatusBadge status={txn.transactionStatus} />
            </TableCell>

            {/* Verification Snapshot */}
            <TableCell>
              <VerificationStatusBadge status={txn.verificationStatus} />
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(txn.id)}
                className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200/80 rounded-md"
                title="View Full Historical Transaction Record"
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

export default TransactionTable;
