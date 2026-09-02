import React from 'react';
import { Eye, Edit3, Power, ScanBarcode, ArrowUpDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { ProductStatusBadge, StockLevelBadge } from './ProductStatusBadge';
import { Button } from '../ui/Button';

export const ProductTable = ({
  products = [],
  sortBy,
  sortOrder,
  onSort,
  onView,
  onEdit,
  onDeactivate,
}) => {
  const formatWeight = (val, unit) => {
    if (!val) return '—';
    return `${val} ${unit || 'g'}`;
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') return '₹0';
    return `₹${price.toLocaleString('en-IN')}`;
  };

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>{renderSortHeader('Product Name & ID', 'name')}</TableHeadCell>
          <TableHeadCell>Barcode</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Category', 'category')}</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Price', 'price')}</TableHeadCell>
          <TableHeadCell>Catalog Weight</TableHeadCell>
          <TableHeadCell>{renderSortHeader('Stock (Ref)', 'stock')}</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell className="text-right">Actions</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.id}>
            {/* Product Name & ID */}
            <TableCell>
              <div>
                <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {item.id}</div>
              </div>
            </TableCell>

            {/* Barcode */}
            <TableCell>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                <ScanBarcode className="h-3.5 w-3.5 text-slate-500" />
                {item.barcode}
              </span>
            </TableCell>

            {/* Category */}
            <TableCell>
              <span className="font-medium text-slate-700">{item.category}</span>
            </TableCell>

            {/* Price */}
            <TableCell>
              <span className="font-extrabold text-slate-900 text-xs">{formatPrice(item.price)}</span>
            </TableCell>

            {/* Weight */}
            <TableCell>
              <span className="font-semibold text-slate-700">{formatWeight(item.weightValue, item.weightUnit)}</span>
            </TableCell>

            {/* Stock */}
            <TableCell>
              <StockLevelBadge stock={item.stock} />
            </TableCell>

            {/* Status */}
            <TableCell>
              <ProductStatusBadge status={item.status} />
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(item)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  title="View Product Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                  title="Edit Product Master"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>

                {item.status === 'Active' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeactivate(item)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Deactivate Product"
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
