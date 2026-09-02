import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, ScanBarcode, Scale, ShieldCheck, Cpu } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // If already authenticated, redirect immediately to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-800">
      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT COLUMN: Compact Branding & Info Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Pattern Elements */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Branding Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-white leading-tight uppercase">
                  SMART SHOPPING CART
                </h1>
                <div className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/20 mt-0.5">
                  ADMIN PORTAL
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-normal leading-relaxed mb-6">
              Manage your smart retail operations, product inventory, and cart verifications from one central command place.
            </p>
          </div>

          {/* Middle Operational Features List */}
          <div className="relative z-10 space-y-3.5 my-6">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              System Modules
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <ScanBarcode className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-100">Barcode Scanner Sync</div>
                <div className="text-[11px] text-slate-400">Live item detection & instant cart tally</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Scale className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-100">Weight Verification</div>
                <div className="text-[11px] text-slate-400">Load cell sensor anti-theft validation</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Cpu className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-100">Active Cart Telemetry</div>
                <div className="text-[11px] text-slate-400">Real-time floor monitoring & payments</div>
              </div>
            </div>
          </div>

          {/* Bottom Compliance & Version */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Enterprise Encrypted
            </span>
            <span>v2.4.0</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Admin Login Form Area */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            {/* Header Title inside Card */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Admin Login
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to access the Smart Shopping Cart management system.
              </p>
            </div>

            {/* Login Form Component */}
            <LoginForm onSuccess={handleLoginSuccess} />

            {/* Footer Notice */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                Protected Supermarket Administration Portal &bull; Major Project Demonstration
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
