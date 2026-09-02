import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import { Receipt, AlertCircle, Percent, Hash } from 'lucide-react';

export const BillingSettings = ({ formState, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card title="Billing & Invoice Numbering Rules" subtitle="Configure prefix conventions, decimal precision, and receipt formatting.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Transaction Prefix"
            name="transactionPrefix"
            value={formState.transactionPrefix || ''}
            onChange={(e) => onChange('transactionPrefix', e.target.value)}
            error={errors.transactionPrefix}
            required
            leftIcon={Hash}
            placeholder="TXN-"
          />

          <Input
            label="Receipt Prefix"
            name="receiptPrefix"
            value={formState.receiptPrefix || ''}
            onChange={(e) => onChange('receiptPrefix', e.target.value)}
            error={errors.receiptPrefix}
            required
            leftIcon={Hash}
            placeholder="RCP-"
          />

          <Select
            label="Decimal Display Precision"
            name="decimalPrecision"
            value={String(formState.decimalPrecision || 2)}
            onChange={(e) => onChange('decimalPrecision', Number(e.target.value))}
            options={[
              { value: '2', label: '2 Decimal Places (e.g. ₹1,245.50)' },
              { value: '0', label: '0 Decimal Places (Rounded Integer)' },
            ]}
          />

          <Input
            label="Invoice Footer Note"
            name="invoiceFooterNote"
            value={formState.invoiceFooterNote || ''}
            onChange={(e) => onChange('invoiceFooterNote', e.target.value)}
            placeholder="Thank you for shopping with Smart Shopping Cart!"
          />
        </div>
      </Card>

      <Card title="Tax & Discount Calculation Rules" subtitle="Configure system default tax rate and discount ceiling rules.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <Input
              label="Default Tax Rate (%)"
              name="defaultTaxRate"
              type="number"
              step="0.5"
              value={formState.defaultTaxRate ?? ''}
              onChange={(e) => onChange('defaultTaxRate', Number(e.target.value))}
              error={errors.defaultTaxRate}
              leftIcon={Percent}
              placeholder="18.0"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Applicable tax percentage for taxable items (e.g. 18.0% GST).
            </p>
          </div>

          <div>
            <Input
              label="Maximum Discount Limit (%)"
              name="maxDiscountLimit"
              type="number"
              value={formState.maxDiscountLimit ?? ''}
              onChange={(e) => onChange('maxDiscountLimit', Number(e.target.value))}
              leftIcon={Percent}
              placeholder="30.0"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Maximum allowable discount ceiling for promo codes or cart offers.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Enable Automated Tax Calculation</span>
            <Checkbox
              checked={Boolean(formState.enableTax)}
              onChange={(e) => onChange('enableTax', e.target.checked)}
            />
          </div>

          <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Enable Item & Cart Discounts</span>
            <Checkbox
              checked={Boolean(formState.enableDiscounts)}
              onChange={(e) => onChange('enableDiscounts', e.target.checked)}
            />
          </div>

          <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Enable Service & Convenience Charges</span>
            <Checkbox
              checked={Boolean(formState.enableServiceCharges)}
              onChange={(e) => onChange('enableServiceCharges', e.target.checked)}
            />
          </div>
        </div>
      </Card>

      {/* Historical Data Protection Warning */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950 mb-0.5">Historical Transaction Rule</h4>
          <p>
            Modifying billing settings will <span className="font-bold underline">NOT</span> alter historical transaction records, completed receipts, or past ledger totals. Immutable transaction snapshots are stored per completed payment session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
