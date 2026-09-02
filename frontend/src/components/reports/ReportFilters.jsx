import React from 'react';
import { Calendar, RefreshCw, Download } from 'lucide-react';
import { Button } from '../ui/Button';

export const DATE_RANGE_OPTIONS = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'This Month',
  'Last Month',
];

export const COMPARISON_OPTIONS = ['Previous Period', 'Same Period Last Month', 'None'];

export const ReportFilters = ({
  dateRange,
  onDateRangeChange,
  comparisonPeriod,
  onComparisonChange,
  onRefresh,
  onExport,
  isRefreshing,
  isExporting,
  loading,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
      {/* Left: Date Range & Comparison Selectors */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider pr-1">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>Period:</span>
        </div>

        {/* Date Range Dropdown */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          {DATE_RANGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Comparison Dropdown */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider pl-2 border-l border-slate-200">
          <span>Compare:</span>
        </div>

        <select
          value={comparisonPeriod}
          onChange={(e) => onComparisonChange(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
        >
          {COMPARISON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Right: Refresh & Export Actions */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing || loading}
          className="gap-1.5 text-xs bg-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          Refresh
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onExport}
          disabled={isExporting || loading}
          className="gap-1.5 text-xs shadow-2xs"
        >
          <Download className="h-3.5 w-3.5" />
          {isExporting ? 'Exporting...' : 'Export Report'}
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
