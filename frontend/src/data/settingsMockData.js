/**
 * System Settings Mock Data for Smart Shopping Cart Platform
 * 
 * Centralized configuration data representing the backend source of truth.
 */

export const initialSettingsMockData = {
  version: '1.4.2',
  updatedAt: '2026-09-01T14:30:00.000Z',
  updatedBy: 'System Administrator (adm_01)',

  general: {
    applicationName: 'Smart Shopping Cart Platform',
    storeName: 'HyperMart Central - Main Branch',
    storeLocation: 'Branch #01, Retail Hub, Tech City',
    currency: 'INR',
    currencySymbol: '₹',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD MMM YYYY',
    timeFormat: '12-hour',
  },

  store: {
    storeName: 'HyperMart Central',
    storeCode: 'HM-IND-014',
    address: 'Plot 42, Commercial Avenue, Sector 5',
    city: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    contactNumber: '+91 98765 43210',
    email: 'contact@hypermart-shopping.com',
    logoUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=150&auto=format&fit=crop&q=80',
  },

  cart: {
    totalSmartCarts: 45,
    sessionTimeout: 1800, // seconds (30 mins)
    inactivityTimeout: 600, // seconds (10 mins)
    scannerTimeout: 15, // seconds
    sensorTimeout: 10, // seconds
    enableCartMonitoring: true,
    enableStatusMonitoring: true,
    cartIdFormat: 'CART-{NUMBER}',
    autoCloseInactiveSession: true,
    requireFinalVerification: true,
    requirePaymentConfirmation: true,
  },

  weightVerification: {
    enabled: true,
    absoluteTolerance: 10, // grams (±10g)
    percentageTolerance: 2.0, // percentage (±2%)
    verificationMode: 'Combined (Max of Absolute & Percentage)',
    minimumWeightThreshold: 20, // grams
    stabilizationTime: 1000, // ms
    stableReadings: 3,
    retryCount: 3,
    sensorStatus: 'Connected',
    sensorType: '4x Load Cell Array (HX711 ADC)',
    loadCellCapacity: 50, // kg
    measurementUnit: 'g',
    samplingInterval: 200, // ms
    calibrationStatus: 'Calibrated',
    lastCalibration: '2026-08-25T10:15:00.000Z',
    calibrationRequired: false,
  },

  billing: {
    currency: 'INR',
    decimalPrecision: 2,
    enableDiscounts: true,
    enableTax: true,
    enableServiceCharges: false,
    defaultTaxRate: 18.0, // % GST
    maxDiscountLimit: 30.0, // %
    receiptPrefix: 'RCP-',
    transactionPrefix: 'TXN-',
    invoiceFooterNote: 'Thank you for shopping with Smart Shopping Cart! Self-checkout verified.',
  },

  payments: {
    upiEnabled: true,
    cardEnabled: true,
    cashEnabled: true,
    defaultPaymentMethod: 'UPI',
    paymentTimeout: 120, // seconds
    paymentConfirmationTimeout: 30, // seconds
    paymentRetryLimit: 2,
    environment: 'Test',
    providerName: 'Razorpay Gateway Integration',
    merchantId: 'MID-8849204128',
    providerStatus: 'Active',
  },

  notifications: {
    lowStockAlerts: true,
    weightVerificationAlerts: true,
    paymentFailureAlerts: true,
    cartDisconnectionAlerts: true,
    sensorErrorAlerts: true,
    systemErrorAlerts: true,
    dailyReportNotifications: true,
    notifyAdminOnVerificationRequired: true,
    channels: {
      inApp: true,
      email: true,
      sms: false, // Backend integration pending
      push: false, // Backend integration pending
    },
    alertEmailRecipient: 'alerts@hypermart-shopping.com',
  },

  security: {
    adminSessionTimeout: 60, // minutes
    requireReauthForSensitive: true,
    loginAttemptLimit: 5,
    lockoutDuration: 15, // minutes
    passwordMinLength: 8,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    auditLoggingEnabled: true,
    adminActivityLogging: true,
    twoFactorAuthSupported: true,
  },

  profile: {
    id: 'adm_01',
    name: 'System Administrator',
    email: 'admin@smartcart.com',
    username: 'admin',
    role: 'Super Admin',
    storeLocation: 'HyperMart Central - Main Branch',
    lastLogin: '2026-09-02T08:30:00.000Z',
    profileImage: null,
  },

  preferences: {
    defaultLanguage: 'English (US)',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD MMM YYYY',
    timeFormat: '12-hour',
    currencyDisplay: 'Symbol (₹)',
    tableDensity: 'Comfortable', // Comfortable | Compact
    defaultPageSize: 10,
    theme: 'System', // Light | Dark | System
  },

  systemInfo: {
    appName: 'Smart Shopping Cart Platform',
    version: '1.4.2-release',
    frontendVersion: 'v1.4.2',
    backendVersion: 'v2.1.0-prod',
    apiVersion: 'v1',
    environment: 'Development',
    backendStatus: 'Connected',
    databaseStatus: 'Connected',
    hardwareIntegrationStatus: 'Available',
    lastHealthCheck: '2026-09-02T08:55:00.000Z',
  },

  systemHealth: {
    backend: 'Healthy',
    database: 'Healthy',
    paymentService: 'Healthy',
    hardwareService: 'Connected',
    sensorService: 'Operational',
  },

  auditHistory: [
    {
      id: 'AUD-9041',
      timestamp: '2026-09-01T14:30:00.000Z',
      admin: 'System Administrator',
      setting: 'Weight Verification Absolute Tolerance',
      previousValue: '15 g',
      newValue: '10 g',
      action: 'Updated',
    },
    {
      id: 'AUD-9040',
      timestamp: '2026-08-30T11:15:00.000Z',
      admin: 'System Administrator',
      setting: 'Payment Environment',
      previousValue: 'Production',
      newValue: 'Test',
      action: 'Updated',
    },
    {
      id: 'AUD-9039',
      timestamp: '2026-08-28T09:45:00.000Z',
      admin: 'Store Admin',
      setting: 'Cart Session Timeout',
      previousValue: '2400 s',
      newValue: '1800 s',
      action: 'Updated',
    },
    {
      id: 'AUD-9038',
      timestamp: '2026-08-25T10:15:00.000Z',
      admin: 'System Administrator',
      setting: 'Load Cell Sensor Calibration',
      previousValue: 'Pending Calibration',
      newValue: 'Calibrated',
      action: 'Calibrated',
    },
  ],
};
