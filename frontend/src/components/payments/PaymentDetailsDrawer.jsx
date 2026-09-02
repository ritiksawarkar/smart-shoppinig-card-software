import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../ui/Drawer';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { ReconciliationBadge } from './ReconciliationBadge';
import { VerificationStatusBadge } from '../weightVerification/VerificationStatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatWeight, formatDifference } from '../../utils/formatWeight';
import { formatDateTime } from '../../utils/formatDate';
import { CreditCard, Receipt, Scale, ShoppingCart, History, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PaymentDetailsDrawer = ({ isOpen, onClose, payment }) => {
  const navigate = useNavigate();

  if (!isOpen || !payment) return null;

  const handleNavigateToTransaction = () => {
    onClose();
    navigate('/transactions');
  };

  const handleNavigateToVerification = () => {
    onClose();
    navigate('/weight-verification');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Payment Record Audit: ${payment.id}`}
      subtitle={`Transaction: ${payment.transactionId} • Cart: ${payment.cartId}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Session Metadata Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment & Settlement Record</div>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-400" />
              <span>{payment.id}</span>
            </div>
            <div className="text-slate-400 mt-1 flex items-center gap-3">
              <span>Initiated: <span className="font-semibold text-white">{formatDateTime(payment.createdAt)}</span></span>
              &bull;
              <span>Cart: <span className="font-mono font-semibold text-blue-300">{payment.cartId}</span></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PaymentStatusBadge status={payment.status} />
            <ReconciliationBadge status={payment.reconciliationStatus} />
          </div>
        </div>

        {/* Payment Provider Metadata Card */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-slate-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Provider & Settlement Details</h3>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {payment.paymentReference || 'N/A'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Payment Method</div>
              <div className="font-bold text-slate-800 text-sm mt-0.5">{payment.method}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Provider Txn ID</div>
              <div className="font-mono font-bold text-slate-800 text-xs mt-1 truncate">
                {payment.providerTransactionId || 'N/A'}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Reconciliation</div>
              <div className="mt-0.5">
                <ReconciliationBadge status={payment.reconciliationStatus} />
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Payment Amount</div>
              <div className="font-black text-emerald-700 text-base mt-0.5">
                {formatCurrency(payment.amount)}
              </div>
            </div>
          </div>

          {/* Cash Details Banner (If Cash Method) */}
          {payment.method === 'Cash' && payment.cashReceived && (
            <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500">Cashier: </span>
                <span className="font-bold text-slate-900">{payment.cashierId}</span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-500">Received: </span>
                  <span className="font-bold text-slate-900">{formatCurrency(payment.cashReceived)}</span>
                </div>
                <div>
                  <span className="text-slate-500">Change: </span>
                  <span className="font-bold text-slate-900">{formatCurrency(payment.cashChange)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction Relationship Card */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-blue-950 uppercase tracking-wider text-xs">
              <Receipt className="h-4 w-4 text-blue-600" />
              <span>Associated Transaction Record</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNavigateToTransaction}
              className="bg-white text-blue-700 border-blue-300 hover:bg-blue-100 h-7 text-xs font-semibold gap-1"
            >
              View In Transactions <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-white border border-blue-100 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-sans">Transaction ID</div>
              <div className="font-extrabold text-blue-900 mt-0.5">{payment.transactionId}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-sans">Session ID</div>
              <div className="font-bold text-slate-700 mt-0.5">{payment.sessionId}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-sans">Matched Amount</div>
              <div className="font-black text-slate-900 mt-0.5">{formatCurrency(payment.amount)}</div>
            </div>
          </div>
        </div>

        {/* Payment Attempts History Table */}
        {payment.attempts && payment.attempts.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Payment Gateway Attempts ({payment.attempts.length})
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeadCell>Attempt ID</TableHeadCell>
                    <TableHeadCell>Method</TableHeadCell>
                    <TableHeadCell>Amount</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell className="text-right">Time</TableHeadCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payment.attempts.map((att) => (
                    <TableRow key={att.attemptId}>
                      <TableCell className="font-mono text-xs font-bold text-slate-900">{att.attemptId}</TableCell>
                      <TableCell className="text-xs font-medium text-slate-700">{att.method}</TableCell>
                      <TableCell className="text-xs font-bold text-slate-900">{formatCurrency(att.amount)}</TableCell>
                      <TableCell>
                        <PaymentStatusBadge status={att.status} />
                      </TableCell>
                      <TableCell className="text-right text-xs font-mono text-slate-500">{att.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Historical Weight Verification Snapshot at Payment Time */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs">
              <Scale className="h-4 w-4 text-slate-600" />
              <span>Weight Verification Snapshot</span>
            </div>
            <div className="flex items-center gap-2">
              <VerificationStatusBadge status={payment.verificationStatus} />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNavigateToVerification}
                className="text-blue-600 h-6 text-xs p-0 hover:bg-transparent hover:underline font-semibold"
              >
                View Audit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Expected</div>
              <div className="font-bold text-slate-800 mt-0.5">{formatWeight(payment.expectedWeight)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Actual</div>
              <div className="font-bold text-slate-800 mt-0.5">{formatWeight(payment.actualWeight)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Difference</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{formatDifference(payment.difference)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Tolerance</div>
              <div className="font-medium text-slate-700 mt-0.5">±{payment.tolerance?.toFixed(2)} kg</div>
            </div>
          </div>
        </div>

        {/* Audit Event Timeline Log */}
        {payment.timeline && payment.timeline.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <History className="h-4 w-4 text-slate-400" />
              <span>Payment Event Timeline Log</span>
            </div>

            <div className="space-y-2">
              {payment.timeline.map((event, idx) => (
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
            Close Payment Record
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default PaymentDetailsDrawer;
