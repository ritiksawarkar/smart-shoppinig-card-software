import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { CreditCard, QrCode, Banknote, ShieldAlert, Lock, Timer } from 'lucide-react';

export const PaymentSettings = ({ formState, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Active Payment Modes */}
      <Card title="Active Payment Gateway Modes" subtitle="Enable or disable supported checkout payment methods.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${formState.upiEnabled ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${formState.upiEnabled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">UPI Instant Payment</h4>
                <p className="text-[11px] text-slate-500">QR Code / Dynamic VPA</p>
              </div>
            </div>
            <Checkbox
              checked={Boolean(formState.upiEnabled)}
              onChange={(e) => onChange('upiEnabled', e.target.checked)}
            />
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${formState.cardEnabled ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${formState.cardEnabled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Credit / Debit Card</h4>
                <p className="text-[11px] text-slate-500">POS & Chip Reader</p>
              </div>
            </div>
            <Checkbox
              checked={Boolean(formState.cardEnabled)}
              onChange={(e) => onChange('cardEnabled', e.target.checked)}
            />
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${formState.cashEnabled ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${formState.cashEnabled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <Banknote className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Cash Counter</h4>
                <p className="text-[11px] text-slate-500">Manual POS Operator</p>
              </div>
            </div>
            <Checkbox
              checked={Boolean(formState.cashEnabled)}
              onChange={(e) => onChange('cashEnabled', e.target.checked)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-100">
          <Select
            label="Default Selected Payment Method"
            name="defaultPaymentMethod"
            value={formState.defaultPaymentMethod || 'UPI'}
            onChange={(e) => onChange('defaultPaymentMethod', e.target.value)}
            options={[
              { value: 'UPI', label: 'UPI (Dynamic QR Code)' },
              { value: 'Card', label: 'Credit / Debit Card' },
              { value: 'Cash', label: 'Cash at Checkout Desk' },
            ]}
          />

          <Input
            label="Payment Session Timeout (seconds)"
            name="paymentTimeout"
            type="number"
            value={formState.paymentTimeout ?? ''}
            onChange={(e) => onChange('paymentTimeout', Number(e.target.value))}
            error={errors.paymentTimeout}
            leftIcon={Timer}
            required
            placeholder="120"
          />

          <Input
            label="Payment Confirmation Timeout (seconds)"
            name="paymentConfirmationTimeout"
            type="number"
            value={formState.paymentConfirmationTimeout ?? ''}
            onChange={(e) => onChange('paymentConfirmationTimeout', Number(e.target.value))}
            placeholder="30"
          />

          <Input
            label="Payment Retry Limit"
            name="paymentRetryLimit"
            type="number"
            value={formState.paymentRetryLimit ?? ''}
            onChange={(e) => onChange('paymentRetryLimit', Number(e.target.value))}
            error={errors.paymentRetryLimit}
            placeholder="2"
          />
        </div>
      </Card>

      {/* Gateway Provider Configuration */}
      <Card title="Payment Gateway Provider Environment" subtitle="Safe provider configuration metadata.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Processing Environment
            </label>
            <div className="flex items-center gap-3">
              <Select
                name="environment"
                value={formState.environment || 'Test'}
                onChange={(e) => onChange('environment', e.target.value)}
                options={[
                  { value: 'Test', label: 'Test / Sandbox Environment' },
                  { value: 'Production', label: 'Production (Live Real Transactions)' },
                ]}
              />
              <Badge variant={formState.environment === 'Production' ? 'danger' : 'warning'}>
                {formState.environment || 'Test'}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Switching to Production requires admin confirmation modal before enabling backend live keys.
            </p>
          </div>

          <Input
            label="Merchant Account ID"
            name="merchantId"
            value={formState.merchantId || ''}
            disabled
            rightElement={
              <span className="text-xs text-slate-400 font-mono px-2 py-1 bg-slate-100 rounded-md">Masked</span>
            }
          />
        </div>

        {/* Security Warning */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs flex items-start gap-3 shadow-md">
          <Lock className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-0.5">Strict Security Standard: Zero Secret Key Exposure</h4>
            <p className="text-slate-300">
              API secret keys, private credentials, webhook secrets, customer UPI PINs, and card numbers are <span className="text-amber-400 font-bold">NEVER</span> stored or exposed in frontend state or browser storage. All gateway authentication is executed exclusively server-side via backend environment variables.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSettings;
