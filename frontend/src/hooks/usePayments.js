import { useState, useEffect, useCallback } from 'react';
import { paymentService } from '../services/paymentService';

export const usePayments = () => {
  // Query & Filter State
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reconciliationStatus, setReconciliationStatus] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalVolume: 0,
    successfulVolume: 0,
    pendingVolume: 0,
    failedVolume: 0,
    todayVolume: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Drawer State
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch summary metrics
  const fetchMetrics = useCallback(async () => {
    try {
      const metrics = await paymentService.getPaymentSummaryMetrics();
      setSummaryMetrics(metrics);
    } catch (err) {
      console.error('Failed to fetch payment summary metrics:', err);
    }
  }, []);

  // Fetch payments list
  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await paymentService.getPayments({
        search,
        paymentStatus,
        paymentMethod,
        reconciliationStatus,
        dateRange,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setPayments(res.payments);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setError('Unable to load payment records. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [search, paymentStatus, paymentMethod, reconciliationStatus, dateRange, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchPayments();
    fetchMetrics();
  }, [fetchPayments, fetchMetrics]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await paymentService.refreshPayments();
      await Promise.all([fetchPayments(), fetchMetrics()]);
      setToast({ message: 'Payment telemetry records refreshed.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to refresh payments.', type: 'error' });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter Handlers
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handlePaymentStatusChange = (val) => {
    setPaymentStatus(val);
    setCurrentPage(1);
  };

  const handlePaymentMethodChange = (val) => {
    setPaymentMethod(val);
    setCurrentPage(1);
  };

  const handleReconciliationStatusChange = (val) => {
    setReconciliationStatus(val);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (val) => {
    setDateRange(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setPaymentStatus('');
    setPaymentMethod('');
    setReconciliationStatus('');
    setDateRange('');
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // View Details Handler
  const handleViewDetails = async (id) => {
    try {
      const details = await paymentService.getPaymentDetails(id);
      setSelectedPayment(details);
      setIsDrawerOpen(true);
    } catch (err) {
      setToast({ message: 'Failed to load payment record details.', type: 'error' });
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  return {
    // State
    search,
    paymentStatus,
    paymentMethod,
    reconciliationStatus,
    dateRange,
    sortBy,
    sortOrder,
    currentPage,
    payments,
    pagination,
    summaryMetrics,
    loading,
    isRefreshing,
    error,
    selectedPayment,
    isDrawerOpen,
    toast,
    setToast,
    // Actions
    setCurrentPage,
    handleRefresh,
    handleSearchChange,
    handlePaymentStatusChange,
    handlePaymentMethodChange,
    handleReconciliationStatusChange,
    handleDateRangeChange,
    handleResetFilters,
    handleSort,
    handleViewDetails,
    handleCloseDrawer,
  };
};

export default usePayments;
