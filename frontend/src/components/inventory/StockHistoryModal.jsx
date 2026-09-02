import React from 'react';
import { Modal } from '../ui/Modal';
import { History, TrendingUp, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const StockHistoryModal = ({ isOpen, onClose, product, historyLogs = [] }) => {
  if (!isOpen || !product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stock Movement History & Audit Trail"
      subtitle={`Auditable stock changes for ${product.name}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Product Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-white text-sm">{product.name}</div>
            <div className="text-slate-400 font-mono mt-0.5">
              ID: {product.productId} &bull; Barcode: {product.barcode}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Current Stock</div>
            <div className="text-lg font-extrabold text-blue-400">{product.currentStock} units</div>
          </div>
        </div>

        {/* History Movement Timeline */}
        {historyLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            <History className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            No stock movements recorded for this item yet.
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Audit Logs ({historyLogs.length})
            </div>

            {historyLogs.map((log) => {
              const isPositive = log.changeType === 'positive' || log.change.startsWith('+');

              return (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isPositive
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-100 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{log.reason || log.movementType}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          {log.reference}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Stock Changed: <span className="font-semibold text-slate-800">{log.previousStock}</span> &rarr;{' '}
                        <span className="font-bold text-slate-900">{log.newStock} units</span>
                      </div>
                      {log.notes && (
                        <div className="text-[11px] text-slate-600 italic mt-1 bg-white p-1.5 rounded border border-slate-200">
                          "{log.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`font-black text-sm ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {log.change}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Close */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StockHistoryModal;
