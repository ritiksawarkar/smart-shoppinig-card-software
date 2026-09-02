import React from 'react';
import { Drawer } from '../ui/Drawer';
import { TransactionStatusBadge } from './TransactionStatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { VerificationStatusBadge } from '../weightVerification/VerificationStatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatWeight, formatDifference } from '../../utils/formatWeight';
import { formatDateTime } from '../../utils/formatDate';
import { Receipt, CreditCard, Scale, ShoppingCart, History, Clock, CheckCircle2 } from 'lucide-react';

export const TransactionDetailsDrawer = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Historical Transaction Record: ${transaction.id}`}
      subtitle={`Cart: ${transaction.cartId} • Session: ${transaction.sessionId}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Session Metadata Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction & Session Audit</div>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-blue-400" />
              <span>{transaction.id}</span>
            </div>
            <div className="text-slate-400 mt-1 flex items-center gap-3">
              <span>Date: <span className="font-semibold text-white">{formatDateTime(transaction.dateTime)}</span></span>
              &bull;
              <span>Cart: <span className="font-mono font-semibold text-blue-300">{transaction.cartId}</span></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TransactionStatusBadge status={transaction.transactionStatus} />
            <PaymentStatusBadge status={transaction.paymentStatus} />
          </div>
        </div>

        {/* Payment & Billing Breakdown Card */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-slate-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Payment Information</h3>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {transaction.paymentReference || 'N/A'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Payment Method</div>
              <div className="font-bold text-slate-800 text-sm mt-0.5">{transaction.paymentMethod}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Payment Status</div>
              <div className="mt-0.5">
                <PaymentStatusBadge status={transaction.paymentStatus} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Inventory Sync</div>
              <div className="font-bold text-emerald-700 text-xs mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                {transaction.inventorySyncStatus || 'Completed'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Grand Total</div>
              <div className="font-black text-blue-950 text-base mt-0.5">
                {formatCurrency(transaction.total)}
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Historical Scanned Products Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Purchased Items ({transaction.items?.length || 0})</span>
            <span className="text-[11px] font-mono text-slate-400 font-normal">
              Preserved unit prices captured at purchase time
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell>Product</TableHeadCell>
                  <TableHeadCell className="text-center">Qty</TableHeadCell>
                  <TableHeadCell className="text-right">Unit Price</TableHeadCell>
                  <TableHeadCell className="text-right">Subtotal</TableHeadCell>
                  <TableHeadCell className="text-right">Weight</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction.items?.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{item.productName}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">Barcode: {item.barcode}</div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-bold text-slate-800 text-xs">
                      {item.quantity}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-700 text-xs">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>

                    <TableCell className="text-right font-black text-slate-900 text-xs">
                      {formatCurrency(item.subtotal)}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-600 text-xs">
                      {formatWeight(item.expectedWeight)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Historical Weight Verification Snapshot */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs">
              <Scale className="h-4 w-4 text-slate-600" />
              <span>Session Weight Verification Snapshot</span>
            </div>
            <VerificationStatusBadge status={transaction.verificationStatus} />
          </div>

          <div className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Expected</div>
              <div className="font-bold text-slate-800 mt-0.5">{formatWeight(transaction.expectedWeight)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Actual</div>
              <div className="font-bold text-slate-800 mt-0.5">{formatWeight(transaction.actualWeight)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Difference</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{formatDifference(transaction.difference)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Tolerance</div>
              <div className="font-medium text-slate-700 mt-0.5">±{transaction.tolerance?.toFixed(2)} kg</div>
            </div>
          </div>
        </div>

        {/* Audit Timeline Log */}
        {transaction.timeline && transaction.timeline.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <History className="h-4 w-4 text-slate-400" />
              <span>Transaction Event Timeline</span>
            </div>

            <div className="space-y-2">
              {transaction.timeline.map((event, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{event.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{event.description}</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Close */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Record
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default TransactionDetailsDrawer;
