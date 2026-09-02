import React from 'react';
import { useReports } from '../hooks/useReports';
import { PageHeader } from '../components/layout/PageHeader';
import { Toast } from '../components/ui/Toast';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportTabs } from '../components/reports/ReportTabs';
import { ReportSummaryCards } from '../components/reports/ReportSummaryCards';
import { SalesTrendChart } from '../components/reports/SalesTrendChart';
import { TopProductsChart } from '../components/reports/TopProductsChart';
import { CategoryPerformance } from '../components/reports/CategoryPerformance';
import { PaymentAnalytics } from '../components/reports/PaymentAnalytics';
import { CartPerformance } from '../components/reports/CartPerformance';
import { WeightVerificationAnalytics } from '../components/reports/WeightVerificationAnalytics';
import { SalesReportTable } from '../components/reports/SalesReportTable';
import { RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Reports = () => {
  const {
    dateRange,
    setDateRange,
    comparisonPeriod,
    setComparisonPeriod,
    activeTab,
    setActiveTab,
    overview,
    salesTrend,
    topProducts,
    categoryPerformance,
    paymentAnalytics,
    cartPerformance,
    weightVerification,
    dailySalesTable,
    loading,
    isRefreshing,
    isExporting,
    error,
    toast,
    setToast,
    handleRefresh,
    handleExport,
  } = useReports();

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Page Header */}
      <PageHeader
        title="Reports & Analytics"
        description="Analyze sales, transactions, payments, inventory, and Smart Shopping Cart performance."
      />

      {/* Report Filters Toolbar */}
      <ReportFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        comparisonPeriod={comparisonPeriod}
        onComparisonChange={setComparisonPeriod}
        onRefresh={handleRefresh}
        onExport={handleExport}
        isRefreshing={isRefreshing}
        isExporting={isExporting}
        loading={loading}
      />

      {/* KPI Summary Cards */}
      {loading ? (
        <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-2"></div>
          Loading Overview Analytics...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-xs text-rose-600 font-semibold bg-white rounded-xl border border-rose-200 space-y-2">
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="mx-auto gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </Button>
        </div>
      ) : (
        <ReportSummaryCards overview={overview} comparisonPeriod={comparisonPeriod} />
      )}

      {/* Section Tabs */}
      <ReportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tabbed Analytical Views */}
      {!loading && !error && (
        <div className="space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <SalesTrendChart data={salesTrend} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopProductsChart products={topProducts} />
                <CategoryPerformance categories={categoryPerformance} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PaymentAnalytics paymentAnalytics={paymentAnalytics} />
                <WeightVerificationAnalytics weightVerification={weightVerification} />
              </div>

              <CartPerformance cartPerformance={cartPerformance} />
              <SalesReportTable data={dailySalesTable} />
            </div>
          )}

          {/* TAB 2: SALES & REVENUE */}
          {activeTab === 'Sales' && (
            <div className="space-y-6">
              <SalesTrendChart data={salesTrend} />
              <SalesReportTable data={dailySalesTable} />
            </div>
          )}

          {/* TAB 3: TOP PRODUCTS */}
          {activeTab === 'Products' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopProductsChart products={topProducts} />
              <CategoryPerformance categories={categoryPerformance} />
            </div>
          )}

          {/* TAB 4: PAYMENTS */}
          {activeTab === 'Payments' && (
            <div className="space-y-6">
              <PaymentAnalytics paymentAnalytics={paymentAnalytics} />
            </div>
          )}

          {/* TAB 5: CART PERFORMANCE */}
          {activeTab === 'Cart Performance' && (
            <div className="space-y-6">
              <CartPerformance cartPerformance={cartPerformance} />
            </div>
          )}

          {/* TAB 6: WEIGHT VERIFICATION */}
          {activeTab === 'Weight Verification' && (
            <div className="space-y-6">
              <WeightVerificationAnalytics weightVerification={weightVerification} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
