import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '../services/transactionService';

export const useTransactions = () => {
  // Query & Filter State
  const [search, setSearch] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [sortBy, setSortBy] = useState('dateTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalTransactions: 0,
    todayTransactions: 0,
    todaySales: 0,
    pendingPaymentsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Drawer State
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    try {
      const metrics = await transactionService.getTransactionSummaryMetrics();
      setSummaryMetrics(metrics);
    } catch (err) {
      console.error('Failed to fetch transaction metrics:', err);
    }
  }, []);

  // Fetch transactions list
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await transactionService.getTransactions({
        search,
        transactionStatus,
        paymentStatus,
        paymentMethod,
        dateRange,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setTransactions(res.transactions);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Unable to load transaction records. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [search, transactionStatus, paymentStatus, paymentMethod, dateRange, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchTransactions();
    fetchMetrics();
  }, [fetchTransactions, fetchMetrics]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await transactionService.refreshTransactions();
      await Promise.all([fetchTransactions(), fetchMetrics()]);
      setToast({ message: 'Transaction records refreshed.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to refresh transactions.', type: 'error' });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter Handlers
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleTransactionStatusChange = (val) => {
    setTransactionStatus(val);
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

  const handleDateRangeChange = (val) => {
    setDateRange(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setTransactionStatus('');
    setPaymentStatus('');
    setPaymentMethod('');
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
      const details = await transactionService.getTransactionDetails(id);
      setSelectedTransaction(details);
      setIsDrawerOpen(true);
    } catch (err) {
      setToast({ message: 'Failed to load transaction details.', type: 'error' });
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTransaction(null);
  };

  return {
    // State
    search,
    transactionStatus,
    paymentStatus,
    paymentMethod,
    dateRange,
    sortBy,
    sortOrder,
    currentPage,
    transactions,
    pagination,
    summaryMetrics,
    loading,
    isRefreshing,
    error,
    selectedTransaction,
    isDrawerOpen,
    toast,
    setToast,
    // Actions
    setCurrentPage,
    handleRefresh,
    handleSearchChange,
    handleTransactionStatusChange,
    handlePaymentStatusChange,
    handlePaymentMethodChange,
    handleDateRangeChange,
    handleResetFilters,
    handleSort,
    handleViewDetails,
    handleCloseDrawer,
  };
};

export default useTransactions;
