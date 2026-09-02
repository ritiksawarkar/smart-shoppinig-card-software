import React from 'react';
import { RefreshCw, CreditCard, CheckCircle2, Clock, AlertTriangle, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePayments } from '../hooks/usePayments';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { PaymentSearch } from '../components/payments/PaymentSearch';
import { PaymentFilters } from '../components/payments/PaymentFilters';
import { PaymentTable } from '../components/payments/PaymentTable';
import { PaymentDetailsDrawer } from '../components/payments/PaymentDetailsDrawer';
import { formatCurrency } from '../utils/formatCurrency';

export const Payments = () => {
  const {
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
  } = usePayments();

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
        title="Payments"
        description="Monitor payment status, methods, and payment transaction records."
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

      {/* Payment Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Volume</div>
            <div className="text-lg font-extrabold text-slate-900">{formatCurrency(summaryMetrics.totalVolume)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Successful</div>
            <div className="text-lg font-extrabold text-slate-900">{formatCurrency(summaryMetrics.successfulVolume)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending</div>
            <div className="text-lg font-extrabold text-slate-900">{formatCurrency(summaryMetrics.pendingVolume)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center font-bold">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Failed</div>
            <div className="text-lg font-extrabold text-slate-900">{formatCurrency(summaryMetrics.failedVolume)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 flex items-center justify-center font-bold">
            <IndianRupee className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Today's Volume</div>
            <div className="text-lg font-extrabold text-slate-900">{formatCurrency(summaryMetrics.todayVolume)}</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PaymentSearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <PaymentFilters
            paymentStatus={paymentStatus}
            paymentMethod={paymentMethod}
            reconciliationStatus={reconciliationStatus}
            dateRange={dateRange}
            onPaymentStatusChange={handlePaymentStatusChange}
            onPaymentMethodChange={handlePaymentMethodChange}
            onReconciliationStatusChange={handleReconciliationStatusChange}
            onDateRangeChange={handleDateRangeChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Payments Data Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Loading Payment Records...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : payments.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <CreditCard className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No payment records found</p>
              <p className="text-slate-500 mt-0.5">
                {search || paymentStatus || paymentMethod || reconciliationStatus || dateRange
                  ? 'No payment records match your search or filter criteria.'
                  : 'Payment telemetry records will appear here as checkout transactions are processed.'}
              </p>
            </div>
            {(search || paymentStatus || paymentMethod || reconciliationStatus || dateRange) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <PaymentTable
              payments={payments}
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
                <span className="font-bold text-slate-900">{pagination.totalItems}</span> payment records
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

      {/* Payment Details Drawer */}
      <PaymentDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        payment={selectedPayment}
      />
    </div>
  );
};

export default Payments;
