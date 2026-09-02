import React from 'react';
import { RefreshCw, Save, RotateCcw, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export const SettingsHeader = ({
  title,
  description,
  isDirty,
  saving,
  readOnly = false,
  onSave,
  onDiscard,
  onRefresh,
  updatedAt,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
          {isDirty && (
            <Badge variant="warning" className="animate-pulse">
              Unsaved Changes
            </Badge>
          )}
          {readOnly && <Badge variant="secondary">Read-Only Section</Badge>}
        </div>
        {description && <p className="text-xs text-slate-500 mt-1 max-w-xl">{description}</p>}
        {updatedAt && (
          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            Backend synchronized: {new Date(updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5 flex-wrap shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={saving}
          title="Reload configuration from backend"
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${saving ? 'animate-spin' : ''}`} />
          Refresh
        </Button>

        {!readOnly && isDirty && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            disabled={saving}
            className="text-slate-600 hover:text-rose-600"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Discard
          </Button>
        )}

        {!readOnly && (
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            loading={saving}
            disabled={!isDirty || saving}
            loadingText="Saving..."
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default SettingsHeader;
