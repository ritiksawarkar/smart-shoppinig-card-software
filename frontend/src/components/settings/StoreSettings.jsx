import React from 'react';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { Store, Mail, Phone, MapPin, Tag, FileText, Image as ImageIcon } from 'lucide-react';

export const StoreSettings = ({ formState, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card title="Store Business Information" subtitle="Official store profile used in customer receipts, invoices, and legal reporting.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Store Name"
            name="storeName"
            value={formState.storeName || ''}
            onChange={(e) => onChange('storeName', e.target.value)}
            error={errors.storeName}
            required
            leftIcon={Store}
            placeholder="HyperMart Central"
          />

          <Input
            label="Store Code / Identifier"
            name="storeCode"
            value={formState.storeCode || ''}
            onChange={(e) => onChange('storeCode', e.target.value)}
            error={errors.storeCode}
            required
            leftIcon={Tag}
            placeholder="e.g. HM-IND-014"
          />

          <Input
            label="Contact Phone Number"
            name="contactNumber"
            value={formState.contactNumber || ''}
            onChange={(e) => onChange('contactNumber', e.target.value)}
            error={errors.contactNumber}
            required
            leftIcon={Phone}
            placeholder="+91 98765 43210"
          />

          <Input
            label="Official Store Email"
            name="email"
            type="email"
            value={formState.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
            required
            leftIcon={Mail}
            placeholder="contact@hypermart-shopping.com"
          />

          <div className="md:col-span-2">
            <Input
              label="Street Address"
              name="address"
              value={formState.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              leftIcon={MapPin}
              placeholder="Plot 42, Commercial Avenue, Sector 5"
            />
          </div>

          <Input
            label="City"
            name="city"
            value={formState.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Nagpur"
          />

          <Input
            label="State / Province"
            name="state"
            value={formState.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="Maharashtra"
          />

          <Input
            label="Country"
            name="country"
            value={formState.country || ''}
            onChange={(e) => onChange('country', e.target.value)}
            placeholder="India"
          />
        </div>
      </Card>

      <Card title="Store Branding & Logo" subtitle="Set the logo graphic for receipt printing and digital bill generation.">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="h-24 w-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
            {formState.logoUrl ? (
              <img src={formState.logoUrl} alt="Store Logo" className="h-full w-full object-cover" />
            ) : (
              <ImageIcon className="h-8 w-8 text-slate-400" />
            )}
          </div>
          <div className="flex-1 w-full space-y-2">
            <Input
              label="Logo Image URL"
              name="logoUrl"
              value={formState.logoUrl || ''}
              onChange={(e) => onChange('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <p className="text-[11px] text-slate-500">
              Provide an image URL or image asset path. Recommended dimensions: 300x300 PNG or SVG with transparent background.
            </p>
          </div>
        </div>
      </Card>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-3">
        <FileText className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-900 mb-0.5">Centralized Store Data Purpose</h4>
          <p>
            Store information is centralized and referenced across all sub-modules: receipt slips, automated PDF invoicing, transaction ledgers, analytics reports, and customer checkout displays. Changes saved here reflect across future bill generation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
