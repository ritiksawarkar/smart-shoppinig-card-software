import { initialSettingsMockData } from '../data/settingsMockData';

/**
 * Settings API Service for Smart Shopping Cart Platform
 * 
 * Interacts with backend configuration endpoints.
 * Operates on central backend state simulation for prototype development.
 */

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Persistent in-memory cache simulating backend database
let settingsDb = JSON.parse(JSON.stringify(initialSettingsMockData));

export const settingsService = {
  /**
   * Fetch complete system settings configuration from backend
   */
  async getSettings() {
    await delay(300);
    return JSON.parse(JSON.stringify(settingsDb));
  },

  /**
   * Update specific configuration section
   * @param {string} sectionKey - e.g. 'general', 'store', 'cart', 'weightVerification', etc.
   * @param {Object} payload - updated section values
   */
  async updateSection(sectionKey, payload) {
    await delay(450);

    if (!settingsDb[sectionKey]) {
      throw new Error(`Invalid settings section: ${sectionKey}`);
    }

    const previousSection = JSON.parse(JSON.stringify(settingsDb[sectionKey]));
    settingsDb[sectionKey] = {
      ...settingsDb[sectionKey],
      ...payload,
    };
    settingsDb.updatedAt = new Date().toISOString();
    settingsDb.updatedBy = 'System Administrator (adm_01)';

    // Log to audit history
    const auditEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      admin: 'System Administrator',
      setting: `${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} Settings`,
      previousValue: 'Previous Configuration',
      newValue: 'Updated Configuration',
      action: 'Updated',
    };
    settingsDb.auditHistory = [auditEntry, ...settingsDb.auditHistory];

    return {
      success: true,
      section: settingsDb[sectionKey],
      updatedAt: settingsDb.updatedAt,
      message: `${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} settings saved successfully.`,
    };
  },

  /**
   * Trigger backend sensor calibration routine for load cells
   */
  async calibrateSensor() {
    await delay(1200); // Simulate zero-point offset calibration sequence
    const calibratedTimestamp = new Date().toISOString();
    
    settingsDb.weightVerification.calibrationStatus = 'Calibrated';
    settingsDb.weightVerification.lastCalibration = calibratedTimestamp;
    settingsDb.weightVerification.calibrationRequired = false;

    settingsDb.auditHistory.unshift({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: calibratedTimestamp,
      admin: 'System Administrator',
      setting: 'Load Cell Sensor Array',
      previousValue: 'Calibration Request Triggered',
      newValue: 'Calibrated',
      action: 'Calibrated',
    });

    return {
      success: true,
      calibrationStatus: 'Calibrated',
      lastCalibration: calibratedTimestamp,
      message: 'Load cell sensor array successfully calibrated by backend hardware controller.',
    };
  },

  /**
   * Admin Password Change handler via backend authentication API
   */
  async changePassword({ currentPassword, newPassword }) {
    await delay(600);
    
    if (currentPassword === 'wrong') {
      throw new Error('Current password is incorrect.');
    }

    settingsDb.auditHistory.unshift({
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      admin: 'System Administrator',
      setting: 'Admin Password',
      previousValue: '******',
      newValue: '******',
      action: 'Password Changed',
    });

    return {
      success: true,
      message: 'Admin password updated successfully. Please use your new password on next login.',
    };
  },

  /**
   * Restore factory default system settings
   */
  async restoreDefaults() {
    await delay(800);
    settingsDb = JSON.parse(JSON.stringify(initialSettingsMockData));
    settingsDb.updatedAt = new Date().toISOString();

    return {
      success: true,
      settings: JSON.parse(JSON.stringify(settingsDb)),
      message: 'System settings restored to factory defaults.',
    };
  },

  /**
   * Fetch settings audit history log
   */
  async getAuditHistory() {
    await delay(200);
    return [...settingsDb.auditHistory];
  },

  /**
   * Fetch backend system health metrics
   */
  async getSystemHealth() {
    await delay(250);
    return { ...settingsDb.systemHealth, systemInfo: { ...settingsDb.systemInfo } };
  },
};
