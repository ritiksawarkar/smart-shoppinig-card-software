import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Boxes, CheckCircle2, AlertTriangle, XCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { inventoryService } from '../services/inventoryService';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { InventorySearch } from '../components/inventory/InventorySearch';
import { InventoryFilters } from '../components/inventory/InventoryFilters';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { StockAdjustmentModal } from '../components/inventory/StockAdjustmentModal';
import { StockHistoryModal } from '../components/inventory/StockHistoryModal';
import { ReorderLevelModal } from '../components/inventory/ReorderLevelModal';
import { RecentStockActivity } from '../components/inventory/RecentStockActivity';

export const Inventory = () => {
  const navigate = useNavigate();

  // Query & Filter State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [inventoryItems, setInventoryItems] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({ total: 0, inStock: 0, lowStock: 0, outOfStock: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [targetProductForAdjustment, setTargetProductForAdjustment] = useState(null);
  const [historyModalState, setHistoryModalState] = useState({ isOpen: false, product: null, logs: [] });
  const [reorderModalState, setReorderModalState] = useState({ isOpen: false, product: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch summary metrics & recent logs
  const fetchMetricsAndLogs = useCallback(async () => {
    try {
      const [metrics, activities] = await Promise.all([
        inventoryService.getInventorySummaryMetrics(),
        inventoryService.getRecentStockActivity(),
      ]);
      setSummaryMetrics(metrics);
      setRecentActivities(activities);
    } catch (err) {
      console.error('Failed to fetch inventory metrics:', err);
    }
  }, []);

  // Fetch inventory table items
  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await inventoryService.getInventory({
        search,
        category,
        stockStatus,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setInventoryItems(res.inventory);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      setError('Unable to load inventory data. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [search, category, stockStatus, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchInventory();
    fetchMetricsAndLogs();
  }, [fetchInventory, fetchMetricsAndLogs]);

  // Filter change handlers
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val) => {
    setCategory(val);
    setCurrentPage(1);
  };

  const handleStockStatusChange = (val) => {
    setStockStatus(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStockStatus('');
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

  // Action Handlers
  const handleOpenAdjustmentModal = (product = null) => {
    setTargetProductForAdjustment(product);
    setIsAdjustmentModalOpen(true);
  };

  const handleCloseAdjustmentModal = () => {
    setIsAdjustmentModalOpen(false);
    setTargetProductForAdjustment(null);
  };

  const handleOpenHistoryModal = async (product) => {
    try {
      const logs = await inventoryService.getStockHistory(product.productId);
      setHistoryModalState({ isOpen: true, product, logs });
    } catch (err) {
      setToast({ message: 'Failed to load stock history logs.', type: 'error' });
    }
  };

  const handleOpenReorderModal = (product) => {
    setReorderModalState({ isOpen: true, product });
  };

  // Submit Manual Stock Adjustment
  const handleStockAdjustmentSubmit = async (adjustmentData) => {
    setIsSubmitting(true);
    try {
      await inventoryService.adjustStock(adjustmentData);
      setToast({ message: 'Stock updated successfully.', type: 'success' });
      handleCloseAdjustmentModal();
      fetchInventory();
      fetchMetricsAndLogs();
    } catch (err) {
      setToast({ message: err.message || 'Stock adjustment failed.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Reorder Level Update
  const handleReorderLevelSubmit = async (productId, newLevel) => {
    setIsSubmitting(true);
    try {
      await inventoryService.updateReorderLevel(productId, newLevel);
      setToast({ message: 'Reorder level updated successfully.', type: 'success' });
      setReorderModalState({ isOpen: false, product: null });
      fetchInventory();
      fetchMetricsAndLogs();
    } catch (err) {
      setToast({ message: err.message || 'Failed to update reorder level.', type: 'error' });
    } finally {
      setIsSubmitting(false);
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

      {/* Page Header Banner */}
      <PageHeader
        title="Inventory"
        description="Monitor and manage product stock across the store."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenAdjustmentModal()}
            className="gap-2 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Stock Adjustment
          </Button>
        }
      />

      {/* Inventory Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Products</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.total}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">In Stock</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.inStock}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Low Stock</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.lowStock}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center font-bold">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Out of Stock</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.outOfStock}</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <InventorySearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <InventoryFilters
            category={category}
            stockStatus={stockStatus}
            onCategoryChange={handleCategoryChange}
            onStockStatusChange={handleStockStatusChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Inventory Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Loading Store Inventory...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchInventory} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : inventoryItems.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <Boxes className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No inventory records found</p>
              <p className="text-slate-500 mt-0.5">
                {search || category || stockStatus
                  ? 'No inventory items match your active search or filter criteria.'
                  : 'Product inventory records will appear here as products are added.'}
              </p>
            </div>
            {(search || category || stockStatus) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <InventoryTable
              items={inventoryItems}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onViewProduct={(id) => navigate('/products')}
              onAdjustStock={(product) => handleOpenAdjustmentModal(product)}
              onViewHistory={handleOpenHistoryModal}
              onSetReorderLevel={handleOpenReorderModal}
            />

            {/* Pagination Controls */}
            <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
              <div>
                Showing <span className="font-bold text-slate-900">{pagination.startIndex}</span> –{' '}
                <span className="font-bold text-slate-900">{pagination.endIndex}</span> of{' '}
                <span className="font-bold text-slate-900">{pagination.totalItems}</span> products
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

      {/* Recent Stock Activity Panel */}
      <RecentStockActivity activities={recentActivities} />

      {/* Manual Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={handleCloseAdjustmentModal}
        targetProduct={targetProductForAdjustment}
        productsList={inventoryItems}
        onSubmit={handleStockAdjustmentSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Stock History Audit Timeline Modal */}
      <StockHistoryModal
        isOpen={historyModalState.isOpen}
        onClose={() => setHistoryModalState({ isOpen: false, product: null, logs: [] })}
        product={historyModalState.product}
        historyLogs={historyModalState.logs}
      />

      {/* Reorder Level Modal */}
      <ReorderLevelModal
        isOpen={reorderModalState.isOpen}
        onClose={() => setReorderModalState({ isOpen: false, product: null })}
        product={reorderModalState.product}
        onSubmit={handleReorderLevelSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Inventory;
