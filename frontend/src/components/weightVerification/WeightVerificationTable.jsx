import React from 'react';
import { Eye, ArrowUpDown, Scale, Clock } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { VerificationStatusBadge } from './VerificationStatusBadge';
import { Button } from '../ui/Button';
import { formatWeight, formatDifference } from '../../utils/formatWeight';

export const WeightVerificationTable = ({
  records = [],
  sortBy,
  sortOrder,
  onSort,
  onViewDetails,
}) => {
  const renderSortHeader = (label, field) => {
    const isActive = sortBy === field;
    return (
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-semibold"
      >
        <span>{label}</span>
        <ArrowUpDown className={`h-3 w-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
      </button>
    );
  };

  const formatLastChecked = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '—';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>{renderSortHeader('Cart ID', 'cartId')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Items', 'itemCount')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Expected Wt', 'expectedWeight')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Actual Wt', 'actualWeight')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Difference', 'difference')}</TableHeadCell>
          <TableHeadCell>Tolerance</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Last Checked', 'lastChecked')}</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => {
          const isMismatch = record.status === 'Verification Required';

          return (
            <TableRow key={record.id}>
              {/* Cart ID & Session */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                    <Scale className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-xs font-mono">{record.cartId}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {record.sessionId ? record.sessionId.slice(-12) : ''}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Items */}
              <TableCell>
                <span className="font-bold text-slate-800 text-xs">{record.itemCount} items</span>
              </TableCell>

              {/* Expected Weight */}
              <TableCell>
                <span className="font-medium text-slate-700 text-xs">{formatWeight(record.expectedWeight)}</span>
              </TableCell>

              {/* Actual Weight */}
              <TableCell>
                <span className={`font-semibold text-xs ${isMismatch ? 'text-rose-700 font-bold' : 'text-slate-800'}`}>
                  {formatWeight(record.actualWeight)}
                </span>
              </TableCell>

              {/* Difference */}
              <TableCell>
                <span
                  className={`font-black text-xs px-2 py-0.5 rounded-md ${
                    isMismatch
                      ? 'text-rose-700 bg-rose-50 border border-rose-200'
                      : 'text-slate-800 bg-slate-100'
                  }`}
                >
                  {formatDifference(record.difference)}
                </span>
              </TableCell>

              {/* Tolerance */}
              <TableCell className="text-slate-600 text-xs">
                ±{record.tolerance.toFixed(2)} kg
              </TableCell>

              {/* Verification Status */}
              <TableCell>
                <VerificationStatusBadge status={record.status} />
              </TableCell>

              {/* Last Checked */}
              <TableCell className="text-slate-500 text-[11px]">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {formatLastChecked(record.lastChecked)}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(record.id)}
                  className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200/80 rounded-md"
                  title="View Load Cell Telemetry & Cart Breakdown"
                >
                  <Eye className="h-3.5 w-3.5 mr-1 inline" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default WeightVerificationTable;
