import { mockDashboardData } from './mock/dashboardMockData';

/**
 * Dashboard API Service for Smart Shopping Cart Admin Portal
 * 
 * Provides asynchronous data fetching functions.
 * Structured to cleanly wrap REST API endpoints when backend integration occurs.
 */

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  /**
   * Get all dashboard metrics and sections in one call
   */
  async getAllDashboardData() {
    await delay(400);
    return { ...mockDashboardData };
  },

  /**
   * Get KPI Summary Cards
   */
  async getDashboardSummary() {
    await delay(200);
    return mockDashboardData.kpiSummary;
  },

  /**
   * Get Weekly Sales Overview Data
   */
  async getSalesOverview() {
    await delay(200);
    return mockDashboardData.salesOverview;
  },

  /**
   * Get Active Carts Data
   */
  async getActiveCarts() {
    await delay(250);
    return mockDashboardData.activeCarts;
  },

  /**
   * Get Low Stock Inventory Products
   */
  async getLowStockProducts() {
    await delay(250);
    return mockDashboardData.lowStockProducts;
  },

  /**
   * Get Weight Sensor Verification Alerts
   */
  async getWeightAlerts() {
    await delay(250);
    return mockDashboardData.weightAlerts;
  },

  /**
   * Get Recent Completed Transactions
   */
  async getRecentTransactions() {
    await delay(300);
    return mockDashboardData.recentTransactions;
  },

  /**
   * Get Payment Methods Breakdown
   */
  async getPaymentSummary() {
    await delay(200);
    return mockDashboardData.paymentSummary;
  },

  /**
   * Refresh all dashboard data
   */
  async refreshData() {
    await delay(500);
    return { ...mockDashboardData, refreshedAt: new Date().toISOString() };
  }
};
