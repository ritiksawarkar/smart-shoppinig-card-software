import { useState, useEffect, useCallback } from 'react';
import { settingsService } from '../services/settingsService';
import {
  validateGeneralSettings,
  validateStoreSettings,
  validateCartSettings,
  validateWeightSettings,
  validateBillingSettings,
  validatePaymentSettings,
  validateSecuritySettings,
} from '../utils/settingsValidation';

export const SECTION_KEYS = {
  GENERAL: 'general',
  STORE: 'store',
  CART: 'cart',
  WEIGHT: 'weightVerification',
  BILLING: 'billing',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  SECURITY: 'security',
  PROFILE: 'profile',
  PREFERENCES: 'preferences',
  SYSTEM: 'systemInfo',
};

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [activeSection, setActiveSection] = useState(SECTION_KEYS.GENERAL);
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Modal controls
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [sensitiveModalData, setSensitiveModalData] = useState(null);
  const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
  const [pendingNavSection, setPendingNavSection] = useState(null);

  // Check if current formState has unsaved modifications
  const isDirty = Boolean(
    settings &&
    settings[activeSection] &&
    JSON.stringify(formState) !== JSON.stringify(settings[activeSection])
  );

  // Load all settings from service
  const loadSettings = useCallback(async (showToastMessage = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
      if (data[activeSection]) {
        setFormState(JSON.parse(JSON.stringify(data[activeSection])));
      }
      setValidationErrors({});
      if (showToastMessage) {
        setToast({ message: 'Configuration refreshed from backend.', type: 'info' });
      }
    } catch (err) {
      setError(err.message || 'Unable to load system settings from backend.');
    } finally {
      setLoading(false);
    }
  }, [activeSection]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Handle input changes inside form state
  const handleInputChange = (field, value) => {
    setFormState((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    // Clear specific field validation error when edited
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Section Navigation handler with unsaved changes prompt
  const changeSection = (newSection) => {
    if (newSection === activeSection) return;

    if (isDirty) {
      setPendingNavSection(newSection);
      setIsUnsavedModalOpen(true);
    } else {
      setActiveSection(newSection);
      if (settings && settings[newSection]) {
        setFormState(JSON.parse(JSON.stringify(settings[newSection])));
      }
      setValidationErrors({});
    }
  };

  // Confirm discarding unsaved changes during navigation or refresh
  const handleConfirmDiscard = () => {
    setIsUnsavedModalOpen(false);
    if (pendingNavSection) {
      setActiveSection(pendingNavSection);
      if (settings && settings[pendingNavSection]) {
        setFormState(JSON.parse(JSON.stringify(settings[pendingNavSection])));
      }
      setPendingNavSection(null);
      setValidationErrors({});
    } else if (pendingAction === 'REFRESH') {
      loadSettings(true);
      setPendingAction(null);
    }
  };

  // Discard changes in current section
  const discardSectionChanges = () => {
    if (settings && settings[activeSection]) {
      setFormState(JSON.parse(JSON.stringify(settings[activeSection])));
      setValidationErrors({});
      setToast({ message: 'Unsaved section changes discarded.', type: 'info' });
    }
  };

  // Validate active section form
  const validateCurrentSection = () => {
    let errors = {};
    switch (activeSection) {
      case SECTION_KEYS.GENERAL:
        errors = validateGeneralSettings(formState);
        break;
      case SECTION_KEYS.STORE:
        errors = validateStoreSettings(formState);
        break;
      case SECTION_KEYS.CART:
        errors = validateCartSettings(formState);
        break;
      case SECTION_KEYS.WEIGHT:
        errors = validateWeightSettings(formState);
        break;
      case SECTION_KEYS.BILLING:
        errors = validateBillingSettings(formState);
        break;
      case SECTION_KEYS.PAYMENTS:
        errors = validatePaymentSettings(formState);
        break;
      case SECTION_KEYS.SECURITY:
        errors = validateSecuritySettings(formState);
        break;
      default:
        break;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save current section settings
  const saveSection = async () => {
    if (!validateCurrentSection()) {
      setToast({ message: 'Please fix validation errors before saving.', type: 'error' });
      return;
    }

    // Check for sensitive configuration changes requiring confirmation
    if (activeSection === SECTION_KEYS.WEIGHT && formState.enabled === false && settings.weightVerification.enabled === true) {
      setSensitiveModalData({
        title: 'Disable Weight Verification?',
        message: 'Disabling weight verification will stop backend physical load-cell content validation on all active shopping carts.',
        type: 'warning',
        actionKey: 'DISABLE_WEIGHT',
      });
      return;
    }

    if (activeSection === SECTION_KEYS.PAYMENTS && formState.environment === 'Production' && settings.payments.environment !== 'Production') {
      setSensitiveModalData({
        title: 'Switch Payment Environment to Production?',
        message: 'You are switching payment processing to Production mode. Live customer payments will process real financial transactions.',
        type: 'danger',
        actionKey: 'PRODUCTION_PAYMENTS',
      });
      return;
    }

    await performSave();
  };

  // Execution function for section save
  const performSave = async () => {
    setSaving(true);
    try {
      const res = await settingsService.updateSection(activeSection, formState);
      setSettings((prev) => ({
        ...prev,
        [activeSection]: res.section,
        updatedAt: res.updatedAt,
      }));
      setFormState(JSON.parse(JSON.stringify(res.section)));
      setValidationErrors({});
      setToast({ message: res.message, type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Unable to save settings to backend.', type: 'error' });
    } finally {
      setSaving(false);
      setSensitiveModalData(null);
    }
  };

  // Refresh configuration with unsaved guard
  const handleRefresh = () => {
    if (isDirty) {
      setPendingAction('REFRESH');
      setIsUnsavedModalOpen(true);
    } else {
      loadSettings(true);
    }
  };

  // Sensor Calibration Action
  const handleCalibrateSensor = async () => {
    setSaving(true);
    try {
      const res = await settingsService.calibrateSensor();
      setSettings((prev) => ({
        ...prev,
        weightVerification: {
          ...prev.weightVerification,
          calibrationStatus: res.calibrationStatus,
          lastCalibration: res.lastCalibration,
          calibrationRequired: false,
        },
      }));
      if (activeSection === SECTION_KEYS.WEIGHT) {
        setFormState((prev) => ({
          ...prev,
          calibrationStatus: res.calibrationStatus,
          lastCalibration: res.lastCalibration,
          calibrationRequired: false,
        }));
      }
      setToast({ message: res.message, type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Calibration failed.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Restore Defaults Trigger
  const triggerRestoreDefaults = () => {
    setSensitiveModalData({
      title: 'Restore Factory Defaults?',
      message: 'This will reset all system configuration values to factory defaults. This action cannot be undone.',
      type: 'danger',
      actionKey: 'RESTORE_DEFAULTS',
    });
  };

  const handleRestoreDefaultsConfirm = async () => {
    setSaving(true);
    try {
      const res = await settingsService.restoreDefaults();
      setSettings(res.settings);
      setFormState(JSON.parse(JSON.stringify(res.settings[activeSection])));
      setToast({ message: res.message, type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Failed to restore settings.', type: 'error' });
    } finally {
      setSaving(false);
      setSensitiveModalData(null);
    }
  };

  return {
    settings,
    activeSection,
    formState,
    loading,
    saving,
    error,
    validationErrors,
    isDirty,
    toast,
    setToast,

    // Actions
    handleInputChange,
    changeSection,
    saveSection,
    discardSectionChanges,
    handleRefresh,
    handleCalibrateSensor,
    triggerRestoreDefaults,
    performSave,

    // Modal States
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    sensitiveModalData,
    setSensitiveModalData,
    handleRestoreDefaultsConfirm,
    isUnsavedModalOpen,
    setIsUnsavedModalOpen,
    handleConfirmDiscard,
  };
};
