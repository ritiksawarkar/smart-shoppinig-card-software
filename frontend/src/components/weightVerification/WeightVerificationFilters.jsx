import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const VERIFICATION_STATUS_OPTIONS = [
  'Verified',
  'Verification Required',
  'Pending',
  'Resolved',
  'Sensor Error',
];

export const WeightVerificationFilters = ({
  status,
  onStatusChange,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(status);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* Verification Status Dropdown */}
      <div className="w-48 sm:w-56">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          <option value="">All Verification Statuses</option>
          {VERIFICATION_STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Action */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-slate-600 hover:text-slate-900 gap-1.5 h-8 text-xs font-medium"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default WeightVerificationFilters;
