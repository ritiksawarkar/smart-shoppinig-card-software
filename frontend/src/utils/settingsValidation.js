/**
 * Settings Validation Utilities
 * 
 * Provides field-level and section-level validation for system configuration.
 */

export const validateGeneralSettings = (data) => {
  const errors = {};
  if (!data.applicationName || !data.applicationName.trim()) {
    errors.applicationName = 'Application Name is required.';
  }
  if (!data.storeName || !data.storeName.trim()) {
    errors.storeName = 'Store Name is required.';
  }
  return errors;
};

export const validateStoreSettings = (data) => {
  const errors = {};
  if (!data.storeName || !data.storeName.trim()) {
    errors.storeName = 'Store Name is required.';
  }
  if (!data.contactNumber || !data.contactNumber.trim()) {
    errors.contactNumber = 'Contact Number is required.';
  }
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!data.storeCode || !data.storeCode.trim()) {
    errors.storeCode = 'Store Code is required.';
  }
  return errors;
};

export const validateCartSettings = (data) => {
  const errors = {};
  if (data.sessionTimeout === undefined || data.sessionTimeout === null || Number(data.sessionTimeout) <= 0) {
    errors.sessionTimeout = 'Session timeout must be a positive number greater than 0.';
  }
  if (data.inactivityTimeout === undefined || data.inactivityTimeout === null || Number(data.inactivityTimeout) <= 0) {
    errors.inactivityTimeout = 'Inactivity timeout must be a positive number greater than 0.';
  }
  if (data.scannerTimeout === undefined || data.scannerTimeout === null || Number(data.scannerTimeout) <= 0) {
    errors.scannerTimeout = 'Scanner connection timeout must be a positive number greater than 0.';
  }
  if (data.sensorTimeout === undefined || data.sensorTimeout === null || Number(data.sensorTimeout) <= 0) {
    errors.sensorTimeout = 'Sensor connection timeout must be a positive number greater than 0.';
  }
  return errors;
};

export const validateWeightSettings = (data) => {
  const errors = {};
  if (data.absoluteTolerance === undefined || data.absoluteTolerance === null || Number(data.absoluteTolerance) < 0) {
    errors.absoluteTolerance = 'Absolute weight tolerance cannot be negative.';
  }
  if (data.percentageTolerance === undefined || data.percentageTolerance === null || Number(data.percentageTolerance) < 0) {
    errors.percentageTolerance = 'Percentage weight tolerance cannot be negative.';
  } else if (Number(data.percentageTolerance) > 50) {
    errors.percentageTolerance = 'Percentage tolerance cannot exceed 50%.';
  }
  if (data.minimumWeightThreshold === undefined || data.minimumWeightThreshold === null || Number(data.minimumWeightThreshold) < 0) {
    errors.minimumWeightThreshold = 'Minimum weight threshold cannot be negative.';
  }
  if (data.stabilizationTime === undefined || data.stabilizationTime === null || Number(data.stabilizationTime) < 100) {
    errors.stabilizationTime = 'Sensor stabilization time must be at least 100 ms.';
  }
  if (data.stableReadings === undefined || data.stableReadings === null || Number(data.stableReadings) < 1) {
    errors.stableReadings = 'Number of stable readings must be at least 1.';
  }
  if (data.retryCount === undefined || data.retryCount === null || Number(data.retryCount) < 1) {
    errors.retryCount = 'Verification retry count must be at least 1.';
  }
  return errors;
};

export const validateBillingSettings = (data) => {
  const errors = {};
  if (!data.receiptPrefix || !data.receiptPrefix.trim()) {
    errors.receiptPrefix = 'Receipt prefix is required.';
  }
  if (!data.transactionPrefix || !data.transactionPrefix.trim()) {
    errors.transactionPrefix = 'Transaction prefix is required.';
  }
  if (data.defaultTaxRate !== undefined && (Number(data.defaultTaxRate) < 0 || Number(data.defaultTaxRate) > 100)) {
    errors.defaultTaxRate = 'Default tax rate must be between 0% and 100%.';
  }
  return errors;
};

export const validatePaymentSettings = (data) => {
  const errors = {};
  if (data.paymentTimeout === undefined || data.paymentTimeout === null || Number(data.paymentTimeout) <= 0) {
    errors.paymentTimeout = 'Payment timeout must be a positive number greater than 0.';
  }
  if (data.paymentRetryLimit === undefined || data.paymentRetryLimit === null || Number(data.paymentRetryLimit) < 0) {
    errors.paymentRetryLimit = 'Payment retry limit cannot be negative.';
  }
  return errors;
};

export const validateSecuritySettings = (data) => {
  const errors = {};
  if (data.adminSessionTimeout === undefined || data.adminSessionTimeout === null || Number(data.adminSessionTimeout) <= 0) {
    errors.adminSessionTimeout = 'Admin session timeout must be a positive number.';
  }
  if (data.loginAttemptLimit === undefined || data.loginAttemptLimit === null || Number(data.loginAttemptLimit) < 1) {
    errors.loginAttemptLimit = 'Login attempt limit must be at least 1.';
  }
  return errors;
};

export const validatePasswordChange = ({ currentPassword, newPassword, confirmPassword }) => {
  const errors = {};
  if (!currentPassword) {
    errors.currentPassword = 'Current password is required.';
  }
  if (!newPassword) {
    errors.newPassword = 'New password is required.';
  } else if (newPassword.length < 8) {
    errors.newPassword = 'New password must be at least 8 characters long.';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password.';
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
};
