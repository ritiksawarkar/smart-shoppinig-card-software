import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const ActiveCartsCard = ({ carts = [] }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Verified':
        return 'success';
      case 'Checking':
        return 'warning';
      case 'Mismatch':
        return 'error';
      case 'Payment Pending':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <Card
      title="Active Carts"
      subtitle="Currently active shopping carts in store"
      headerAction={
        <Badge variant="info" size="sm">
          {carts.length} Active
        </Badge>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Real-time floor telemetry</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/carts')}
            className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
          >
            View All Carts <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
          </Button>
        </div>
      }
    >
      {carts.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          <ShoppingCart className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          No active carts right now.
        </div>
      ) : (
        <div className="space-y-3">
          {carts.slice(0, 4).map((cart) => (
            <div
              key={cart.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-800 shadow-2xs">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">{cart.id}</div>
                  <div className="text-[11px] text-slate-500">
                    {cart.itemsCount} items &bull; <span className="font-semibold text-slate-700">₹{cart.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <Badge variant={getStatusVariant(cart.status)} size="sm" dot>
                {cart.status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ActiveCartsCard;
