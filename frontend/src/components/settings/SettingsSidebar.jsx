import React from 'react';
import {
  Globe,
  Store,
  ShoppingCart,
  Scale,
  Receipt,
  CreditCard,
  Bell,
  ShieldCheck,
  User,
  Sliders,
  Info,
  ChevronRight,
} from 'lucide-react';
import { SECTION_KEYS } from '../../hooks/useSettings';

export const navItems = [
  { id: SECTION_KEYS.GENERAL, label: 'General', icon: Globe, description: 'App name, location, timezone & formats' },
  { id: SECTION_KEYS.STORE, label: 'Store Information', icon: Store, description: 'Address, store code & contact info' },
  { id: SECTION_KEYS.CART, label: 'Cart System', icon: ShoppingCart, description: 'Session limits & connection timeouts' },
  { id: SECTION_KEYS.WEIGHT, label: 'Weight Verification', icon: Scale, description: 'Load cell tolerance & sensor calibration' },
  { id: SECTION_KEYS.BILLING, label: 'Billing', icon: Receipt, description: 'Prefixes, decimals, tax & discount rules' },
  { id: SECTION_KEYS.PAYMENTS, label: 'Payments', icon: CreditCard, description: 'UPI, Card, Cash modes & provider config' },
  { id: SECTION_KEYS.NOTIFICATIONS, label: 'Notifications', icon: Bell, description: 'Low stock & weight mismatch alerts' },
  { id: SECTION_KEYS.SECURITY, label: 'Security', icon: ShieldCheck, description: 'Session timeouts, password policy & audit logs' },
  { id: SECTION_KEYS.PROFILE, label: 'Admin Profile', icon: User, description: 'My profile details & password management' },
  { id: SECTION_KEYS.PREFERENCES, label: 'System Preferences', icon: Sliders, description: 'Table density, default page sizes & language' },
  { id: SECTION_KEYS.SYSTEM, label: 'System Information', icon: Info, description: 'Version details & backend health metrics' },
];

export const SettingsSidebar = ({ activeSection, onSelectSection, isDirty }) => {
  return (
    <div className="w-full lg:w-72 shrink-0">
      {/* Mobile Select Dropdown */}
      <div className="block lg:hidden mb-4">
        <label htmlFor="mobile-settings-section" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Configuration Category
        </label>
        <select
          id="mobile-settings-section"
          value={activeSection}
          onChange={(e) => onSelectSection(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-bold text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
        >
          {navItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label} {isDirty && activeSection === item.id ? '• (Unsaved)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Vertical Menu */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-2 space-y-1 sticky top-6">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
          Settings Categories
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`
                w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer group relative
                ${
                  isActive
                    ? 'bg-blue-50/80 border border-blue-200/60 text-blue-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }
              `}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{item.label}</span>
                  {isActive && isDirty && (
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" title="Unsaved changes" />
                  )}
                </div>
                <div className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                  {item.description}
                </div>
              </div>
              <ChevronRight
                className={`h-4 w-4 shrink-0 self-center transition-transform ${
                  isActive ? 'text-blue-600 transform translate-x-0.5' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;
