import React from 'react';
import { ScanBarcode, Tag, IndianRupee, Scale, Boxes, Calendar, FileText } from 'lucide-react';
import { ProductStatusBadge, StockLevelBadge } from './ProductStatusBadge';
import { Button } from '../ui/Button';

export const ProductDetails = ({ product, onEdit, onClose }) => {
  if (!product) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            ID: {product.id}
          </div>
          <h3 className="text-base font-extrabold text-white mt-0.5">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <ProductStatusBadge status={product.status} />
            <StockLevelBadge stock={product.stock} />
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Selling Price</div>
          <div className="text-xl font-black text-white mt-0.5">₹{product.price?.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Grid Information Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Barcode */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <ScanBarcode className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-500 uppercase text-[10px]">Barcode</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{product.barcode}</div>
          </div>
        </div>

        {/* Category */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <Tag className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-500 uppercase text-[10px]">Category</div>
            <div className="font-bold text-slate-900 mt-0.5">{product.category}</div>
          </div>
        </div>

        {/* Catalog Weight */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <Scale className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-500 uppercase text-[10px]">Catalog Weight</div>
            <div className="font-bold text-slate-900 mt-0.5">
              {product.weightValue} {product.weightUnit}
            </div>
          </div>
        </div>

        {/* Stock Reference */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <Boxes className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-500 uppercase text-[10px]">Stock Reference</div>
            <div className="font-bold text-slate-900 mt-0.5">{product.stock} units</div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
        <div className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1.5 mb-1">
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          Ingredients & Specifications
        </div>
        <p className="text-slate-700 leading-relaxed font-medium">
          {product.ingredients || 'No ingredients listed for this product.'}
        </p>
      </div>

      {/* System Timestamps */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Created: {new Date(product.createdAt).toLocaleDateString()}
        </span>
        <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            onClose();
            onEdit(product);
          }}
        >
          Edit Product Master
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
