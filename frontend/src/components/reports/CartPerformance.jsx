import React from 'react';
import { Card } from '../ui/Card';
import { ShoppingCart, Zap, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const CartPerformance = ({ cartPerformance }) => {
  if (!cartPerformance) return null;

  const {
    totalSessions = 2850,
    completedSessions = 2480,
    abandonedSessions = 370,
    avgDurationMinutes = 18.75,
    avgItemsPerCart = 4.53,
    cartUtilization = 76.0,
    checkoutTimeSmartCartSec = 42,
    checkoutTimeConventionalSec = 200,
    timeSavedSec = 158,
  } = cartPerformance;

  return (
    <Card padding="p-5" className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <ShoppingCart className="h-4 w-4 text-blue-600" />
            <span>Smart Shopping Cart Operational Analytics</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hardware cart utilization, shopping session metrics & queue time reduction.
          </p>
        </div>
      </div>

      {/* Grid of Key Cart Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Total Sessions</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{totalSessions.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
            <span className="text-emerald-700 font-semibold">{completedSessions} done</span>
            <span className="text-rose-600 font-semibold">{abandonedSessions} open/dropped</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Session Duration</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{avgDurationMinutes} mins</div>
          <div className="text-[10px] text-slate-500 mt-1">Per completed customer journey</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Items / Cart</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{avgItemsPerCart} items</div>
          <div className="text-[10px] text-slate-500 mt-1">Real-time scan average</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Hardware Cart Utilization</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{cartUtilization}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Active fleet occupancy</div>
        </div>
      </div>

      {/* Benchmark Queue & Checkout Time Reduction Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-3 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-blue-300">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Checkout Queue Processing Comparison</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded text-[11px] font-extrabold">
            79% Queue Time Reduction
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <div className="text-[10px] text-blue-200 uppercase font-bold">Smart Cart Checkout</div>
            <div className="text-xl font-black text-white mt-1">{checkoutTimeSmartCartSec} sec</div>
            <div className="text-[10px] text-blue-300 mt-0.5">Instant barcode scan + cart load cell</div>
          </div>

          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <div className="text-[10px] text-blue-200 uppercase font-bold">Conventional Cashier Queue</div>
            <div className="text-xl font-black text-slate-300 mt-1">3 min 20 sec</div>
            <div className="text-[10px] text-blue-300 mt-0.5">Manual conveyor belt scanning</div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40">
            <div className="text-[10px] text-emerald-300 uppercase font-bold">Time Saved Per Customer</div>
            <div className="text-xl font-black text-emerald-400 mt-1">2 min 38 sec</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">Significantly reduces store waiting queues</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartPerformance;
