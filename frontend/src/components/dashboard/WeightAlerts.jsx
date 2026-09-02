import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const WeightAlerts = ({ alerts = [] }) => {
  const navigate = useNavigate();

  return (
    <Card
      title="Weight Verification Alerts"
      subtitle="Load cell sensor physical weight audit status"
      headerAction={
        <Badge variant="error" size="sm">
          {alerts.filter((a) => a.status === 'Mismatch').length} Mismatches
        </Badge>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Sensor tolerance audit</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/weight-verification')}
            className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
          >
            View Weight Verification <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
          </Button>
        </div>
      }
    >
      {alerts.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          <Scale className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          All active carts are currently verified.
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.slice(0, 3).map((item) => {
            const isMismatch = item.status === 'Mismatch';

            return (
              <div
                key={item.cartId}
                className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                  isMismatch
                    ? 'bg-rose-50/50 border-rose-200/80 hover:bg-rose-50'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isMismatch ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {isMismatch ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>Cart {item.cartId}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{item.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Expected: <span className="font-semibold text-slate-800">{item.expectedWeightKg} kg</span> &bull; Actual: <span className="font-semibold text-slate-800">{item.actualWeightKg} kg</span>
                    </div>
                    {isMismatch && (
                      <div className="text-[10px] font-bold text-rose-600 mt-0.5">
                        Diff: +{item.differenceKg} kg (Verification required)
                      </div>
                    )}
                  </div>
                </div>

                <Badge variant={isMismatch ? 'error' : 'success'} size="sm">
                  {item.status}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default WeightAlerts;
