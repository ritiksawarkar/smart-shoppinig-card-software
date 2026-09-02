import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

export const StatCard = ({
  title,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon: Icon,
  iconBg = 'bg-blue-50 text-blue-600 border-blue-200/80',
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={`transition-all duration-150 ${onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-md active:scale-[0.99]' : ''}`}
      padding="p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {subtext && <span className="text-slate-500 font-medium truncate">{subtext}</span>}

        {trend && (
          <span
            className={`inline-flex items-center gap-1 font-bold shrink-0 ${
              trendPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trendPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{trend}</span>
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
