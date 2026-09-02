import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Table from '../ui/Table';
import { ShieldCheck, Lock, History, Clock, FileText } from 'lucide-react';
import { settingsService } from '../../services/settingsService';

export const SecuritySettings = ({ formState, onChange, errors }) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    const fetchAudit = async () => {
      setLoadingLogs(true);
      try {
        const logs = await settingsService.getAuditHistory();
        setAuditLogs(logs);
      } catch (err) {
        console.error('Failed to fetch audit history:', err);
      } finally {
        setLoadingLogs(false);
      }
    };
    fetchAudit();
  }, []);

  const columns = [
    {
      header: 'Date & Time',
      accessorKey: 'timestamp',
      cell: (row) => (
        <span className="text-xs font-mono text-slate-700">
          {new Date(row.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
        </span>
      ),
    },
    {
      header: 'Admin User',
      accessorKey: 'admin',
      cell: (row) => <span className="text-xs font-bold text-slate-900">{row.admin}</span>,
    },
    {
      header: 'Configured Setting',
      accessorKey: 'setting',
      cell: (row) => <span className="text-xs font-medium text-slate-800">{row.setting}</span>,
    },
    {
      header: 'Previous Value',
      accessorKey: 'previousValue',
      cell: (row) => <span className="text-xs font-mono text-slate-500 line-through">{row.previousValue}</span>,
    },
    {
      header: 'New Value',
      accessorKey: 'newValue',
      cell: (row) => <span className="text-xs font-mono font-bold text-blue-700">{row.newValue}</span>,
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (row) => (
        <Badge variant={row.action === 'Calibrated' ? 'warning' : 'info'}>
          {row.action}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Session & Authentication Parameters */}
      <Card title="Admin Session & Login Policy" subtitle="Configure security thresholds and brute-force protection parameters.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <Input
              label="Admin Inactivity Session Timeout (minutes)"
              name="adminSessionTimeout"
              type="number"
              value={formState.adminSessionTimeout ?? ''}
              onChange={(e) => onChange('adminSessionTimeout', Number(e.target.value))}
              error={errors.adminSessionTimeout}
              leftIcon={Clock}
              required
              placeholder="60"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Duration of admin inactivity before automatic session revocation.
            </p>
          </div>

          <div>
            <Input
              label="Max Failed Login Attempt Limit"
              name="loginAttemptLimit"
              type="number"
              value={formState.loginAttemptLimit ?? ''}
              onChange={(e) => onChange('loginAttemptLimit', Number(e.target.value))}
              error={errors.loginAttemptLimit}
              leftIcon={Lock}
              required
              placeholder="5"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Number of incorrect password attempts before temporary account lockout.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Require Password Re-authentication for Sensitive Actions</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Prompt admin for password verification before modifying security or payment configs.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.requireReauthForSensitive)}
              onChange={(e) => onChange('requireReauthForSensitive', e.target.checked)}
            />
          </div>

          <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Enable Automated System Audit Logging</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Record all configuration edits, password changes, and sensor calibrations into database audit trail.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.auditLoggingEnabled)}
              onChange={(e) => onChange('auditLoggingEnabled', e.target.checked)}
            />
          </div>
        </div>
      </Card>

      {/* Audit History Log */}
      <Card title="System Configuration Audit Trail" subtitle="Auditable historical record of administrator configuration modifications.">
        {loadingLogs ? (
          <div className="py-8 text-center text-slate-400 text-xs animate-pulse">
            Loading audit history logs from backend...
          </div>
        ) : (
          <Table
            columns={columns}
            data={auditLogs}
            emptyMessage="No audit logs recorded yet."
          />
        )}
      </Card>
    </div>
  );
};

export default SecuritySettings;
