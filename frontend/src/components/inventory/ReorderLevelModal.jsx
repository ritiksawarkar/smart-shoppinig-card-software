import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ReorderLevelModal = ({ isOpen, onClose, product, onSubmit, isSubmitting }) => {
  const [reorderLevel, setReorderLevel] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setReorderLevel(product.reorderLevel?.toString() || '10');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const val = Number(reorderLevel);
    if (isNaN(val) || val < 0) {
      setError('Reorder level threshold must be a non-negative number.');
      return;
    }

    onSubmit(product.productId, val);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Reorder Level Threshold"
      subtitle={`Set minimum inventory threshold for ${product.name}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="font-bold text-slate-900">{product.name}</div>
          <div className="text-slate-500 font-mono mt-0.5">
            Current Stock: <span className="font-bold text-slate-900">{product.currentStock} units</span>
          </div>
        </div>

        <Input
          label="Reorder Level Threshold (Units)"
          type="number"
          min="0"
          value={reorderLevel}
          onChange={(e) => setReorderLevel(e.target.value)}
          placeholder="e.g. 10"
          error={error}
          required
          disabled={isSubmitting}
        />

        <p className="text-[11px] text-slate-500 leading-relaxed bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
          When inventory drops at or below this threshold, the system automatically flags the product as <span className="font-bold text-amber-800">Low Stock</span> on the dashboard and inventory console.
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" loading={isSubmitting} loadingText="Updating...">
            Save Reorder Level
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReorderLevelModal;
