import { mockActiveCartsList } from './mock/cartMockData';

/**
 * Active Smart Carts API Service
 * 
 * Handles querying live floor shopping sessions, summary operational metrics,
 * itemized cart telemetry, and weight mismatch review workflows.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let activeCartsDatabase = [...mockActiveCartsList];

export const cartService = {
  /**
   * Fetch active carts with search, filters, sorting, and pagination
   */
  async getActiveCarts({
    search = '',
    status = '',
    weightStatus = '',
    connectionStatus = '',
    sortBy = 'cartId',
    sortOrder = 'asc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...activeCartsDatabase];

    // 1. Search filter (Cart ID or Session ID)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.cartId.toLowerCase().includes(q) ||
          c.sessionId.toLowerCase().includes(q)
      );
    }

    // 2. Cart Status filter
    if (status) {
      result = result.filter((c) => c.status === status);
    }

    // 3. Weight Status filter
    if (weightStatus) {
      result = result.filter((c) => c.weightStatus === weightStatus);
    }

    // 4. Connection Status filter
    if (connectionStatus) {
      result = result.filter((c) => c.connectionStatus === connectionStatus);
    }

    // 5. Sorting
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

    // 6. Pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);

    return {
      carts: paginatedItems,
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
   * Get single active cart by Cart ID
   */
  async getCartDetails(cartId) {
    await delay(150);
    const cart = activeCartsDatabase.find((c) => c.cartId === cartId);
    if (!cart) {
      throw new Error(`Active cart ${cartId} not found.`);
    }
    return { ...cart };
  },

  /**
   * Review weight mismatch alert for an active cart
   */
  async reviewWeightMismatch(cartId, reviewNotes = '') {
    await delay(300);
    const index = activeCartsDatabase.findIndex((c) => c.cartId === cartId);
    if (index === -1) {
      throw new Error(`Cart ${cartId} not found.`);
    }

    const cart = activeCartsDatabase[index];
    const updatedCart = {
      ...cart,
      reviewed: true,
      reviewNotes: reviewNotes || 'Admin reviewed weight status.',
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Admin',
    };

    activeCartsDatabase[index] = updatedCart;
    return { ...updatedCart };
  },

  /**
   * Refresh active carts data
   */
  async refreshActiveCarts() {
    await delay(400);
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Operational summary metric counters for header cards
   */
  async getCartSummaryMetrics() {
    await delay(150);
    const activeCartsCount = activeCartsDatabase.length;
    const shoppingNowCount = activeCartsDatabase.filter((c) => c.status === 'Shopping').length;
    const verificationAlertsCount = activeCartsDatabase.filter(
      (c) => c.weightStatus === 'Mismatch' || c.status === 'Verification Required'
    ).length;
    const paymentPendingCount = activeCartsDatabase.filter(
      (c) => c.status === 'Payment Pending' || c.status === 'Checkout Ready'
    ).length;

    return {
      activeCartsCount,
      shoppingNowCount,
      verificationAlertsCount,
      paymentPendingCount,
    };
  },
};
