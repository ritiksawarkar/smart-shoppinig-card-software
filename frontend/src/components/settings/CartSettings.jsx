import React from 'react';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ShoppingCart, Timer, ShieldAlert, Cpu, Lock } from 'lucide-react';

export const CartSettings = ({ formState, onChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <Card title="Smart Cart Capacity & Session Parameters" subtitle="Configure cart session lifetimes, connection timeouts, and monitoring toggles.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Registered Smart Carts</h4>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{formState.totalSmartCarts || 45} Active Hardware Carts</p>
              </div>
            </div>
            <Badge variant="success">Backend Monitored</Badge>
          </div>

          <div>
            <Input
              label="Cart Session Timeout (seconds)"
              name="sessionTimeout"
              type="number"
              value={formState.sessionTimeout || ''}
              onChange={(e) => onChange('sessionTimeout', Number(e.target.value))}
              error={errors.sessionTimeout}
              required
              leftIcon={Timer}
              placeholder="1800"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Maximum total duration for an active shopping session before requiring re-scan (e.g. 1800s = 30 mins).
            </p>
          </div>

          <div>
            <Input
              label="Cart Inactivity Timeout (seconds)"
              name="inactivityTimeout"
              type="number"
              value={formState.inactivityTimeout || ''}
              onChange={(e) => onChange('inactivityTimeout', Number(e.target.value))}
              error={errors.inactivityTimeout}
              required
              leftIcon={Timer}
              placeholder="600"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Duration of cart idle state (no scan or weight event) before flagging idle warning (e.g. 600s = 10 mins).
            </p>
          </div>

          <div>
            <Input
              label="Scanner Connection Timeout (seconds)"
              name="scannerTimeout"
              type="number"
              value={formState.scannerTimeout || ''}
              onChange={(e) => onChange('scannerTimeout', Number(e.target.value))}
              error={errors.scannerTimeout}
              required
              leftIcon={Cpu}
              placeholder="15"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Maximum allowable heartbeat delay for barcode scanner module response.
            </p>
          </div>

          <div>
            <Input
              label="Sensor Connection Timeout (seconds)"
              name="sensorTimeout"
              type="number"
              value={formState.sensorTimeout || ''}
              onChange={(e) => onChange('sensorTimeout', Number(e.target.value))}
              error={errors.sensorTimeout}
              required
              leftIcon={Cpu}
              placeholder="10"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Maximum allowable heartbeat delay for load-cell ADC weight sensor payload.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Cart Identification & Naming Convention" subtitle="System prefix format for registering new physical carts.">
        <div className="space-y-3">
          <Input
            label="Cart ID Format"
            name="cartIdFormat"
            value={formState.cartIdFormat || 'CART-{NUMBER}'}
            disabled
            rightElement={
              <span className="text-xs text-slate-400 font-mono px-2 py-1 bg-slate-100 rounded-md">Read-Only</span>
            }
          />
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">ID Format Protection:</span> Changing Cart ID formatting affects only future hardware cart registration via backend microservice. Existing registered IDs (e.g. <span className="font-mono font-bold">CART-014</span>) remain unmodified to preserve historical transaction integrity.
            </div>
          </div>
        </div>
      </Card>

      <Card title="Cart Session Business Rules" subtitle="Automated workflow enforcement rules for cart lifecycle.">
        <div className="space-y-4">
          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Auto-Close Inactive Session</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Automatically terminate and reset cart session when inactivity timeout threshold is breached.
              </p>
            </div>
            <Checkbox
              checked={Boolean(formState.autoCloseInactiveSession)}
              onChange={(e) => onChange('autoCloseInactiveSession', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Require Final Weight Verification</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Block payment initiation until physical load-cell weight matches cumulative item expected catalog weight.
              </p>
            </div>
            <Checkbox
              checked={Boolean(formState.requireFinalVerification)}
              onChange={(e) => onChange('requireFinalVerification', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Require Payment Confirmation Before Cart Unlock</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Keep shopping cart security gate locked until gateway returns positive payment confirmation status.
              </p>
            </div>
            <Checkbox
              checked={Boolean(formState.requirePaymentConfirmation)}
              onChange={(e) => onChange('requirePaymentConfirmation', e.target.checked)}
            />
          </div>
        </div>

        <div className="mt-5 p-3.5 bg-blue-50/80 border border-blue-200/60 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Backend Enforcement:</span> These rules are enforced directly by the backend cart session engine. Frontend options configure business rule flags on backend.
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartSettings;
