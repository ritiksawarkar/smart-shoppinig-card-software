import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export const SensitiveSettingConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning', // 'warning' | 'danger'
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || 'Confirm Sensitive Action'}
      subtitle="Administrator Authorization Required"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          type === 'danger'
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          {type === 'danger' ? (
            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold block mb-1">Operational Security Warning</span>
            <p className="leading-relaxed">{message}</p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          This modification affects active backend business rule execution. Are you sure you want to apply this configuration change?
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant={type === 'danger' ? 'secondary' : 'primary'}
            size="sm"
            onClick={onConfirm}
            loading={loading}
            loadingText="Applying..."
            className={type === 'danger' ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}
          >
            Confirm & Apply Change
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SensitiveSettingConfirmModal;
