import React from 'react';
import { IndianRupee, Receipt, ShoppingBag, Package, Scale, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatPercentage } from '../../utils/formatPercentage';

export const ReportSummaryCards = ({ overview, comparisonPeriod }) => {
  if (!overview) return null;

  const showComparison = comparisonPeriod && comparisonPeriod !== 'None' && overview.changes;

  const renderComparisonBadge = (changeVal, isNegativeGood = false) => {
    if (!showComparison || changeVal === undefined) return null;
    const isUp = changeVal > 0;
    const isPositive = isNegativeGood ? !isUp : isUp;

    return (
      <div
        className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded ${
          isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}
      >
        {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{formatPercentage(changeVal)}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Total Sales */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sales</div>
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <IndianRupee className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{formatCurrency(overview.totalSales)}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {renderComparisonBadge(overview.changes?.totalSales)}
            {showComparison && <span className="text-[10px] text-slate-400">vs prev</span>}
          </div>
        </div>
      </div>

      {/* 2. Total Transactions */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Transactions</div>
          <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Receipt className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{overview.totalTransactions.toLocaleString('en-IN')}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {renderComparisonBadge(overview.changes?.totalTransactions)}
            {showComparison && <span className="text-[10px] text-slate-400">vs prev</span>}
          </div>
        </div>
      </div>

      {/* 3. Average Transaction Value (ATV) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Cart Bill (ATV)</div>
          <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{formatCurrency(overview.averageTransactionValue, { includeDecimals: true })}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {renderComparisonBadge(overview.changes?.averageTransactionValue)}
            {showComparison && <span className="text-[10px] text-slate-400">vs prev</span>}
          </div>
        </div>
      </div>

      {/* 4. Items Sold */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Items Sold</div>
          <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Package className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{overview.itemsSold.toLocaleString('en-IN')}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {renderComparisonBadge(overview.changes?.itemsSold)}
            {showComparison && <span className="text-[10px] text-slate-400">vs prev</span>}
          </div>
        </div>
      </div>

      {/* 5. Weight Verification Issues */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Weight Mismatches</div>
          <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Scale className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-xl font-extrabold text-slate-900">{overview.weightVerificationIssues}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {renderComparisonBadge(overview.changes?.weightVerificationIssues, true)}
            {showComparison && <span className="text-[10px] text-slate-400">vs prev</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummaryCards;
