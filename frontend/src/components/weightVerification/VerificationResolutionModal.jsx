import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const RESOLUTION_REASON_OPTIONS = [
  'Product Weight Variation',
  'Customer Corrected Cart',
  'Product Physically Removed',
  'Quantity Corrected',
  'Sensor Calibration Issue',
  'Other',
];

export const VerificationResolutionModal = ({
  isOpen,
  onClose,
  record,
  onSubmit,
  isSubmitting,
}) => {
  const [reason, setReason] = useState('Product Weight Variation');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen || !record) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!reason) {
      setError('Please select a resolution reason.');
      return;
    }

    onSubmit(record.id, { reason, notes });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resolve Weight Verification Mismatch"
      subtitle={`Auditable resolution for ${record.cartId}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Record Info Banner */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cart & Telemetry</div>
          <div className="font-bold text-slate-900">{record.cartId} ({record.sessionId})</div>
          <div className="text-slate-500 font-mono">
            Expected: <span className="font-bold text-slate-800">{record.expectedWeight} kg</span> &bull; Actual:{' '}
            <span className="font-bold text-slate-900">{record.actualWeight} kg</span> &bull; Difference:{' '}
            <span className="font-black text-rose-600">+{record.difference} kg</span>
          </div>
        </div>

        {/* Reason Dropdown */}
        <Select
          label="Resolution Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          options={RESOLUTION_REASON_OPTIONS}
          required
          disabled={isSubmitting}
        />

        {/* Optional Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Resolution Notes / Store Explanation
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2.5}
            placeholder="e.g. Packaging weight variation confirmed within store accepted limit by supervisor."
            disabled={isSubmitting}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" loading={isSubmitting} loadingText="Saving...">
            <CheckCircle2 className="h-4 w-4 mr-1 inline" />
            Confirm Resolution
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default VerificationResolutionModal;
