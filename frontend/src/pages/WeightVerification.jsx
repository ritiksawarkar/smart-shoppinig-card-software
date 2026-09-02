import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Scale, CheckCircle2, AlertTriangle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { weightVerificationService } from '../services/weightVerificationService';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';
import { WeightVerificationSearch } from '../components/weightVerification/WeightVerificationSearch';
import { WeightVerificationFilters } from '../components/weightVerification/WeightVerificationFilters';
import { WeightVerificationTable } from '../components/weightVerification/WeightVerificationTable';
import { WeightVerificationDetailsDrawer } from '../components/weightVerification/WeightVerificationDetailsDrawer';
import { VerificationResolutionModal } from '../components/weightVerification/VerificationResolutionModal';

export const WeightVerification = () => {
  // Query & Filter State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('lastChecked');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Data State
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalVerifications: 0,
    verifiedCount: 0,
    verificationRequiredCount: 0,
    pendingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Drawer & Modal States
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [targetRecordForResolution, setTargetRecordForResolution] = useState(null);
  const [isSubmittingResolution, setIsSubmittingResolution] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Fetch summary metrics
  const fetchMetrics = useCallback(async () => {
    try {
      const metrics = await weightVerificationService.getVerificationSummaryMetrics();
      setSummaryMetrics(metrics);
    } catch (err) {
      console.error('Failed to fetch verification metrics:', err);
    }
  }, []);

  // Fetch verification records list
  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await weightVerificationService.getVerificationRecords({
        search,
        status,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize,
      });
      setRecords(res.records);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch verification records:', err);
      setError('Unable to load weight verification data. Please check connection.');
    } finally {
      setLoading(false);
    }
  }, [search, status, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchRecords();
    fetchMetrics();
  }, [fetchRecords, fetchMetrics]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await weightVerificationService.refreshVerificationRecords();
      await Promise.all([fetchRecords(), fetchMetrics()]);
      setToast({ message: 'Weight verification data refreshed.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to refresh verification telemetry.', type: 'error' });
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

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
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
  const handleViewDetails = async (id) => {
    try {
      const details = await weightVerificationService.getVerificationDetails(id);
      setSelectedRecord(details);
      setIsDrawerOpen(true);
    } catch (err) {
      setToast({ message: 'Failed to load verification record details.', type: 'error' });
    }
  };

  // Open Resolution Modal
  const handleOpenResolutionModal = (record) => {
    setTargetRecordForResolution(record);
    setIsResolutionModalOpen(true);
  };

  // Submit Mismatch Resolution
  const handleResolutionSubmit = async (id, { reason, notes }) => {
    setIsSubmittingResolution(true);
    try {
      const updated = await weightVerificationService.resolveVerification(id, { reason, notes });
      setToast({ message: `Weight mismatch for ${updated.cartId} resolved.`, type: 'success' });
      setIsResolutionModalOpen(false);
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord(updated);
      }
      fetchRecords();
      fetchMetrics();
    } catch (err) {
      setToast({ message: err.message || 'Failed to resolve verification mismatch.', type: 'error' });
    } finally {
      setIsSubmittingResolution(false);
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
        title="Weight Verification"
        description="Monitor cart weight consistency and review verification mismatches."
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

      {/* Weight Verification Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-bold">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Verifications</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.totalVerifications}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verified</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.verifiedCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-bold">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verification Required</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.verificationRequiredCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 border border-slate-200/80 flex items-center justify-center font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pending Verification</div>
            <div className="text-xl font-extrabold text-slate-900">{summaryMetrics.pendingCount}</div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <Card padding="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <WeightVerificationSearch
            value={search}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
          />

          <WeightVerificationFilters
            status={status}
            onStatusChange={handleStatusChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </Card>

      {/* Weight Verification Table Card */}
      <Card padding="p-0">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <div className="h-7 w-7 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="font-medium">Loading Weight Verification Records...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-slate-500 space-y-3">
            <p className="text-rose-600 font-semibold">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchRecords} className="gap-2 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        ) : records.length === 0 ? (
          <div className="py-12 px-4 text-center text-xs text-slate-500 space-y-3">
            <Scale className="h-10 w-10 text-slate-300 mx-auto" />
            <div>
              <p className="font-bold text-slate-800 text-sm">No weight verification records found</p>
              <p className="text-slate-500 mt-0.5">
                {search || status
                  ? 'No verification records match your search or filter criteria.'
                  : 'Load cell weight verification logs will appear here as shopping sessions occur.'}
              </p>
            </div>
            {(search || status) && (
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="mx-auto">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div>
            <WeightVerificationTable
              records={records}
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
                <span className="font-bold text-slate-900">{pagination.totalItems}</span> records
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

      {/* Details Drawer */}
      <WeightVerificationDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        onOpenResolutionModal={handleOpenResolutionModal}
      />

      {/* Resolution Workflow Modal */}
      <VerificationResolutionModal
        isOpen={isResolutionModalOpen}
        onClose={() => setIsResolutionModalOpen(false)}
        record={targetRecordForResolution}
        onSubmit={handleResolutionSubmit}
        isSubmitting={isSubmittingResolution}
      />
    </div>
  );
};

export default WeightVerification;
