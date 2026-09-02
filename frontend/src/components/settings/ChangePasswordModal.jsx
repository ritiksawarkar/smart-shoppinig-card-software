import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { validatePasswordChange } from '../../utils/settingsValidation';
import { settingsService } from '../../services/settingsService';

export const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setServerError(null);
  };

  const handleReset = () => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    setServerError(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validatePasswordChange(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setServerError(null);
    try {
      const res = await settingsService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      handleClose();
      if (onSuccess) onSuccess(res.message);
    } catch (err) {
      setServerError(err.message || 'Failed to change password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Admin Password"
      subtitle="Update your administrator authentication password."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <Lock className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={(e) => handleChange('currentPassword', e.target.value)}
          error={errors.currentPassword}
          leftIcon={KeyRound}
          required
          placeholder="••••••••"
        />

        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={(e) => handleChange('newPassword', e.target.value)}
          error={errors.newPassword}
          leftIcon={Lock}
          required
          placeholder="At least 8 characters"
        />

        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          leftIcon={Lock}
          required
          placeholder="Re-enter new password"
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={submitting}
            loadingText="Updating..."
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
            Update Password
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
