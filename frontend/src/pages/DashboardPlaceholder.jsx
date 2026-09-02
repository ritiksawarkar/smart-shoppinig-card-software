import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { ShoppingCart, LogOut, CheckCircle2, Package, Scale, CreditCard, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Header Bar */}
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide uppercase">Smart Shopping Cart</h1>
              <p className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">Admin Operational Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-slate-400">{user?.role || 'Super Admin'} &bull; {user?.storeLocation || 'Main Store'}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Success Alert */}
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-emerald-900">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-sm">Authentication Successful</h2>
            <p className="text-xs text-emerald-700 mt-0.5">
              You are logged in as <span className="font-semibold">{user?.email}</span>. Protected Admin Route `/dashboard` is active.
            </p>
          </div>
        </div>

        {/* Dashboard Placeholder Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: System Status */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cart Telemetry</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                12 Active Carts
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">Online</div>
            <p className="text-xs text-slate-500 mt-1">Barcode scanners and load cells connected via MQTT/WebSocket.</p>
          </div>

          {/* Card 2: Daily Sales */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Transactions</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                142 Orders
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">₹48,250.00</div>
            <p className="text-xs text-slate-500 mt-1">Automated weight verified checkouts processed today.</p>
          </div>

          {/* Card 3: Weight Anomaly Alerts */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security Audits</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                0 Flagged
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">100% Match</div>
            <p className="text-xs text-slate-500 mt-1">Cart weight versus scanned items discrepancy checks.</p>
          </div>
        </div>

        {/* Future Modules Preview */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Upcoming Admin Management Modules</h3>
          <p className="text-xs text-slate-500 mb-6">These pages will be linked into the protected sidebar navigation in subsequent phases.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Products</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <Scale className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Weight Audit</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <ShoppingCart className="h-6 w-6 text-teal-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Active Carts</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <CreditCard className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Transactions</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Reports</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <Settings className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-800">Settings</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPlaceholder;
