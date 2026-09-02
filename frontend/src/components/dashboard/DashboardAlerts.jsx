import React, { useState } from 'react';
import { AlertCircle, Boxes, Scale, CreditCard, X } from 'lucide-react';

export const DashboardAlerts = ({ alerts = [] }) => {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts);

  if (visibleAlerts.length === 0) return null;

  const dismissAlert = (id) => {
    setVisibleAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const getIcon = (msg) => {
    if (msg.includes('stock')) return <Boxes className="h-4 w-4 text-amber-600 shrink-0" />;
    if (msg.includes('weight')) return <Scale className="h-4 w-4 text-rose-600 shrink-0" />;
    return <CreditCard className="h-4 w-4 text-blue-600 shrink-0" />;
  };

  return (
    <div className="mb-6 space-y-2">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-3 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-2xs transition-all animate-fadeIn ${
            alert.type === 'error'
              ? 'bg-rose-50/90 border-rose-200 text-rose-900'
              : alert.type === 'warning'
              ? 'bg-amber-50/90 border-amber-200 text-amber-900'
              : 'bg-blue-50/90 border-blue-200 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {getIcon(alert.message)}
            <span>{alert.message}</span>
          </div>

          <button
            type="button"
            onClick={() => dismissAlert(alert.id)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
            aria-label="Dismiss alert"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardAlerts;
