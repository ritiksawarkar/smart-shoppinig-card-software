import { mockWeightVerificationList } from './mock/weightVerificationMockData';

/**
 * Weight Verification API Service
 * 
 * Handles querying load cell telemetry, expected vs actual weight records,
 * backend tolerance checks, and auditable mismatch resolution workflows.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let weightVerificationDatabase = [...mockWeightVerificationList];

export const weightVerificationService = {
  /**
   * Fetch verification records with search, filter, sorting, and pagination
   */
  async getVerificationRecords({
    search = '',
    status = '',
    sortBy = 'lastChecked',
    sortOrder = 'desc',
    page = 1,
    pageSize = 10,
  } = {}) {
    await delay(300);

    let result = [...weightVerificationDatabase];

    // 1. Search filter (Cart ID or Session ID or Record ID)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (rec) =>
          rec.cartId.toLowerCase().includes(q) ||
          rec.sessionId.toLowerCase().includes(q) ||
          rec.id.toLowerCase().includes(q)
      );
    }

    // 2. Status filter
    if (status) {
      result = result.filter((rec) => rec.status === status);
    }

    // 3. Sorting
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

    // 4. Pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedItems = result.slice(startIndex, startIndex + pageSize);

    return {
      records: paginatedItems,
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
   * Get single verification record by ID
   */
  async getVerificationDetails(id) {
    await delay(150);
    const record = weightVerificationDatabase.find((r) => r.id === id);
    if (!record) {
      throw new Error(`Verification record ${id} not found.`);
    }
    return { ...record };
  },

  /**
   * Resolve a weight mismatch with a structured reason and notes
   */
  async resolveVerification(id, { reason, notes }) {
    await delay(350);
    const index = weightVerificationDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Verification record ${id} not found.`);
    }

    const currentRecord = weightVerificationDatabase[index];
    const updatedRecord = {
      ...currentRecord,
      status: 'Resolved',
      reviewed: true,
      resolution: {
        reason: reason || 'Other',
        notes: notes || '',
        resolvedBy: 'Admin',
        resolvedAt: new Date().toISOString(),
      },
      timeline: [
        ...currentRecord.timeline,
        {
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          type: 'Resolution',
          title: 'Verification Resolved',
          description: `Resolved by Admin: ${reason}. Notes: ${notes || 'None'}`,
        },
      ],
    };

    weightVerificationDatabase[index] = updatedRecord;
    return { ...updatedRecord };
  },

  /**
   * Mark a weight mismatch alert as reviewed
   */
  async markAsReviewed(id) {
    await delay(200);
    const index = weightVerificationDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Record ${id} not found.`);
    }

    const current = weightVerificationDatabase[index];
    const updated = { ...current, reviewed: true };
    weightVerificationDatabase[index] = updated;
    return { ...updated };
  },

  /**
   * Refresh weight verification records
   */
  async refreshVerificationRecords() {
    await delay(400);
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Operational summary metrics for header cards
   */
  async getVerificationSummaryMetrics() {
    await delay(150);
    const totalVerifications = weightVerificationDatabase.length;
    const verifiedCount = weightVerificationDatabase.filter((r) => r.status === 'Verified').length;
    const verificationRequiredCount = weightVerificationDatabase.filter((r) => r.status === 'Verification Required').length;
    const pendingCount = weightVerificationDatabase.filter((r) => r.status === 'Pending').length;
    const resolvedCount = weightVerificationDatabase.filter((r) => r.status === 'Resolved').length;

    return {
      totalVerifications,
      verifiedCount,
      verificationRequiredCount,
      pendingCount,
      resolvedCount,
    };
  },
};
