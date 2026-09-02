import React from 'react';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Bell, Mail, Smartphone, AlertTriangle, Layers } from 'lucide-react';

export const NotificationSettings = ({ formState, onChange, errors }) => {
  const channels = formState.channels || { inApp: true, email: true, sms: false, push: false };

  const handleChannelChange = (channelKey, value) => {
    onChange('channels', {
      ...channels,
      [channelKey]: value,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Alert Event Triggers */}
      <Card title="System Alert Subscriptions" subtitle="Configure automated notifications for critical shopping cart operational events.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Low Inventory Stock Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Triggers when product inventory breaches reorder level.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.lowStockAlerts)}
              onChange={(e) => onChange('lowStockAlerts', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Weight Verification Mismatch Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Triggers when load-cell detects item weight variance.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.weightVerificationAlerts)}
              onChange={(e) => onChange('weightVerificationAlerts', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Payment Gateway Failure Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Notifies admin of declined or timed-out transactions.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.paymentFailureAlerts)}
              onChange={(e) => onChange('paymentFailureAlerts', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Cart Disconnection Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Triggers when physical cart drops Wi-Fi/MQTT connection.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.cartDisconnectionAlerts)}
              onChange={(e) => onChange('cartDisconnectionAlerts', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Sensor & Hardware Error Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Triggers on load-cell ADC drift or scanner fault.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.sensorErrorAlerts)}
              onChange={(e) => onChange('sensorErrorAlerts', e.target.checked)}
            />
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Daily Analytics Summary</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Sends daily sales and verification summary to admin.</p>
            </div>
            <Checkbox
              checked={Boolean(formState.dailyReportNotifications)}
              onChange={(e) => onChange('dailyReportNotifications', e.target.checked)}
            />
          </div>
        </div>
      </Card>

      {/* Notification Delivery Channels */}
      <Card title="Notification Delivery Channels" subtitle="Manage delivery endpoints for system notifications.">
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">In-App Header Toast & Dashboard Alerts</h4>
                <p className="text-[11px] text-slate-500">Real-time alert banner inside admin portal header.</p>
              </div>
            </div>
            <Checkbox
              checked={Boolean(channels.inApp)}
              onChange={(e) => handleChannelChange('inApp', e.target.checked)}
            />
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Email Dispatch</h4>
                <p className="text-[11px] text-slate-500">Send instant alert emails to administrator mailbox.</p>
              </div>
            </div>
            <Checkbox
              checked={Boolean(channels.email)}
              onChange={(e) => handleChannelChange('email', e.target.checked)}
            />
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between opacity-60">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-300 text-slate-600 rounded-lg">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-800">SMS Gateway Dispatch</h4>
                  <Badge variant="secondary">Backend Integration Required</Badge>
                </div>
                <p className="text-[11px] text-slate-500">Requires Twilio/SMS gateway API configuration on server.</p>
              </div>
            </div>
            <Checkbox checked={false} disabled />
          </div>
        </div>

        {channels.email && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <Input
              label="Alert Email Recipient Address"
              name="alertEmailRecipient"
              type="email"
              value={formState.alertEmailRecipient || ''}
              onChange={(e) => onChange('alertEmailRecipient', e.target.value)}
              leftIcon={Mail}
              placeholder="alerts@hypermart-shopping.com"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationSettings;
