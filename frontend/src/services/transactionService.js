import { mockTransactionsList } from './mock/transactionMockData';

/**
 * Transactions API Service
 * 
 * Handles querying historical supermarket transactions, itemized billing records,
 * preserved scan-time prices, payment statuses, and operational sales aggregations.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let transactionsDatabase = [...mockTransactionsList];

export const transactionService = {
  /**
   * Fetch transactions with search, filters, sorting, and pagination
   */
  async getTransactions({
    search = '',
    transactionStatus = '',
    paymentStatus = '',
    paymentMethod = '',
    dateRange = '',
    sortBy = 'dateTime',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...transactionsDatabase];

    // 1. Search filter (Transaction ID, Cart ID, Session ID, Payment Reference)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.cartId.toLowerCase().includes(q) ||
          t.sessionId.toLowerCase().includes(q) ||
          (t.paymentReference && t.paymentReference.toLowerCase().includes(q))
      );
    }

    // 2. Transaction Status filter
    if (transactionStatus) {
      result = result.filter((t) => t.transactionStatus === transactionStatus);
    }

    // 3. Payment Status filter
    if (paymentStatus) {
      result = result.filter((t) => t.paymentStatus === paymentStatus);
    }

    // 4. Payment Method filter
    if (paymentMethod) {
      result = result.filter((t) => t.paymentMethod === paymentMethod);
    }

    // 5. Date Range filter (Today, Yesterday, Last 7 Days, Last 30 Days)
    if (dateRange && dateRange !== 'All') {
      const now = Date.now();
      const oneDay = 24 * 3600 * 1000;

      result = result.filter((t) => {
        const itemTime = new Date(t.dateTime).getTime();
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
      transactions: paginatedItems,
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
   * Get single transaction details by ID
   */
  async getTransactionDetails(id) {
    await delay(150);
    const transaction = transactionsDatabase.find((t) => t.id === id);
    if (!transaction) {
      throw new Error(`Transaction ${id} not found.`);
    }
    return { ...transaction };
  },

  /**
   * Refresh transaction dataset
   */
  async refreshTransactions() {
    await delay(400);
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Operational summary metric counters for header cards
   * Rule: Today's Sales counts ONLY completed/successful transactions.
   */
  async getTransactionSummaryMetrics() {
    await delay(150);
    const totalTransactions = 12458; // Benchmark total historical transactions count
    const todayTransactions = transactionsDatabase.filter((t) => t.transactionStatus === 'Completed').length;
    
    // Today's Sales sum (only completed/successful)
    const todaySales = transactionsDatabase
      .filter((t) => t.transactionStatus === 'Completed' && t.paymentStatus === 'Paid')
      .reduce((sum, t) => sum + t.total, 0);

    const pendingPaymentsCount = transactionsDatabase.filter(
      (t) => t.paymentStatus === 'Pending' || t.transactionStatus === 'Pending'
    ).length;

    return {
      totalTransactions,
      todayTransactions,
      todaySales,
      pendingPaymentsCount,
    };
  },
};
