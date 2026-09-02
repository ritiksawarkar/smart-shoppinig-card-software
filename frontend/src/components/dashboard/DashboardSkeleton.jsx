import React from 'react';
import { Card } from '../ui/Card';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stat Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} padding="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-slate-200 rounded-sm"></div>
                <div className="h-7 w-28 bg-slate-200 rounded-md"></div>
              </div>
              <div className="h-11 w-11 bg-slate-200 rounded-xl"></div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
              <div className="h-3 w-24 bg-slate-200 rounded-sm"></div>
              <div className="h-3 w-12 bg-slate-200 rounded-sm"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Sales Overview + Active Carts Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card title="Sales Overview">
            <div className="h-44 bg-slate-100 rounded-lg flex items-end justify-between p-4 gap-4">
              {[60, 80, 50, 90, 75, 100, 85].map((h, idx) => (
                <div
                  key={idx}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-slate-200 rounded-t-md"
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card title="Active Carts">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Low Stock + Weight Alerts Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card title="Low Stock Products">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card title="Weight Verification Alerts">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
