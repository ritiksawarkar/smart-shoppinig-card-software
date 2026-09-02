import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import Toast from '../components/ui/Toast';
import { useSettings, SECTION_KEYS } from '../hooks/useSettings';

// Settings Sub-components
import SettingsSidebar, { navItems } from '../components/settings/SettingsSidebar';
import SettingsHeader from '../components/settings/SettingsHeader';
import GeneralSettings from '../components/settings/GeneralSettings';
import StoreSettings from '../components/settings/StoreSettings';
import CartSettings from '../components/settings/CartSettings';
import WeightVerificationSettings from '../components/settings/WeightVerificationSettings';
import BillingSettings from '../components/settings/BillingSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import AdminProfileSettings from '../components/settings/AdminProfileSettings';
import SystemPreferencesSettings from '../components/settings/SystemPreferencesSettings';
import SystemInformationSettings from '../components/settings/SystemInformationSettings';

// Modals
import ChangePasswordModal from '../components/settings/ChangePasswordModal';
import SensitiveSettingConfirmModal from '../components/settings/SensitiveSettingConfirmModal';
import UnsavedChangesModal from '../components/settings/UnsavedChangesModal';

export const Settings = () => {
  const {
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

    handleInputChange,
    changeSection,
    saveSection,
    discardSectionChanges,
    handleRefresh,
    handleCalibrateSensor,
    triggerRestoreDefaults,
    performSave,

    isPasswordModalOpen,
    setIsPasswordModalOpen,
    sensitiveModalData,
    setSensitiveModalData,
    handleRestoreDefaultsConfirm,
    isUnsavedModalOpen,
    setIsUnsavedModalOpen,
    handleConfirmDiscard,
  } = useSettings();

  const activeNavItem = navItems.find((item) => item.id === activeSection) || navItems[0];
  const isReadOnlySection = activeSection === SECTION_KEYS.SYSTEM;

  // Sensitive confirmation callback dispatcher
  const handleSensitiveConfirm = () => {
    if (sensitiveModalData?.actionKey === 'RESTORE_DEFAULTS') {
      handleRestoreDefaultsConfirm();
    } else {
      performSave();
    }
  };

  if (loading && !settings) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="lg:col-span-3 space-y-4">
            <div className="h-20 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !settings) {
    return (
      <div className="p-6">
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
          <h3 className="text-base font-bold text-rose-900">Unable to Load System Settings</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Page Banner Header */}
      <PageHeader
        title="Settings"
        description="Manage store, cart, verification, payment, security, and system configuration."
      />

      {/* Main Settings Responsive Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSelectSection={changeSection}
          isDirty={isDirty}
        />

        {/* Right Active Section Workspace */}
        <div className="flex-1 w-full min-w-0">
          {/* Section Action Bar Header */}
          <SettingsHeader
            title={activeNavItem.label}
            description={activeNavItem.description}
            isDirty={isDirty}
            saving={saving}
            readOnly={isReadOnlySection}
            onSave={saveSection}
            onDiscard={discardSectionChanges}
            onRefresh={handleRefresh}
            updatedAt={settings?.updatedAt}
          />

          {/* Section Content */}
          {activeSection === SECTION_KEYS.GENERAL && (
            <GeneralSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.STORE && (
            <StoreSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.CART && (
            <CartSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.WEIGHT && (
            <WeightVerificationSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
              onCalibrateSensor={handleCalibrateSensor}
              saving={saving}
            />
          )}

          {activeSection === SECTION_KEYS.BILLING && (
            <BillingSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.PAYMENTS && (
            <PaymentSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.NOTIFICATIONS && (
            <NotificationSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.SECURITY && (
            <SecuritySettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
            />
          )}

          {activeSection === SECTION_KEYS.PROFILE && (
            <AdminProfileSettings
              formState={formState}
              onChange={handleInputChange}
              errors={validationErrors}
              onChangePasswordClick={() => setIsPasswordModalOpen(true)}
            />
          )}

          {activeSection === SECTION_KEYS.PREFERENCES && (
            <SystemPreferencesSettings
              formState={formState}
              onChange={handleInputChange}
            />
          )}

          {activeSection === SECTION_KEYS.SYSTEM && (
            <SystemInformationSettings
              formState={formState}
              onRestoreDefaultsClick={triggerRestoreDefaults}
            />
          )}
        </div>
      </div>

      {/* Modals & Dialogs */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={(msg) => setToast({ message: msg, type: 'success' })}
      />

      <SensitiveSettingConfirmModal
        isOpen={Boolean(sensitiveModalData)}
        onClose={() => setSensitiveModalData(null)}
        onConfirm={handleSensitiveConfirm}
        title={sensitiveModalData?.title}
        message={sensitiveModalData?.message}
        type={sensitiveModalData?.type}
        loading={saving}
      />

      <UnsavedChangesModal
        isOpen={isUnsavedModalOpen}
        onClose={() => setIsUnsavedModalOpen(false)}
        onConfirmDiscard={handleConfirmDiscard}
      />

      {/* Toast Alerts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Settings;
