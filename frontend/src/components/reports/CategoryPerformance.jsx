import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { Layers } from 'lucide-react';

export const CategoryPerformance = ({ categories = [] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <Card padding="p-5" className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <Layers className="h-4 w-4 text-indigo-600" />
            <span>Sales by Product Category</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Category revenue contribution & volume share.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${cat.color || 'bg-blue-500'}`} />
                <span className="font-bold text-slate-900">{cat.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px] font-medium">{cat.percentage}%</span>
                <span className="font-black text-slate-900">{formatCurrency(cat.sales)}</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${cat.color || 'bg-blue-500'}`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryPerformance;
