import { mockPaymentsList } from './mock/paymentMockData';

/**
 * Payments API Service
 * 
 * Handles querying payment transaction records, payment methods, provider references,
 * reconciliation states, and financial aggregations.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let paymentsDatabase = [...mockPaymentsList];

export const paymentService = {
  /**
   * Fetch payments with search, filters, sorting, and pagination
   */
  async getPayments({
    search = '',
    paymentStatus = '',
    paymentMethod = '',
    reconciliationStatus = '',
    dateRange = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...paymentsDatabase];

    // 1. Search filter (Payment ID, Transaction ID, Cart ID, Session ID, Payment Reference)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.transactionId.toLowerCase().includes(q) ||
          p.cartId.toLowerCase().includes(q) ||
          p.sessionId.toLowerCase().includes(q) ||
          (p.paymentReference && p.paymentReference.toLowerCase().includes(q))
      );
    }

    // 2. Payment Status filter
    if (paymentStatus) {
      result = result.filter((p) => p.status === paymentStatus);
    }

    // 3. Payment Method filter
    if (paymentMethod) {
      result = result.filter((p) => p.method === paymentMethod);
    }

    // 4. Reconciliation Status filter
    if (reconciliationStatus) {
      result = result.filter((p) => p.reconciliationStatus === reconciliationStatus);
    }

    // 5. Date Range filter (Today, Yesterday, Last 7 Days, Last 30 Days)
    if (dateRange && dateRange !== 'All') {
      const now = Date.now();
      const oneDay = 24 * 3600 * 1000;

      result = result.filter((p) => {
        const itemTime = new Date(p.createdAt).getTime();
        const diffDays = (now - itemTime) / oneDay;

        if (dateRange === 'Today') return diffDays <= 1;
        if (dateRange === 'Yesterday') return diffDays > 1 && diffDays <= 2;
        if (dateRange === 'Last 7 Days') return diffDays <= 7;
        if (dateRange === 'Last 30 Days') return diffDays <= 30;
        return true;
      });
    }

    // 6. Sorting
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // 7. Pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);

    return {
      payments: paginatedItems,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        startIndex: totalItems === 0 ? 0 : startIndex + 1,
        endIndex: Math.min(startIndex + pageSize, totalItems),
      },
    };
  },

  /**
   * Get single payment record details by ID
   */
  async getPaymentDetails(id) {
    await delay(150);
    const payment = paymentsDatabase.find((p) => p.id === id);
    if (!payment) {
      throw new Error(`Payment record ${id} not found.`);
    }
    return { ...payment };
  },

  /**
   * Refresh payment dataset
   */
  async refreshPayments() {
    await delay(400);
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Operational summary metrics for summary cards
   */
  async getPaymentSummaryMetrics() {
    await delay(150);

    const totalVolume = 1245680; // Total historical volume benchmark
    const successfulVolume = 1182450;
    const pendingVolume = paymentsDatabase
      .filter((p) => p.status === 'Pending' || p.status === 'Processing')
      .reduce((sum, p) => sum + p.amount, 0);

    const failedVolume = paymentsDatabase
      .filter((p) => p.status === 'Failed')
      .reduce((sum, p) => sum + p.amount, 0);

    const todayVolume = paymentsDatabase
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      totalVolume,
      successfulVolume,
      pendingVolume,
      failedVolume,
      todayVolume,
    };
  },
};
