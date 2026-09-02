import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Receipt, ShoppingCart, AlertTriangle, RefreshCw, AlertCircle } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/dashboard/StatCard';
import { SalesOverview } from '../components/dashboard/SalesOverview';
import { ActiveCartsCard } from '../components/dashboard/ActiveCartsCard';
import { LowStockProducts } from '../components/dashboard/LowStockProducts';
import { WeightAlerts } from '../components/dashboard/WeightAlerts';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { PaymentSummaryCard } from '../components/dashboard/PaymentSummaryCard';
import { DashboardAlerts } from '../components/dashboard/DashboardAlerts';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton';
import { Button } from '../components/ui/Button';
import { useAdminLayout } from '../components/layout/AdminLayout';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { refreshTrigger } = useAdminLayout();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getAllDashboardData();
      setData(result);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load dashboard data. Please check connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData, refreshTrigger]);

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Monitor your store's smart shopping cart operations from one place."
        />
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Monitor your store's smart shopping cart operations from one place."
        />
        <div className="p-8 bg-white border border-rose-200 rounded-2xl shadow-xs text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="h-12 w-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Failed to Load Operational Data</h3>
            <p className="text-xs text-slate-500 mt-1">{error}</p>
          </div>
          <Button variant="primary" size="sm" onClick={fetchDashboardData} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Loading
          </Button>
        </div>
      </div>
    );
  }

  const {
    kpiSummary = {},
    salesOverview = [],
    activeCarts = [],
    lowStockProducts = [],
    weightAlerts = [],
    recentTransactions = [],
    paymentSummary = {},
    operationalAlerts = [],
  } = data || {};

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Top Welcome & Page Header */}
      <PageHeader
        title="Dashboard"
        description="Monitor your store's smart shopping cart operations from one place."
      />

      {/* Operational System Notice Alerts */}
      <DashboardAlerts alerts={operationalAlerts} />

      {/* KPI System Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Today's Sales"
          value={`₹${(kpiSummary.todaySales || 0).toLocaleString('en-IN')}`}
          subtext={kpiSummary.salesTrend}
          trend="+8.4%"
          trendPositive={true}
          icon={IndianRupee}
          iconBg="bg-blue-50 text-blue-600 border-blue-200/80"
          onClick={() => navigate('/transactions')}
        />

        <StatCard
          title="Today's Transactions"
          value={kpiSummary.todayTransactions || 0}
          subtext={kpiSummary.transactionsSubtext}
          icon={Receipt}
          iconBg="bg-indigo-50 text-indigo-600 border-indigo-200/80"
          onClick={() => navigate('/transactions')}
        />

        <StatCard
          title="Active Carts"
          value={kpiSummary.activeCarts || 0}
          subtext={kpiSummary.activeCartsSubtext}
          icon={ShoppingCart}
          iconBg="bg-teal-50 text-teal-600 border-teal-200/80"
          onClick={() => navigate('/carts')}
        />

        <StatCard
          title="Low Stock"
          value={kpiSummary.lowStockProductsCount || 0}
          subtext={kpiSummary.lowStockSubtext}
          icon={AlertTriangle}
          iconBg="bg-amber-50 text-amber-700 border-amber-200/80"
          onClick={() => navigate('/inventory')}
        />
      </div>

      {/* Sales Overview Chart + Active Carts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SalesOverview data={salesOverview} />
        </div>

        <div className="lg:col-span-5">
          <ActiveCartsCard carts={activeCarts} />
        </div>
      </div>

      {/* Low Stock Section + Weight Verification Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <LowStockProducts products={lowStockProducts} />
        </div>

        <div className="lg:col-span-6">
          <WeightAlerts alerts={weightAlerts} />
        </div>
      </div>

      {/* Recent Transactions Table + Payment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RecentTransactions transactions={recentTransactions} />
        </div>

        <div className="lg:col-span-4">
          <PaymentSummaryCard summary={paymentSummary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
