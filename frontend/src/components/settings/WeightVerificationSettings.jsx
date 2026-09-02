import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Scale, Cpu, AlertTriangle, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WeightVerificationSettings = ({
  formState,
  onChange,
  errors,
  onCalibrateSensor,
  saving,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Primary Toggle Card */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-1">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl shrink-0">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Load-Cell Weight Verification System</h3>
                <Badge variant={formState.enabled ? 'success' : 'danger'}>
                  {formState.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Compares real-time physical weight from cart load-cell sensors against cumulative expected item weight from product catalog.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Checkbox
              label={formState.enabled ? 'Verification Enabled' : 'Verification Disabled'}
              checked={Boolean(formState.enabled)}
              onChange={(e) => onChange('enabled', e.target.checked)}
            />
          </div>
        </div>
      </Card>

      {/* Tolerance & Verification Parameters */}
      <Card title="Sensor Tolerance & Threshold Rules" subtitle="Configure allowable weight variance to accommodate packaging noise and sensor drift.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Input
              label="Absolute Weight Tolerance (g)"
              name="absoluteTolerance"
              type="number"
              value={formState.absoluteTolerance ?? ''}
              onChange={(e) => onChange('absoluteTolerance', Number(e.target.value))}
              error={errors.absoluteTolerance}
              required
              placeholder="10"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Fixed allowable variance limit in grams (e.g. ±10 g for light items).
            </p>
          </div>

          <div>
            <Input
              label="Percentage Weight Tolerance (%)"
              name="percentageTolerance"
              type="number"
              step="0.1"
              value={formState.percentageTolerance ?? ''}
              onChange={(e) => onChange('percentageTolerance', Number(e.target.value))}
              error={errors.percentageTolerance}
              required
              placeholder="2.0"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Relative allowable variance percentage for bulk items (e.g. ±2.0%).
            </p>
          </div>

          <Select
            label="Verification Tolerance Mode"
            name="verificationMode"
            value={formState.verificationMode || 'Combined (Max of Absolute & Percentage)'}
            onChange={(e) => onChange('verificationMode', e.target.value)}
            options={[
              { value: 'Combined (Max of Absolute & Percentage)', label: 'Combined: max(Absolute, Expected × Percentage)' },
              { value: 'Absolute Only', label: 'Absolute Only (Fixed ±g)' },
              { value: 'Percentage Only', label: 'Percentage Only (Fixed ±%)' },
            ]}
          />

          <Input
            label="Minimum Weight Threshold (g)"
            name="minimumWeightThreshold"
            type="number"
            value={formState.minimumWeightThreshold ?? ''}
            onChange={(e) => onChange('minimumWeightThreshold', Number(e.target.value))}
            error={errors.minimumWeightThreshold}
            required
            placeholder="20"
          />

          <Input
            label="Sensor Stabilization Time (ms)"
            name="stabilizationTime"
            type="number"
            value={formState.stabilizationTime ?? ''}
            onChange={(e) => onChange('stabilizationTime', Number(e.target.value))}
            error={errors.stabilizationTime}
            required
            placeholder="1000"
          />

          <Input
            label="Number of Stable Readings Required"
            name="stableReadings"
            type="number"
            value={formState.stableReadings ?? ''}
            onChange={(e) => onChange('stableReadings', Number(e.target.value))}
            error={errors.stableReadings}
            required
            placeholder="3"
          />
        </div>

        {/* Math Formula Callout */}
        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-mono">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 font-sans" />
            Backend Verification Rule Formula:
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-blue-900 font-bold">
            allowedDifference = max( absoluteTolerance, expectedWeight × (percentageTolerance / 100) )
          </div>
          <p className="text-[11px] text-slate-500 font-sans mt-2 font-normal">
            The backend verification engine evaluates whether physical cart weight falls within <span className="font-bold">[expectedWeight - allowedDifference, expectedWeight + allowedDifference]</span>.
          </p>
        </div>
      </Card>

      {/* Hardware Telemetry & Sensor Calibration */}
      <Card title="Hardware Sensor Telemetry & Calibration" subtitle="Read-only status from load-cell ADC controller with on-demand calibration trigger.">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sensor Status</span>
            <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{formState.sensorStatus || 'Connected'}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sensor Hardware</span>
            <div className="text-sm font-bold text-slate-900 mt-1 truncate">
              {formState.sensorType || 'HX711 ADC Load Cell'}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Load Cell Capacity</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {formState.loadCellCapacity || 50} kg max
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sampling Interval</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {formState.samplingInterval || 200} ms
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Calibration State</span>
            <div className="text-sm font-bold text-emerald-700 mt-1">
              {formState.calibrationStatus || 'Calibrated'}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Calibration</span>
            <div className="text-xs font-bold text-slate-800 mt-1">
              {formState.lastCalibration ? new Date(formState.lastCalibration).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '25 Aug 2026'}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Zero-Point Sensor Calibration</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Initiates hardware tare calibration routine on load cells via backend hardware service.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCalibrateSensor}
            loading={saving}
            loadingText="Calibrating..."
            className="shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${saving ? 'animate-spin' : ''}`} />
            Calibrate Sensor Array
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WeightVerificationSettings;
