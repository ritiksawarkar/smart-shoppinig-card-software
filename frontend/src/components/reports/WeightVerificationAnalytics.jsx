import React from 'react';
import { Card } from '../ui/Card';
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VerificationStatusBadge } from '../weightVerification/VerificationStatusBadge';

export const WeightVerificationAnalytics = ({ weightVerification }) => {
  if (!weightVerification) return null;

  const {
    totalVerifications = 2480,
    verifiedCount = 2380,
    verificationRequiredCount = 75,
    sensorErrorsCount = 25,
    mismatchTrend = [],
  } = weightVerification;

  const maxTrend = Math.max(...mismatchTrend.map((m) => m.count)) || 1;

  return (
    <Card padding="p-5" className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
            <Scale className="h-4 w-4 text-amber-600" />
            <span>Load Cell Weight Verification Telemetry</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit logs comparing catalog expected weights against physical load cell measurements.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
          <span>Tolerance: ±0.02 kg</span>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <div className="text-[10px] text-emerald-800 font-bold uppercase">Verified (In Tolerance)</div>
          <div className="text-lg font-extrabold text-emerald-950 mt-0.5">{verifiedCount.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-emerald-700 mt-1">96.0% accuracy rate</div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
          <div className="text-[10px] text-amber-800 font-bold uppercase">Verification Required</div>
          <div className="text-lg font-extrabold text-amber-950 mt-0.5">{verificationRequiredCount}</div>
          <div className="text-[10px] text-amber-700 mt-1">Packaging variation / review</div>
        </div>

        <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200">
          <div className="text-[10px] text-rose-800 font-bold uppercase">Sensor Errors</div>
          <div className="text-lg font-extrabold text-rose-950 mt-0.5">{sensorErrorsCount}</div>
          <div className="text-[10px] text-rose-700 mt-1">Load cell timeout / zero drift</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-bold uppercase">Resolved Mismatches</div>
          <div className="text-lg font-extrabold text-slate-900 mt-0.5">{verificationRequiredCount}</div>
          <div className="text-[10px] text-slate-500 mt-1">100% store supervisor audited</div>
        </div>
      </div>

      {/* Verification Mismatches Over Time Bar Visual */}
      {mismatchTrend.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Verification Mismatch Occurrences Over Time
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-24 pt-4">
            {mismatchTrend.map((m, idx) => {
              const heightPercent = Math.round((m.count / maxTrend) * 100);
              return (
                <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-bold text-amber-800 font-mono">{m.count}</span>
                  <div
                    className="w-full bg-amber-500 rounded-t-sm transition-all"
                    style={{ height: `${Math.max(heightPercent, 10)}%` }}
                  />
                  <span className="text-[9px] font-medium text-slate-500">{m.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeightVerificationAnalytics;
