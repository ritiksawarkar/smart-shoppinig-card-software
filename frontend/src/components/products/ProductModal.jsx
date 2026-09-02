import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { ProductForm } from './ProductForm';
import { ProductDetails } from './ProductDetails';
import { Button } from '../ui/Button';

export const ProductModal = ({
  mode,
  isOpen,
  onClose,
  product,
  onSubmit,
  onConfirmDeactivate,
  isSubmitting,
}) => {
  if (!isOpen || !mode) return null;

  const getTitle = () => {
    switch (mode) {
      case 'add':
        return 'Add New Product Master';
      case 'edit':
        return 'Edit Product Master';
      case 'view':
        return 'Product Details';
      case 'deactivate':
        return 'Deactivate Product Confirmation';
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'add':
        return 'Create a new product record for smart shopping cart barcode lookup.';
      case 'edit':
        return 'Update master barcode, selling price, or weight specification.';
      case 'view':
        return 'Complete product attributes and barcode registration.';
      case 'deactivate':
        return 'Deactivating hides product from cart scans while preserving transaction history.';
      default:
        return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      subtitle={getSubtitle()}
      maxWidth={mode === 'deactivate' ? 'max-w-md' : 'max-w-xl'}
    >
      {mode === 'add' || mode === 'edit' ? (
        <ProductForm
          initialData={mode === 'edit' ? product : null}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      ) : mode === 'view' ? (
        <ProductDetails
          product={product}
          onEdit={(prod) => {
            onClose();
            onSubmit(prod);
          }}
          onClose={onClose}
        />
      ) : mode === 'deactivate' ? (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Are you sure you want to deactivate this product?</div>
              <div className="text-[11px] text-amber-800 mt-0.5">
                <span className="font-semibold">{product?.name}</span> (Barcode: {product?.barcode}) will no longer be active for new cart scans. Existing transaction logs remain intact.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConfirmDeactivate(product?.id)}
              loading={isSubmitting}
              loadingText="Deactivating..."
              className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-600/50"
            >
              Deactivate Product
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default ProductModal;
