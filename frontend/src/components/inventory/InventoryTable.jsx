import React from 'react';
import { ScanBarcode, History, Eye, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { StockStatusBadge } from './StockStatusBadge';
import { Button } from '../ui/Button';

export const InventoryTable = ({
  items = [],
  sortBy,
  sortOrder,
  onSort,
  onViewProduct,
  onAdjustStock,
  onViewHistory,
  onSetReorderLevel,
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

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>{renderSortHeader('Product Name & ID', 'name')}</TableHeadCell>
          <TableHeadCell>Barcode</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Category', 'category')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Current Stock', 'currentStock')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Reorder Level', 'reorderLevel')}</TableHeadCell>
          <TableHeadCell>Stock Status</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Last Updated', 'lastUpdated')}</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.productId}>
            {/* Product Name & ID */}
            <TableCell>
              <div>
                <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {item.productId}</div>
              </div>
            </TableCell>

            {/* Barcode */}
            <TableCell>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <ScanBarcode className="h-3 w-3 text-slate-500" />
                {item.barcode}
              </span>
            </TableCell>

            {/* Category */}
            <TableCell>
              <span className="font-medium text-slate-700">{item.category}</span>
            </TableCell>

            {/* Current Stock */}
            <TableCell>
              <span
                className={`font-black text-xs px-2 py-0.5 rounded-md ${
                  item.currentStock === 0
                    ? 'text-rose-700 bg-rose-50 border border-rose-200'
                    : item.currentStock <= item.reorderLevel
                    ? 'text-amber-800 bg-amber-50 border border-amber-200'
                    : 'text-slate-900'
                }`}
              >
                {item.currentStock} units
              </span>
            </TableCell>

            {/* Reorder Level */}
            <TableCell>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">{item.reorderLevel} units</span>
                <button
                  type="button"
                  onClick={() => onSetReorderLevel(item)}
                  className="text-slate-400 hover:text-blue-600 p-0.5 rounded-xs transition-colors cursor-pointer"
                  title="Update Reorder Level Threshold"
                >
                  <SlidersHorizontal className="h-3 w-3" />
                </button>
              </div>
            </TableCell>

            {/* Stock Status */}
            <TableCell>
              <StockStatusBadge status={item.status} />
            </TableCell>

            {/* Last Updated */}
            <TableCell className="text-slate-500 text-[11px]">
              {formatDate(item.lastUpdated)}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewProduct(item.productId)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  title="View Product Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAdjustStock(item)}
                  className="px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200/80 rounded-md"
                  title="Manual Stock Adjustment"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 mr-1 inline" />
                  Adjust
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewHistory(item)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                  title="View Stock History & Audit Logs"
                >
                  <History className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
