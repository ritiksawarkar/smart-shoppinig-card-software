import {
  mockReportOverview,
  mockSalesTrendData,
  mockTopProducts,
  mockCategoryPerformance,
  mockPaymentAnalytics,
  mockCartPerformance,
  mockWeightVerificationReport,
  mockDailySalesTable,
} from './mock/reportMockData';

/**
 * Reports & Analytics API Service
 * 
 * Handles querying historical business metrics, sales trends, top product performance,
 * category distributions, payment analytics, cart telemetry, and report exports.
 */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const reportService = {
  /**
   * Get main overview KPI report
   */
  async getOverviewReport({ dateRange = 'Last 30 Days' } = {}) {
    await delay(300);
    return { ...mockReportOverview, dateRange };
  },

  /**
   * Get sales & transaction trend time-series
   */
  async getSalesTrend({ dateRange = 'Last 30 Days' } = {}) {
    await delay(250);
    return [...mockSalesTrendData];
  },

  /**
   * Get top selling products by quantity and revenue
   */
  async getTopProducts({ limit = 5 } = {}) {
    await delay(200);
    return mockTopProducts.slice(0, limit);
  },

  /**
   * Get sales by category breakdown
   */
  async getCategoryPerformance() {
    await delay(200);
    return [...mockCategoryPerformance];
  },

  /**
   * Get payment methods distribution and success rates
   */
  async getPaymentAnalytics() {
    await delay(200);
    return { ...mockPaymentAnalytics };
  },

  /**
   * Get Smart Cart operational performance analytics
   */
  async getCartPerformance() {
    await delay(200);
    return { ...mockCartPerformance };
  },

  /**
   * Get weight verification telemetry reports
   */
  async getWeightVerificationReport() {
    await delay(200);
    return { ...mockWeightVerificationReport };
  },

  /**
   * Get detailed daily sales table records
   */
  async getDailySalesTable() {
    await delay(250);
    return [...mockDailySalesTable];
  },

  /**
   * Refresh all report datasets
   */
  async refreshReports() {
    await delay(400);
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Generate & download CSV report export
   */
  async exportReport({ dateRange = 'Last 30 Days', reportType = 'Sales Summary' } = {}) {
    await delay(300);
    const filename = `SmartCart_Report_${reportType.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    
    // Generate CSV content string
    let csv = `Date,Transactions,Items Sold,Gross Sales (INR),ATV (INR),Refunds (INR),Net Sales (INR)\n`;
    mockDailySalesTable.forEach((row) => {
      csv += `"${row.date}",${row.transactions},${row.itemsSold},${row.grossSales},${row.atv},${row.refunds},${row.netSales}\n`;
    });

    // Create browser blob download trigger
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { filename, success: true };
  },
};
