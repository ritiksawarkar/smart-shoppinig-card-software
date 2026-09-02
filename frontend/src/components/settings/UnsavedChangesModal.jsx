import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { HelpCircle } from 'lucide-react';

export const UnsavedChangesModal = ({
  isOpen,
  onClose,
  onConfirmDiscard,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unsaved Changes Detected"
      subtitle="You have modified settings in this section."
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">Discard unsaved edits?</span>
            <p>
              Navigating away or refreshing will discard your un-saved edits for this category.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Stay & Edit
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onConfirmDiscard}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Discard Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UnsavedChangesModal;
