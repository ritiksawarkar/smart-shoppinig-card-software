import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Boxes, ArrowRight, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const LowStockProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  return (
    <Card
      title="Low Stock Products"
      subtitle="Items below inventory warning threshold"
      headerAction={
        <Badge variant="warning" size="sm">
          {products.length} Attention Required
        </Badge>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Auto threshold monitoring</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/inventory')}
            className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
          >
            View Inventory <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
          </Button>
        </div>
      }
    >
      {products.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          <Boxes className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          Inventory levels look good.
        </div>
      ) : (
        <div className="space-y-2.5">
          {products.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-xs text-amber-700 shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-slate-900 truncate">{item.name}</div>
                  <div className="text-[11px] text-slate-500">
                    Stock: <span className="font-bold text-slate-900">{item.stock}</span> / Threshold: {item.threshold}
                  </div>
                </div>
              </div>

              <Badge variant={item.status === 'Critical' ? 'error' : 'warning'} size="sm">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default LowStockProducts;
