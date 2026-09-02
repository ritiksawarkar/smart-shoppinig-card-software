import React from 'react';
import { formatWeight, formatDifference } from '../../utils/formatWeight';
import { Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

export const WeightComparisonCard = ({
  expectedWeight,
  actualWeight,
  difference,
  tolerance = 0.02,
  status,
}) => {
  const isExceeded = status === 'Verification Required';

  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-slate-600" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Weight Verification Telemetry
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          {isExceeded ? (
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          )}
          <span>Tolerance: ±{tolerance.toFixed(2)} kg</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Expected Weight</div>
          <div className="font-extrabold text-slate-800 text-sm mt-0.5">{formatWeight(expectedWeight)}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Actual Weight</div>
          <div className="font-extrabold text-slate-900 text-sm mt-0.5">{formatWeight(actualWeight)}</div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Difference</div>
          <div
            className={`font-black text-sm mt-0.5 ${
              isExceeded ? 'text-rose-600' : 'text-slate-800'
            }`}
          >
            {formatDifference(difference)}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">Allowed Threshold</div>
          <div className="font-semibold text-slate-700 text-sm mt-0.5">±{tolerance.toFixed(2)} kg</div>
        </div>
      </div>
    </div>
  );
};

export default WeightComparisonCard;
