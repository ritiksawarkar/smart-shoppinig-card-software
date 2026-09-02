import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Package, CheckCircle2, XCircle, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { ProductSearch } from '../components/products/ProductSearch';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductTable } from '../components/products/ProductTable';
import { ProductModal } from '../components/products/ProductModal';

export const Products = () => {
  // Query & Filter State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({ total: 0, active: 0, inactive: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [modalState, setModalState] = useState({ mode: null, isOpen: false, product: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch summary metrics
  const fetchSummary = useCallback(async () => {
    try {
      const metrics = await productService.getProductSummaryMetrics();
      setSummaryMetrics(metrics);
    } catch (err) {
      console.error('Failed to fetch product metrics:', err);
    }
  }, []);

  // Fetch products list
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProducts({
        search,
        category,
        status,
        stockFilter,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setProducts(res.products);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Unable to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [search, category, status, stockFilter, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchProducts();
    fetchSummary();
  }, [fetchProducts, fetchSummary]);

  // Reset page to 1 when filters change
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val) => {
    setCategory(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    setCurrentPage(1);
  };

  const handleStockFilterChange = (val) => {
    setStockFilter(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
    setStockFilter('');
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

  // Modal Handlers
  const handleOpenAddModal = () => {
    setModalState({ mode: 'add', isOpen: true, product: null });
  };

  const handleOpenEditModal = (product) => {
    setModalState({ mode: 'edit', isOpen: true, product });
  };

  const handleOpenViewModal = (product) => {
    setModalState({ mode: 'view', isOpen: true, product });
  };

  const handleOpenDeactivateModal = (product) => {
    setModalState({ mode: 'deactivate', isOpen: true, product });
  };

  const handleCloseModal = () => {
    setModalState({ mode: null, isOpen: false, product: null });
  };

  // CRUD Handlers
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (modalState.mode === 'add') {
        await productService.createProduct(formData);
        setToast({ message: 'Product added successfully.', type: 'success' });
      } else if (modalState.mode === 'edit') {
        await productService.updateProduct(modalState.product.id, formData);
        setToast({ message: 'Product updated successfully.', type: 'success' });
      }
      handleCloseModal();
      fetchProducts();
      fetchSummary();
    } catch (err) {
      setToast({ message: err.message || 'Action failed. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDeactivate = async (id) => {
    setIsSubmitting(true);
    try {
      await productService.deactivateProduct(id);
      setToast({ message: 'Product deactivated successfully.', type: 'success' });
      handleCloseModal();
      fetchProducts();
      fetchSummary();
    } catch (err) {
      setToast({ message: err.message || 'Failed to deactivate product.', type: 'error' });
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
        title="Products"
        description="Manage product information used by the Smart Shopping Cart."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenAddModal} className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        }
      />

      {/* Product Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <Package className="h-5 w-5" />
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
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.active}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inactive</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.inactive}</div>
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
      </div>

      {/* Main Search & Filter Control Toolbar */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ProductSearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <ProductFilters
            category={category}
            status={status}
            stockFilter={stockFilter}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
            onStockFilterChange={handleStockFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Products Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Loading Product Master...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchProducts} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <Package className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No products found</p>
              <p className="text-slate-500 mt-0.5">
                {search || category || status || stockFilter
                  ? 'No products match your active search or filter criteria.'
                  : 'Get started by creating your first product master record.'}
              </p>
            </div>
            {(search || category || status || stockFilter) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <ProductTable
              products={products}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDeactivate={handleOpenDeactivateModal}
            />

            {/* Pagination Controls Footer */}
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

      {/* Dynamic Product Modal Workflow */}
      <ProductModal
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        product={modalState.product}
        onSubmit={handleFormSubmit}
        onConfirmDeactivate={handleConfirmDeactivate}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Products;
