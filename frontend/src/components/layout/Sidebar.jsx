import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Scale,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Inventory', path: '/inventory', icon: Boxes },
    { label: 'Active Carts', path: '/carts', icon: ShoppingCart, badge: '17' },
    { label: 'Weight Verification', path: '/weight-verification', icon: Scale, badge: '2', badgeVariant: 'warning' },
    { label: 'Transactions', path: '/transactions', icon: Receipt },
    { label: 'Payments', path: '/payments', icon: CreditCard },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
      isActive
        ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30 font-bold'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none border-r border-slate-800">
      {/* Branding Top Banner */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xs font-extrabold tracking-tight text-white uppercase leading-none">
              SMART SHOPPING CART
            </h1>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-xs text-[9px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/20 mt-1">
              ADMIN PORTAL
            </div>
          </div>
        </div>

        {/* Close Button for Mobile Drawer */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Links Area */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management Console
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={navLinkClasses}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                    item.badgeVariant === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-400/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Admin User Footer Card */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                {user?.role || 'Super Admin'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded-md transition-colors cursor-pointer"
            aria-label="Sign Out"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay / Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Slide-out Drawer */}
          <div className="relative flex-1 max-w-xs w-full bg-slate-900 h-full z-10 shadow-2xl animate-fadeIn">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
