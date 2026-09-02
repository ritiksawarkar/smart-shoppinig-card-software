import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { formatCurrency } from '../../utils/formatCurrency';
import { Card } from '../ui/Card';
import { Table as TableIcon } from 'lucide-react';

export const SalesReportTable = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <Card padding="p-0">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
          <TableIcon className="h-4 w-4 text-blue-600" />
          <span>Daily Financial & Transaction Summary Table</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">Authoritative Backend Audit Log</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell className="text-center">Transactions</TableHeadCell>
            <TableHeadCell className="text-center">Items Sold</TableHeadCell>
            <TableHeadCell className="text-right">Gross Sales</TableHeadCell>
            <TableHeadCell className="text-right">Avg Cart Bill (ATV)</TableHeadCell>
            <TableHeadCell className="text-right">Refunds</TableHeadCell>
            <TableHeadCell className="text-right">Net Sales</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-bold text-slate-900 text-xs">{row.date}</TableCell>
              <TableCell className="text-center font-bold text-slate-800 text-xs">{row.transactions}</TableCell>
              <TableCell className="text-center font-medium text-slate-700 text-xs">{row.itemsSold}</TableCell>
              <TableCell className="text-right font-medium text-slate-700 text-xs">{formatCurrency(row.grossSales)}</TableCell>
              <TableCell className="text-right font-mono text-slate-800 text-xs">{formatCurrency(row.atv, { includeDecimals: true })}</TableCell>
              <TableCell className="text-right text-rose-600 font-medium text-xs">
                {row.refunds > 0 ? `-${formatCurrency(row.refunds)}` : '₹0'}
              </TableCell>
              <TableCell className="text-right font-black text-slate-900 text-xs">{formatCurrency(row.netSales)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SalesReportTable;
