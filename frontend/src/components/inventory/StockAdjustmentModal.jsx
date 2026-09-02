import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { AlertCircle, PlusCircle, MinusCircle } from 'lucide-react';

export const REASON_OPTIONS = [
  'New Stock Received',
  'Damaged Product',
  'Expired Product',
  'Supplier Return',
  'Physical Count Correction',
  'Inventory Audit',
  'Other',
];

export const StockAdjustmentModal = ({
  isOpen,
  onClose,
  targetProduct,
  productsList = [],
  onSubmit,
  isSubmitting,
}) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('Add Stock');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('New Stock Received');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (targetProduct) {
      setSelectedProductId(targetProduct.productId);
    } else if (productsList.length > 0) {
      setSelectedProductId(productsList[0].productId);
    }
  }, [targetProduct, productsList]);

  const activeProduct = productsList.find((p) => p.productId === selectedProductId) || targetProduct;

  const handleTypeSelect = (type) => {
    setAdjustmentType(type);
    if (type === 'Add Stock' && reason === 'Damaged Product') {
      setReason('New Stock Received');
    } else if (type === 'Remove Stock' && reason === 'New Stock Received') {
      setReason('Damaged Product');
    }
  };

  const calculateResultingStock = () => {
    if (!activeProduct) return 0;
    const current = activeProduct.currentStock || 0;
    const qty = Number(quantity) || 0;
    if (adjustmentType === 'Add Stock') return current + qty;
    return current - qty;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedProductId) {
      setError('Please select a product.');
      return;
    }

    const qty = Number(quantity);
    if (!quantity || isNaN(qty) || qty <= 0) {
      setError('Quantity must be a positive number greater than zero.');
      return;
    }

    if (adjustmentType === 'Remove Stock' && activeProduct && activeProduct.currentStock < qty) {
      setError(
        `Insufficient stock for this adjustment. Current stock is ${activeProduct.currentStock}, cannot remove ${qty}.`
      );
      return;
    }

    onSubmit({
      productId: selectedProductId,
      adjustmentType,
      quantity: qty,
      reason,
      notes,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Stock Adjustment"
      subtitle="Record stock additions, damage removals, or audit corrections with movement logging."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Product Selection */}
        {targetProduct ? (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Product</div>
            <div className="font-bold text-slate-900">{targetProduct.name}</div>
            <div className="text-slate-500 font-mono">Barcode: {targetProduct.barcode} &bull; Current Stock: <span className="font-bold text-slate-900">{targetProduct.currentStock}</span></div>
          </div>
        ) : (
          <Select
            label="Select Product"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            options={productsList.map((p) => ({
              value: p.productId,
              label: `${p.name} (Stock: ${p.currentStock})`,
            }))}
            required
            disabled={isSubmitting}
          />
        )}

        {/* Adjustment Type Selector Toggle */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Adjustment Type <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleTypeSelect('Add Stock')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                adjustmentType === 'Add Stock'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-600/20'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <PlusCircle className="h-4 w-4 text-blue-600" />
              Add Stock
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect('Remove Stock')}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                adjustmentType === 'Remove Stock'
                  ? 'bg-rose-50 border-rose-600 text-rose-700 ring-2 ring-rose-600/20'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MinusCircle className="h-4 w-4 text-rose-600" />
              Remove Stock
            </button>
          </div>
        </div>

        {/* Quantity Input */}
        <Input
          label="Adjustment Quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 50"
          required
          disabled={isSubmitting}
        />

        {/* Resulting Stock Preview Card */}
        {activeProduct && (
          <div className="p-3 rounded-lg bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Stock Result Preview:</span>
            <span>
              {activeProduct.currentStock} &rarr; <span className="font-extrabold text-blue-400">{calculateResultingStock()} units</span>
            </span>
          </div>
        )}

        {/* Reason Dropdown */}
        <Select
          label="Reason for Adjustment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          options={REASON_OPTIONS}
          required
          disabled={isSubmitting}
        />

        {/* Optional Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Notes / Audit Reference
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Supplier delivery invoice #INV-8821 or damaged package notes"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" loading={isSubmitting} loadingText="Saving...">
            Confirm Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StockAdjustmentModal;
