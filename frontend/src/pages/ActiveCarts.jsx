import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ShoppingCart, Activity, AlertTriangle, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { cartService } from '../services/cartService';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { CartSearch } from '../components/carts/CartSearch';
import { CartFilters } from '../components/carts/CartFilters';
import { ActiveCartTable } from '../components/carts/ActiveCartTable';
import { CartDetailsDrawer } from '../components/carts/CartDetailsDrawer';

export const ActiveCarts = () => {
  // Query & Filter State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [weightStatus, setWeightStatus] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');
  const [sortBy, setSortBy] = useState('cartId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [carts, setCarts] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({
    activeCartsCount: 0,
    shoppingNowCount: 0,
    verificationAlertsCount: 0,
    paymentPendingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Drawer & Review State
  const [selectedCart, setSelectedCart] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch summary metrics
  const fetchMetrics = useCallback(async () => {
    try {
      const metrics = await cartService.getCartSummaryMetrics();
      setSummaryMetrics(metrics);
    } catch (err) {
      console.error('Failed to fetch cart metrics:', err);
    }
  }, []);

  // Fetch active carts list
  const fetchCarts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await cartService.getActiveCarts({
        search,
        status,
        weightStatus,
        connectionStatus,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setCarts(res.carts);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch active carts:', err);
      setError('Unable to load active carts data. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [search, status, weightStatus, connectionStatus, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchCarts();
    fetchMetrics();
  }, [fetchCarts, fetchMetrics]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await cartService.refreshActiveCarts();
      await Promise.all([fetchCarts(), fetchMetrics()]);
      setToast({ message: 'Active floor carts refreshed.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to refresh active carts.', type: 'error' });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter change handlers
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    setCurrentPage(1);
  };

  const handleWeightStatusChange = (val) => {
    setWeightStatus(val);
    setCurrentPage(1);
  };

  const handleConnectionStatusChange = (val) => {
    setConnectionStatus(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setWeightStatus('');
    setConnectionStatus('');
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

  // Detail View Handler
  const handleViewDetails = async (cartId) => {
    try {
      const details = await cartService.getCartDetails(cartId);
      setSelectedCart(details);
      setIsDrawerOpen(true);
    } catch (err) {
      setToast({ message: 'Failed to load cart telemetry.', type: 'error' });
    }
  };

  // Review Mismatch Handler
  const handleReviewMismatch = async (cartId) => {
    setIsReviewing(true);
    try {
      const updated = await cartService.reviewWeightMismatch(cartId, 'Admin reviewed and confirmed physical cart state.');
      setSelectedCart(updated);
      setToast({ message: `Cart ${cartId} weight alert marked as reviewed.`, type: 'success' });
      fetchCarts();
      fetchMetrics();
    } catch (err) {
      setToast({ message: err.message || 'Failed to update review status.', type: 'error' });
    } finally {
      setIsReviewing(false);
    }
  };

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
        title="Active Carts"
        description="Monitor currently active Smart Carts and ongoing shopping sessions."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="gap-2 bg-white shadow-2xs"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            Refresh
          </Button>
        }
      />

      {/* Active Carts Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Carts</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.activeCartsCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shopping Now</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.shoppingNowCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verification Alerts</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.verificationAlertsCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/80 flex items-center justify-center font-bold">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payment Pending</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.paymentPendingCount}</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CartSearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <CartFilters
            status={status}
            weightStatus={weightStatus}
            connectionStatus={connectionStatus}
            onStatusChange={handleStatusChange}
            onWeightStatusChange={handleWeightStatusChange}
            onConnectionStatusChange={handleConnectionStatusChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Active Carts Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Connecting to Floor Smart Carts...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchCarts} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : carts.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <ShoppingCart className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No active carts right now</p>
              <p className="text-slate-500 mt-0.5">
                {search || status || weightStatus || connectionStatus
                  ? 'No active floor carts match your search or filter criteria.'
                  : 'Active shopping sessions will appear here when customers start using Smart Carts.'}
              </p>
            </div>
            {(search || status || weightStatus || connectionStatus) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <ActiveCartTable
              carts={carts}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onViewDetails={handleViewDetails}
            />

            {/* Pagination Controls */}
            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
              <div>
                Showing <span className="font-bold text-slate-900">{pagination.startIndex}</span> –{' '}
                <span className="font-bold text-slate-900">{pagination.endIndex}</span> of{' '}
                <span className="font-bold text-slate-900">{pagination.totalItems}</span> active carts
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-2.5 py-1 text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-1 inline" /> Previous
                </Button>

                <div className="px-2 font-semibold text-slate-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-2.5 py-1 text-xs"
                >
                  Next <ChevronRight className="h-3.5 w-3.5 ml-1 inline" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Cart Details Drawer */}
      <CartDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedCart(null);
        }}
        cart={selectedCart}
        onReviewMismatch={handleReviewMismatch}
        isReviewing={isReviewing}
      />
    </div>
  );
};

export default ActiveCarts;
