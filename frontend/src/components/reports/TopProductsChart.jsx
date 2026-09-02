import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { ShoppingBag, Package } from 'lucide-react';

export const TopProductsChart = ({ products = [] }) => {
  if (!products || products.length === 0) return null;

  const maxSales = Math.max(...products.map((p) => p.sales)) || 1;

  return (
    <Card padding="p-5" className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <ShoppingBag className="h-4 w-4 text-blue-600" />
            <span>Top Performing Products</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by total retail sales revenue & quantity sold.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((prd, idx) => {
          const barWidthPercent = Math.round((prd.sales / maxSales) * 100);

          return (
            <div key={prd.productId || idx} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="h-5 w-5 rounded bg-slate-100 font-mono font-bold text-slate-600 flex items-center justify-center text-[10px] shrink-0">
                    #{idx + 1}
                  </span>
                  <span className="font-bold text-slate-900 truncate">{prd.productName}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Package className="h-3 w-3 text-slate-400" />
                    {prd.quantitySold} units
                  </span>
                  <span className="font-black text-slate-900 font-mono">
                    {formatCurrency(prd.sales)}
                  </span>
                </div>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TopProductsChart;
