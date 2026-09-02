import React from 'react';
import { Drawer } from '../ui/Drawer';
import { CartStatusBadge } from './CartStatusBadge';
import { WeightStatusBadge } from './WeightStatusBadge';
import { ConnectionStatusBadge } from './ConnectionStatusBadge';
import { Button } from '../ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { ShoppingCart, Scale, AlertTriangle, CheckCircle2, ShieldCheck, ScanBarcode, CreditCard } from 'lucide-react';

export const CartDetailsDrawer = ({
  isOpen,
  onClose,
  cart,
  onReviewMismatch,
  isReviewing,
}) => {
  if (!isOpen || !cart) return null;

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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Smart Cart Telemetry: ${cart.cartId}`}
      subtitle={`Session ID: ${cart.sessionId}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Session Metadata Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cart & Session Info</div>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-400" />
              <span>{cart.cartId}</span>
              <span className="text-slate-500 font-normal">({cart.sessionId})</span>
            </div>
            <div className="text-slate-400 mt-1">
              Session Duration: <span className="font-semibold text-white">{calculateDurationMinutes(cart.sessionStartedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CartStatusBadge status={cart.status} />
            <ConnectionStatusBadge status={cart.connectionStatus} />
          </div>
        </div>

        {/* Shopping Summary Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scanned Items</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">{cart.itemCount} items</div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Current Running Bill</div>
            <div className="text-lg font-black text-blue-950 mt-0.5">₹{cart.totalAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Weight Verification Audit Section */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-slate-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Load Cell Weight Verification</h3>
            </div>
            <WeightStatusBadge status={cart.weightStatus} />
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Expected Wt</div>
              <div className="font-extrabold text-slate-800 text-sm mt-0.5">{cart.expectedWeight.toFixed(2)} kg</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Actual Wt</div>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">{cart.actualWeight.toFixed(2)} kg</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Difference</div>
              <div
                className={`font-black text-sm mt-0.5 ${
                  cart.weightDifference > 0.05 ? 'text-rose-600' : 'text-slate-700'
                }`}
              >
                {cart.weightDifference >= 0 ? `+${cart.weightDifference.toFixed(2)}` : cart.weightDifference.toFixed(2)} kg
              </div>
            </div>
          </div>

          {/* Weight Mismatch Warning & Review Action */}
          {cart.weightStatus === 'Mismatch' && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-rose-900">Weight Mismatch — Verification Required</div>
                  <div className="text-rose-700 mt-0.5">
                    {cart.mismatchReason ||
                      'Actual physical weight measured by load cells differs from expected bill calculation.'}
                  </div>
                </div>
              </div>

              {!cart.reviewed ? (
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onReviewMismatch(cart.cartId)}
                    loading={isReviewing}
                    loadingText="Marking..."
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs gap-1.5"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Mark as Reviewed
                  </Button>
                </div>
              ) : (
                <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Reviewed by Admin
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scanned Cart Items Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Scanned Cart Contents ({cart.items?.length || 0})</span>
            <span className="text-[11px] font-mono text-slate-400 font-normal">Prices captured at scan time</span>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell>Product</TableHeadCell>
                  <TableHeadCell className="text-center">Qty</TableHeadCell>
                  <TableHeadCell className="text-right">Unit Price</TableHeadCell>
                  <TableHeadCell className="text-right">Subtotal</TableHeadCell>
                  <TableHeadCell className="text-right">Exp. Wt</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items?.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{item.productName}</div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 mt-0.5">
                          <ScanBarcode className="h-3 w-3" />
                          {item.barcode}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-bold text-slate-800 text-xs">
                      {item.quantity}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-700 text-xs">
                      ₹{item.unitPrice}
                    </TableCell>

                    <TableCell className="text-right font-black text-slate-900 text-xs">
                      ₹{item.subtotal}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-600 text-xs">
                      {item.expectedWeight.toFixed(2)} kg
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Payment Status Info */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-500" />
            <div>
              <div className="font-bold text-slate-800">Checkout Payment Status</div>
              <div className="text-slate-500 text-[11px]">{cart.paymentStatus}</div>
            </div>
          </div>
          <div className="text-right text-[10px] text-slate-400 max-w-[180px]">
            Inventory stock is deducted only upon confirmed checkout completion.
          </div>
        </div>

        {/* Footer Close */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Telemetry
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDetailsDrawer;
