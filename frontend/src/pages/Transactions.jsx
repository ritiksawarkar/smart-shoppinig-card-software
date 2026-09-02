import React from 'react';
import { RefreshCw, Receipt, ShoppingBag, IndianRupee, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { TransactionSearch } from '../components/transactions/TransactionSearch';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionDetailsDrawer } from '../components/transactions/TransactionDetailsDrawer';
import { formatCurrency } from '../utils/formatCurrency';

export const Transactions = () => {
  const {
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
  } = useTransactions();

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
        title="Transactions"
        description="View completed shopping transactions, payments, and billing history."
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

      {/* Transaction Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Transactions</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.totalTransactions.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 flex items-center justify-center font-bold">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Today's Transactions</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.todayTransactions}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
            <IndianRupee className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Today's Sales</div>
            <div className="text-xl font-extrabold text-slate-900">{formatCurrency(summaryMetrics.todaySales)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Payments</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.pendingPaymentsCount}</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TransactionSearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <TransactionFilters
            transactionStatus={transactionStatus}
            paymentStatus={paymentStatus}
            paymentMethod={paymentMethod}
            dateRange={dateRange}
            onTransactionStatusChange={handleTransactionStatusChange}
            onPaymentStatusChange={handlePaymentStatusChange}
            onPaymentMethodChange={handlePaymentMethodChange}
            onDateRangeChange={handleDateRangeChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Transactions Data Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Loading Transaction Records...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <Receipt className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No transaction records found</p>
              <p className="text-slate-500 mt-0.5">
                {search || transactionStatus || paymentStatus || paymentMethod || dateRange
                  ? 'No transaction records match your search or filter criteria.'
                  : 'Completed supermarket checkout transactions will appear here.'}
              </p>
            </div>
            {(search || transactionStatus || paymentStatus || paymentMethod || dateRange) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <TransactionTable
              transactions={transactions}
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
                <span className="font-bold text-slate-900">{pagination.totalItems}</span> transactions
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

      {/* Transaction Details Drawer */}
      <TransactionDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
