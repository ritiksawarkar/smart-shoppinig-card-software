import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction, ShoppingCart, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const PlaceholderPage = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title={title}
        description={description || `Manage ${title.toLowerCase()} for your smart supermarket deployment.`}
      />

      <Card padding="p-8 sm:p-12">
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Construction className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">{title} Module</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This operational module is prepared in the routing architecture and ready for backend REST API data binding.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-600 space-y-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Smart Shopping Cart System Integration</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Live floor barcode scanners, weight load cells, and digital checkout endpoints are linked to this route target.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
