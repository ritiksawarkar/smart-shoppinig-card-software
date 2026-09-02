import React from 'react';
import { Smartphone, CreditCard, Banknote } from 'lucide-react';
import { Card } from '../ui/Card';

export const PaymentSummaryCard = ({ summary }) => {
  const {
    upiPercentage = 68,
    cardPercentage = 21,
    cashPercentage = 11,
    totalTransactions = 128,
  } = summary || {};

  return (
    <Card
      title="Payment Distribution"
      subtitle={`Based on ${totalTransactions} completed checkouts today`}
    >
      {/* Distribution Progress Bar */}
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex mb-5 shadow-2xs">
        <div
          style={{ width: `${upiPercentage}%` }}
          className="bg-blue-600 h-full transition-all duration-500"
          title={`UPI: ${upiPercentage}%`}
        />
        <div
          style={{ width: `${cardPercentage}%` }}
          className="bg-indigo-600 h-full transition-all duration-500"
          title={`Card: ${cardPercentage}%`}
        />
        <div
          style={{ width: `${cashPercentage}%` }}
          className="bg-emerald-600 h-full transition-all duration-500"
          title={`Cash: ${cashPercentage}%`}
        />
      </div>

      {/* Breakdown Items */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100">
          <Smartphone className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <div className="text-lg font-black text-slate-900">{upiPercentage}%</div>
          <div className="text-[11px] font-semibold text-blue-800">UPI Digital</div>
        </div>

        <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100">
          <CreditCard className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
          <div className="text-lg font-black text-slate-900">{cardPercentage}%</div>
          <div className="text-[11px] font-semibold text-indigo-800">Debit / Card</div>
        </div>

        <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
          <Banknote className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
          <div className="text-lg font-black text-slate-900">{cashPercentage}%</div>
          <div className="text-[11px] font-semibold text-emerald-800">Cash Counter</div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentSummaryCard;
