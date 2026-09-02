import { useState, useEffect, useCallback } from 'react';
import { reportService } from '../services/reportService';

export const useReports = () => {
  // Filter & Section State
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [comparisonPeriod, setComparisonPeriod] = useState('Previous Period');
  const [activeTab, setActiveTab] = useState('Overview');

  // Analytical Datasets State
  const [overview, setOverview] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [paymentAnalytics, setPaymentAnalytics] = useState(null);
  const [cartPerformance, setCartPerformance] = useState(null);
  const [weightVerification, setWeightVerification] = useState(null);
  const [dailySalesTable, setDailySalesTable] = useState([]);

  // Telemetry & Loading States
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch all report datasets
  const fetchAllReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        ov,
        st,
        tp,
        cp,
        pa,
        cart,
        wv,
        table,
      ] = await Promise.all([
        reportService.getOverviewReport({ dateRange, comparisonPeriod }),
        reportService.getSalesTrend({ dateRange }),
        reportService.getTopProducts({ limit: 5 }),
        reportService.getCategoryPerformance(),
        reportService.getPaymentAnalytics(),
        reportService.getCartPerformance(),
        reportService.getWeightVerificationReport(),
        reportService.getDailySalesTable(),
      ]);

      setOverview(ov);
      setSalesTrend(st);
      setTopProducts(tp);
      setCategoryPerformance(cp);
      setPaymentAnalytics(pa);
      setCartPerformance(cart);
      setWeightVerification(wv);
      setDailySalesTable(table);
    } catch (err) {
      console.error('Failed to fetch report analytics:', err);
      setError('Unable to load analytical reports. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, comparisonPeriod]);

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await reportService.refreshReports();
      await fetchAllReports();
      setToast({ message: 'Analytics data refreshed.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to refresh reports.', type: 'error' });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Export handler
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await reportService.exportReport({ dateRange, reportType: activeTab });
      setToast({ message: `Exported ${res.filename} successfully.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to export report CSV.', type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  return {
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
  };
};

export default useReports;
