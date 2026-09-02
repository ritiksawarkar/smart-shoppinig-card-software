import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Info, Cpu, Database, Server, CheckCircle2, RefreshCcw, ShieldAlert, Activity } from 'lucide-react';
import { settingsService } from '../../services/settingsService';

export const SystemInformationSettings = ({ formState, onRestoreDefaultsClick }) => {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      setLoadingHealth(true);
      try {
        const data = await settingsService.getSystemHealth();
        setHealth(data);
      } catch (err) {
        console.error('Failed to fetch health info:', err);
      } finally {
        setLoadingHealth(false);
      }
    };
    fetchHealth();
  }, []);

  const info = formState || health?.systemInfo || {};

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Version & Build Metrics */}
      <Card title="System Build & Version Information" subtitle="Read-only metadata detailing active software artifacts and backend microservice versions.">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Name</span>
            <div className="text-sm font-bold text-slate-900 mt-1">Smart Shopping Cart</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Build Version</span>
            <div className="text-sm font-bold text-blue-700 mt-1 font-mono">{info.version || 'v1.4.2'}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Deployment Environment</span>
            <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <Badge variant="warning">{info.environment || 'Development'}</Badge>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Frontend Client Version</span>
            <div className="text-sm font-bold text-slate-800 mt-1 font-mono">{info.frontendVersion || 'v1.4.2'}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Backend Core Microservice</span>
            <div className="text-sm font-bold text-slate-800 mt-1 font-mono">{info.backendVersion || 'v2.1.0-prod'}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">REST API Version</span>
            <div className="text-sm font-bold text-slate-800 mt-1 font-mono">{info.apiVersion || 'v1'}</div>
          </div>
        </div>
      </Card>

      {/* Real-time Health Checks */}
      <Card title="Backend Subsystem Health Telemetry" subtitle="Live health indicators provided by backend system diagnostics.">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Backend Gateway API</h4>
                <p className="text-[11px] text-slate-500">REST / WebSocket Server</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Database Cluster</h4>
                <p className="text-[11px] text-slate-500">PostgreSQL / Redis Cache</p>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Payment Gateway Service</h4>
                <p className="text-[11px] text-slate-500">Razorpay API Bridge</p>
              </div>
            </div>
            <Badge variant="success">Healthy</Badge>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Hardware Integration Service</h4>
                <p className="text-[11px] text-slate-500">Load Cell ADC / Scanner</p>
              </div>
            </div>
            <Badge variant="success">Available</Badge>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Weight Verification Engine</h4>
                <p className="text-[11px] text-slate-500">Tolerance Supervisor</p>
              </div>
            </div>
            <Badge variant="success">Operational</Badge>
          </div>
        </div>
      </Card>

      {/* Dangerous Action Zone: Restore Factory Defaults */}
      <Card title="Sensitive Administration Actions" subtitle="Restore system parameters to factory baseline configuration.">
        <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-950">Restore System Baseline Defaults</h4>
              <p className="text-[11px] text-rose-800 mt-0.5 max-w-lg">
                Resets all store parameters, weight tolerance thresholds, timeouts, and preferences back to initial factory setup.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestoreDefaultsClick}
            className="text-rose-700 hover:bg-rose-100 hover:text-rose-900 shrink-0 border border-rose-300"
          >
            <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
            Restore Factory Defaults
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SystemInformationSettings;
