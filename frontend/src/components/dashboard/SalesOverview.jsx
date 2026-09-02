import React from 'react';
import { Card } from '../ui/Card';

export const SalesOverview = ({ data = [] }) => {
  const maxSales = Math.max(...data.map((d) => d.sales), 35000);

  return (
    <Card
      title="Sales Overview"
      subtitle="Weekly completed checkout revenue trend (Mon – Sun)"
      className="h-full flex flex-col justify-between"
    >
      <div className="pt-2 pb-1">
        {/* Sales Summary Metrics */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Weekly Revenue</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">₹1,72,580</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Peak Day</div>
            <div className="text-sm font-bold text-blue-600 mt-0.5">Saturday (₹31.6K)</div>
          </div>
        </div>

        {/* SVG/CSS Bar Chart Visualization */}
        <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-4 pt-4">
          {data.map((item) => {
            const heightPercent = Math.round((item.sales / maxSales) * 100);
            const isToday = item.day === 'Fri';

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-md whitespace-nowrap shadow-md pointer-events-none z-10">
                  ₹{item.sales.toLocaleString('en-IN')}
                </div>

                {/* Bar Element */}
                <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end p-1">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isToday
                        ? 'bg-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-700 group-hover:bg-blue-500'
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-xs font-semibold ${
                    isToday ? 'text-blue-600 font-extrabold' : 'text-slate-500'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default SalesOverview;
