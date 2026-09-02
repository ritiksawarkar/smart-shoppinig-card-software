import React from 'react';
import { BarChart3, TrendingUp, ShoppingBag, CreditCard, ShoppingCart, Scale } from 'lucide-react';

export const REPORT_TABS = [
  { id: 'Overview', label: 'Overview', icon: BarChart3 },
  { id: 'Sales', label: 'Sales & Revenue', icon: TrendingUp },
  { id: 'Products', label: 'Top Products', icon: ShoppingBag },
  { id: 'Payments', label: 'Payments', icon: CreditCard },
  { id: 'Cart Performance', label: 'Cart Performance', icon: ShoppingCart },
  { id: 'Weight Verification', label: 'Weight Verification', icon: Scale },
];

export const ReportTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
      {REPORT_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReportTabs;
