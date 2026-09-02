import React from 'react';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { User, Mail, ShieldCheck, KeyRound, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminProfileSettings = ({
  formState,
  onChange,
  errors,
  onChangePasswordClick,
}) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Profile Details Card */}
      <Card title="Administrator Profile" subtitle="Personal administrator details and security credentials.">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 mb-6 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-xl font-black text-white shrink-0">
            {formState.name ? formState.name.charAt(0) : user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-base font-extrabold text-slate-900">{formState.name || user?.name || 'Administrator'}</h3>
              <Badge variant="info" className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-blue-600 shrink-0" />
                {formState.role || user?.role || 'Super Admin'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">{formState.email || user?.email || 'admin@smartcart.com'}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <Clock className="h-3 w-3 text-slate-400 shrink-0" />
              Last Session Login: {formState.lastLogin ? new Date(formState.lastLogin).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '02 Sep 2026, 08:30 AM'}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onChangePasswordClick}
            className="shrink-0"
          >
            <KeyRound className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
            Change Password
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            name="name"
            value={formState.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            error={errors.name}
            leftIcon={User}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formState.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
            leftIcon={Mail}
            required
          />

          <Input
            label="Assigned Store Location"
            name="storeLocation"
            value={formState.storeLocation || ''}
            onChange={(e) => onChange('storeLocation', e.target.value)}
            leftIcon={MapPin}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Assigned Role & Permissions
            </label>
            <Input
              name="role"
              value={formState.role || 'Super Admin'}
              disabled
              rightElement={
                <span className="text-xs text-slate-400 font-mono px-2 py-1 bg-slate-100 rounded-md">Backend Enforced</span>
              }
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Roles and permission scopes cannot be edited directly by current user. Role elevation is granted by super admin authorization workflows.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminProfileSettings;
