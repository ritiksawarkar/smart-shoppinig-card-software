/**
 * Structured Mock Dataset for Smart Shopping Cart Admin Dashboard
 * 
 * Separated cleanly from presentation logic so real REST API endpoints 
 * can directly replace this data layer in production.
 */

export const mockDashboardData = {
  kpiSummary: {
    todaySales: 24580,
    salesTrend: '+8.4% from yesterday',
    todayTransactions: 128,
    transactionsSubtext: 'Completed today',
    activeCarts: 17,
    activeCartsSubtext: 'Currently shopping in store',
    lowStockProductsCount: 8,
    lowStockSubtext: 'Products need attention',
  },

  salesOverview: [
    { day: 'Mon', sales: 18200 },
    { day: 'Tue', sales: 22400 },
    { day: 'Wed', sales: 19800 },
    { day: 'Thu', sales: 27100 },
    { day: 'Fri', sales: 24580 },
    { day: 'Sat', sales: 31600 },
    { day: 'Sun', sales: 28900 },
  ],

  activeCarts: [
    { id: 'SC-1024', itemsCount: 8, totalAmount: 1240, status: 'Verified' },
    { id: 'SC-1027', itemsCount: 12, totalAmount: 2430, status: 'Checking' },
    { id: 'SC-1031', itemsCount: 5, totalAmount: 680, status: 'Verified' },
    { id: 'SC-1042', itemsCount: 9, totalAmount: 1850, status: 'Mismatch' },
    { id: 'SC-1055', itemsCount: 3, totalAmount: 420, status: 'Payment Pending' },
  ],

  lowStockProducts: [
    { id: 'P-101', name: 'Fresh Whole Milk (1L)', stock: 6, threshold: 15, status: 'Low' },
    { id: 'P-102', name: 'Whole Wheat Bread', stock: 4, threshold: 10, status: 'Critical' },
    { id: 'P-103', name: 'Digestive Biscuits', stock: 9, threshold: 20, status: 'Low' },
    { id: 'P-104', name: 'Basmati Rice (5kg)', stock: 12, threshold: 25, status: 'Low' },
    { id: 'P-105', name: 'Sunflower Cooking Oil (1L)', stock: 3, threshold: 10, status: 'Critical' },
  ],

  weightAlerts: [
    {
      cartId: 'SC-1027',
      expectedWeightKg: 2.45,
      actualWeightKg: 2.91,
      differenceKg: 0.46,
      status: 'Mismatch',
      timestamp: '10:44 PM',
    },
    {
      cartId: 'SC-1042',
      expectedWeightKg: 1.20,
      actualWeightKg: 1.21,
      differenceKg: 0.01,
      status: 'Verified',
      timestamp: '10:40 PM',
    },
    {
      cartId: 'SC-1050',
      expectedWeightKg: 3.10,
      actualWeightKg: 3.65,
      differenceKg: 0.55,
      status: 'Mismatch',
      timestamp: '10:32 PM',
    },
  ],

  recentTransactions: [
    {
      id: 'TXN-10284',
      cartId: 'SC-1024',
      itemsCount: 8,
      amount: 1240,
      paymentMethod: 'UPI',
      status: 'Completed',
      time: '10:42 PM',
    },
    {
      id: 'TXN-10283',
      cartId: 'SC-1021',
      itemsCount: 5,
      amount: 680,
      paymentMethod: 'Card',
      status: 'Completed',
      time: '10:35 PM',
    },
    {
      id: 'TXN-10282',
      cartId: 'SC-1019',
      itemsCount: 11,
      amount: 2150,
      paymentMethod: 'Cash',
      status: 'Completed',
      time: '10:21 PM',
    },
    {
      id: 'TXN-10281',
      cartId: 'SC-1015',
      itemsCount: 4,
      amount: 520,
      paymentMethod: 'UPI',
      status: 'Completed',
      time: '10:14 PM',
    },
    {
      id: 'TXN-10280',
      cartId: 'SC-1012',
      itemsCount: 14,
      amount: 3410,
      paymentMethod: 'Card',
      status: 'Completed',
      time: '09:58 PM',
    },
  ],

  paymentSummary: {
    upiPercentage: 68,
    cardPercentage: 21,
    cashPercentage: 11,
    totalTransactions: 128,
  },

  operationalAlerts: [
    { id: 'ALT-1', type: 'warning', message: '3 products are running low on stock.' },
    { id: 'ALT-2', type: 'error', message: '2 carts require weight verification.' },
    { id: 'ALT-3', type: 'info', message: '1 payment is pending checkout confirmation.' },
  ],
};
