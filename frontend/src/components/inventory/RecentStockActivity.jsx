import React from 'react';
import { History, TrendingUp, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const RecentStockActivity = ({ activities = [] }) => {
  return (
    <Card
      title="Recent Stock Activity"
      subtitle="Audit trail of recent stock restocks, manual adjustments, and confirmed sales"
    >
      {activities.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-500">
          <History className="h-6 w-6 text-slate-300 mx-auto mb-1" />
          No recent stock activity logged yet.
        </div>
      ) : (
        <div className="space-y-2.5">
          {activities.map((item) => {
            const isPositive = item.changeType === 'positive' || item.change.startsWith('+');

            return (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isPositive
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>

                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{item.productName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>Reason: <span className="font-medium text-slate-700">{item.reason}</span></span>
                      &bull;
                      <span>Resulting Stock: <span className="font-bold text-slate-900">{item.newStock}</span></span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`font-black text-sm ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {item.change}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-slate-400" />
                    <span>{item.updatedBy}</span>
                    &bull;
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default RecentStockActivity;
