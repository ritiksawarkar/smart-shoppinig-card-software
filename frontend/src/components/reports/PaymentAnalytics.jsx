import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export const PaymentAnalytics = ({ paymentAnalytics }) => {
  if (!paymentAnalytics) return null;

  const { methods = [], successRate = 97.2, failedRate = 1.8, pendingRate = 1.0 } = paymentAnalytics;

  return (
    <Card padding="p-5" className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <span>Payment Method Distribution & Success Rates</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of digital settlement methods vs cash counter transactions.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{successRate}% Success Rate</span>
        </div>
      </div>

      {/* Stacked Payment Distribution Bar */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-lg overflow-hidden flex bg-slate-100 p-0.5 gap-0.5">
          {methods.map((m) => (
            <div
              key={m.method}
              className={`h-full ${m.color || 'bg-blue-600'} transition-all`}
              style={{ width: `${m.percentage}%` }}
              title={`${m.method}: ${m.percentage}% (${formatCurrency(m.amount)})`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {methods.map((m) => (
            <div key={m.method} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-full ${m.color || 'bg-blue-600'}`} />
                <span className="font-bold text-slate-900">{m.method}</span>
              </div>
              <div className="font-black text-slate-900 text-sm mt-1">{formatCurrency(m.amount)}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {m.count} txns ({m.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success vs Failure Metrics */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <AlertCircle className="h-4 w-4 text-slate-400" />
          <span>Gateway Health:</span>
        </div>
        <div className="flex items-center gap-4 font-semibold">
          <span className="text-emerald-700">Success: {successRate}%</span>
          <span className="text-amber-700">Pending: {pendingRate}%</span>
          <span className="text-rose-700">Failed: {failedRate}%</span>
        </div>
      </div>
    </Card>
  );
};

export default PaymentAnalytics;
