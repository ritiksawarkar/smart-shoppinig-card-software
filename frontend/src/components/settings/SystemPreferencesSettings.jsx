import React from 'react';
import Select from '../ui/Select';
import Card from '../ui/Card';
import { Sliders, LayoutGrid, Monitor } from 'lucide-react';

export const SystemPreferencesSettings = ({ formState, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card title="Admin Portal Display Preferences" subtitle="Customize dashboard layout density, table pagination, and visual preferences.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            label="Default Table Page Size"
            name="defaultPageSize"
            value={String(formState.defaultPageSize || 10)}
            onChange={(e) => onChange('defaultPageSize', Number(e.target.value))}
            options={[
              { value: '10', label: '10 Rows per page (Default)' },
              { value: '25', label: '25 Rows per page' },
              { value: '50', label: '50 Rows per page' },
              { value: '100', label: '100 Rows per page' },
            ]}
          />

          <Select
            label="Table Data Density"
            name="tableDensity"
            value={formState.tableDensity || 'Comfortable'}
            onChange={(e) => onChange('tableDensity', e.target.value)}
            options={[
              { value: 'Comfortable', label: 'Comfortable (Standard Padding & Heights)' },
              { value: 'Compact', label: 'Compact (High-Density Grid Layout)' },
            ]}
          />

          <Select
            label="Default Portal Language"
            name="defaultLanguage"
            value={formState.defaultLanguage || 'English (US)'}
            onChange={(e) => onChange('defaultLanguage', e.target.value)}
            options={[
              { value: 'English (US)', label: 'English (US)' },
              { value: 'English (IN)', label: 'English (India)' },
              { value: 'Hindi (HI)', label: 'Hindi (हिन्दी)' },
            ]}
          />

          <Select
            label="Currency Display Format"
            name="currencyDisplay"
            value={formState.currencyDisplay || 'Symbol (₹)'}
            onChange={(e) => onChange('currencyDisplay', e.target.value)}
            options={[
              { value: 'Symbol (₹)', label: 'Symbol Format (e.g. ₹1,250)' },
              { value: 'ISO Code (INR)', label: 'ISO Code Format (e.g. INR 1,250)' },
            ]}
          />

          <div className="md:col-span-2">
            <Select
              label="Appearance Theme"
              name="theme"
              value={formState.theme || 'System'}
              onChange={(e) => onChange('theme', e.target.value)}
              options={[
                { value: 'System', label: 'System Default (Auto-Detect OS Theme)' },
                { value: 'Light', label: 'Light Mode' },
                { value: 'Dark', label: 'Dark Mode' },
              ]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemPreferencesSettings;
