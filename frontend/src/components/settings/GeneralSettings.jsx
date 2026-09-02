import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import { Globe, Clock, DollarSign, MapPin } from 'lucide-react';

export const GeneralSettings = ({ formState, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card title="General Application Settings" subtitle="Configure platform identifiers, localization, timezone, and formatting.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Application Name"
            name="applicationName"
            value={formState.applicationName || ''}
            onChange={(e) => onChange('applicationName', e.target.value)}
            error={errors.applicationName}
            required
            leftIcon={Globe}
            placeholder="e.g. Smart Shopping Cart"
          />

          <Input
            label="Default Store Title"
            name="storeName"
            value={formState.storeName || ''}
            onChange={(e) => onChange('storeName', e.target.value)}
            error={errors.storeName}
            required
            placeholder="e.g. HyperMart Central"
          />

          <div className="md:col-span-2">
            <Input
              label="Store Location / Branch Label"
              name="storeLocation"
              value={formState.storeLocation || ''}
              onChange={(e) => onChange('storeLocation', e.target.value)}
              leftIcon={MapPin}
              placeholder="e.g. Branch #01, Retail Hub, Tech City"
            />
          </div>
        </div>
      </Card>

      <Card title="Localization & Regional Configuration" subtitle="Set system-wide currency, time zone, and date-time display parameters.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Select
              label="System Currency"
              name="currency"
              value={formState.currency || 'INR'}
              onChange={(e) => onChange('currency', e.target.value)}
              options={[
                { value: 'INR', label: 'INR (₹) - Indian Rupee' },
                { value: 'USD', label: 'USD ($) - US Dollar' },
                { value: 'EUR', label: 'EUR (€) - Euro' },
                { value: 'GBP', label: 'GBP (£) - British Pound' },
              ]}
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Controls currency symbols rendered across receipt printers, LCD displays, and transaction ledgers.
            </p>
          </div>

          <div>
            <Select
              label="System Timezone"
              name="timezone"
              value={formState.timezone || 'Asia/Kolkata'}
              onChange={(e) => onChange('timezone', e.target.value)}
              options={[
                { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST +05:30)' },
                { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
                { value: 'America/New_York', label: 'America/New_York (EST -05:00)' },
                { value: 'Europe/London', label: 'Europe/London (GMT +00:00)' },
                { value: 'Asia/Dubai', label: 'Asia/Dubai (GST +04:00)' },
              ]}
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Backend timestamp normalization for load cell telemetry and transaction auditing.
            </p>
          </div>

          <Select
            label="Date Format"
            name="dateFormat"
            value={formState.dateFormat || 'DD MMM YYYY'}
            onChange={(e) => onChange('dateFormat', e.target.value)}
            options={[
              { value: 'DD MMM YYYY', label: 'DD MMM YYYY (e.g. 02 Sep 2026)' },
              { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (e.g. 2026-09-02)' },
              { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (e.g. 09/02/2026)' },
              { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (e.g. 02/09/2026)' },
            ]}
          />

          <Select
            label="Time Format"
            name="timeFormat"
            value={formState.timeFormat || '12-hour'}
            onChange={(e) => onChange('timeFormat', e.target.value)}
            options={[
              { value: '12-hour', label: '12-hour (10:30 AM)' },
              { value: '24-hour', label: '24-hour (22:30)' },
            ]}
          />
        </div>

        <div className="mt-5 p-3.5 bg-blue-50/80 border border-blue-200/60 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
          <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Backend Configuration Notice:</span> Currency and time zone parameters are backend-controlled settings. Saved changes update backend formatting contracts used for payment gateway requests and transaction record validation.
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GeneralSettings;
