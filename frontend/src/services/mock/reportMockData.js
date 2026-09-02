/**
 * Mock Reports & Analytics Dataset
 * 
 * Preserves historical business trends, sales aggregations, top products,
 * category distributions, payment methods breakdown, Smart Cart telemetry,
 * weight verification logs, and daily financial summary records.
 */

export const mockReportOverview = {
  totalSales: 864200,
  totalTransactions: 2480,
  averageTransactionValue: 348.47,
  itemsSold: 11240,
  weightVerificationIssues: 42,
  successfulPayments: 2480,
  refundAmount: 2450,
  changes: {
    totalSales: 8.86,
    totalTransactions: 5.2,
    averageTransactionValue: 3.48,
    itemsSold: 6.1,
    weightVerificationIssues: -12.5,
  },
};

export const mockSalesTrendData = [
  { date: '18 Aug', sales: 52400, transactions: 152, itemsSold: 710 },
  { date: '19 Aug', sales: 58200, transactions: 168, itemsSold: 780 },
  { date: '20 Aug', sales: 61400, transactions: 175, itemsSold: 820 },
  { date: '21 Aug', sales: 54100, transactions: 156, itemsSold: 730 },
  { date: '22 Aug', sales: 68900, transactions: 198, itemsSold: 910 },
  { date: '23 Aug', sales: 74200, transactions: 215, itemsSold: 990 },
  { date: '24 Aug', sales: 49800, transactions: 142, itemsSold: 670 },
  { date: '25 Aug', sales: 56300, transactions: 162, itemsSold: 750 },
  { date: '26 Aug', sales: 62100, transactions: 178, itemsSold: 830 },
  { date: '27 Aug', sales: 65800, transactions: 189, itemsSold: 880 },
  { date: '28 Aug', sales: 71000, transactions: 204, itemsSold: 950 },
  { date: '29 Aug', sales: 78400, transactions: 226, itemsSold: 1040 },
  { date: '30 Aug', sales: 83600, transactions: 240, itemsSold: 1110 },
  { date: '31 Aug', sales: 86420, transactions: 248, itemsSold: 1120 },
];

export const mockTopProducts = [
  { productId: 'PRD-009', productName: 'Cadbury Dairy Milk Silk 150g', quantitySold: 420, sales: 73500, percentage: 8.5 },
  { productId: 'PRD-005', productName: 'Fortune Sunlite Sunflower Oil 1L', quantitySold: 385, sales: 67375, percentage: 7.8 },
  { productId: 'PRD-001', productName: 'Amul Taaza Toned Milk 1L', quantitySold: 850, sales: 51000, percentage: 5.9 },
  { productId: 'PRD-004', productName: 'Aashirvaad Shuddh Chakki Atta 5kg', quantitySold: 180, sales: 46800, percentage: 5.4 },
  { productId: 'PRD-011', productName: 'Dove Deep Moisture Body Wash 250ml', quantitySold: 195, sales: 45825, percentage: 5.3 },
  { productId: 'PRD-008', productName: 'Surf Excel Easy Wash Detergent 1kg', quantitySold: 310, sales: 43400, percentage: 5.0 },
  { productId: 'PRD-003', productName: 'Lay\'s Classic Salted Potato Chips', quantitySold: 1450, sales: 29000, percentage: 3.4 },
  { productId: 'PRD-002', productName: 'Britannia 100% Whole Wheat Bread', quantitySold: 580, sales: 26100, percentage: 3.0 },
];

export const mockCategoryPerformance = [
  { category: 'Dairy & Milk', sales: 245000, quantitySold: 3850, percentage: 28.3, color: 'bg-blue-500' },
  { category: 'Grocery & Staples', sales: 210500, quantitySold: 1940, percentage: 24.4, color: 'bg-indigo-500' },
  { category: 'Snacks & Confectionery', sales: 184200, quantitySold: 3210, percentage: 21.3, color: 'bg-amber-500' },
  { category: 'Beverages', sales: 124500, quantitySold: 1420, percentage: 14.4, color: 'bg-emerald-500' },
  { category: 'Personal Care & Home', sales: 100000, quantitySold: 820, percentage: 11.6, color: 'bg-purple-500' },
];

export const mockPaymentAnalytics = {
  methods: [
    { method: 'UPI', count: 1450, amount: 501236, percentage: 58, color: 'bg-blue-600' },
    { method: 'Card', count: 680, amount: 233334, percentage: 27, color: 'bg-indigo-600' },
    { method: 'Cash', count: 350, amount: 129630, percentage: 15, color: 'bg-emerald-600' },
  ],
  successRate: 97.2,
  failedRate: 1.8,
  pendingRate: 1.0,
};

export const mockCartPerformance = {
  totalSessions: 2850,
  completedSessions: 2480,
  abandonedSessions: 370,
  avgDurationMinutes: 18.75,
  avgItemsPerCart: 4.53,
  avgCartValue: 348.47,
  cartUtilization: 76.0,
  checkoutTimeSmartCartSec: 42,
  checkoutTimeConventionalSec: 200,
  timeSavedSec: 158,
};

export const mockWeightVerificationReport = {
  totalVerifications: 2480,
  verifiedCount: 2380,
  verificationRequiredCount: 75,
  sensorErrorsCount: 25,
  resolvedCount: 75,
  mismatchTrend: [
    { date: '25 Aug', count: 5 },
    { date: '26 Aug', count: 4 },
    { date: '27 Aug', count: 7 },
    { date: '28 Aug', count: 3 },
    { date: '29 Aug', count: 6 },
    { date: '30 Aug', count: 4 },
    { date: '31 Aug', count: 3 },
  ],
};

export const mockDailySalesTable = [
  { date: '31 Aug 2026', transactions: 248, itemsSold: 1120, grossSales: 86420, atv: 348.47, refunds: 500, netSales: 85920 },
  { date: '30 Aug 2026', transactions: 240, itemsSold: 1110, grossSales: 83600, atv: 348.33, refunds: 0, netSales: 83600 },
  { date: '29 Aug 2026', transactions: 226, itemsSold: 1040, grossSales: 78400, atv: 346.90, refunds: 250, netSales: 78150 },
  { date: '28 Aug 2026', transactions: 204, itemsSold: 950, grossSales: 71000, atv: 348.04, refunds: 0, netSales: 71000 },
  { date: '27 Aug 2026', transactions: 189, itemsSold: 880, grossSales: 65800, atv: 348.15, refunds: 450, netSales: 65350 },
  { date: '26 Aug 2026', transactions: 178, itemsSold: 830, grossSales: 62100, atv: 348.88, refunds: 0, netSales: 62100 },
  { date: '25 Aug 2026', transactions: 162, itemsSold: 750, grossSales: 56300, atv: 347.53, refunds: 0, netSales: 56300 },
];
