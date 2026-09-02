import React from 'react';
import { Drawer } from '../ui/Drawer';
import { VerificationStatusBadge } from './VerificationStatusBadge';
import { WeightComparisonCard } from './WeightComparisonCard';
import { Button } from '../ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { formatWeight } from '../../utils/formatWeight';
import { Scale, AlertTriangle, CheckCircle2, ShieldCheck, ScanBarcode, History, Clock } from 'lucide-react';

export const WeightVerificationDetailsDrawer = ({
  isOpen,
  onClose,
  record,
  onOpenResolutionModal,
}) => {
  if (!isOpen || !record) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Weight Verification Telemetry: ${record.cartId}`}
      subtitle={`Record ID: ${record.id} • Session ID: ${record.sessionId}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Session Metadata Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cart & Session Identification</div>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-400" />
              <span>{record.cartId}</span>
              <span className="text-slate-400 font-mono font-normal">({record.sessionId})</span>
            </div>
            <div className="text-slate-400 mt-1">
              Scanned Items: <span className="font-semibold text-white">{record.itemCount} items</span>
            </div>
          </div>

          <div>
            <VerificationStatusBadge status={record.status} />
          </div>
        </div>

        {/* Telemetry Comparison Panel */}
        <WeightComparisonCard
          expectedWeight={record.expectedWeight}
          actualWeight={record.actualWeight}
          difference={record.difference}
          tolerance={record.tolerance}
          status={record.status}
        />

        {/* Warning Banner & Resolution Action */}
        {record.status === 'Verification Required' && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-amber-900 text-sm">Weight Mismatch Detected</div>
                <div className="text-amber-800 mt-1 leading-relaxed">
                  {record.mismatchExplanation ||
                    'Physical load cell reading differs from calculated catalog expected weight.'}
                </div>
                <div className="text-[11px] text-amber-700 mt-1.5 font-medium">
                  Possible causes: Product packaging variation, physical item present without digital scan, or load cell calibration noise.
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenResolutionModal(record)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs gap-1.5 shadow-2xs"
              >
                <ShieldCheck className="h-4 w-4" />
                Resolve Verification Mismatch
              </Button>
            </div>
          </div>
        )}

        {/* Resolution Record Summary (if resolved) */}
        {record.status === 'Resolved' && record.resolution && (
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span>Resolved Mismatch Record</span>
            </div>
            <div className="text-indigo-800">
              Reason: <span className="font-semibold">{record.resolution.reason}</span>
            </div>
            {record.resolution.notes && (
              <div className="text-slate-600 italic bg-white p-2 rounded border border-indigo-100 mt-1">
                "{record.resolution.notes}"
              </div>
            )}
            <div className="text-[10px] text-indigo-600 mt-1">
              Resolved by {record.resolution.resolvedBy} at {new Date(record.resolution.resolvedAt).toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Sensor Error Warning */}
        {record.status === 'Sensor Error' && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              <span>Sensor Communication Error</span>
            </div>
            <p className="text-rose-700">
              Unable to obtain a reliable load cell measurement. Cart load cell controller reported zero reading or timeout.
            </p>
          </div>
        )}

        {/* Scanned Cart Catalog Items Breakdown Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Scanned Cart Items ({record.items?.length || 0})</span>
            <span className="text-[11px] font-mono text-slate-400 font-normal">Weights from Product Master</span>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell>Product</TableHeadCell>
                  <TableHeadCell className="text-center">Qty</TableHeadCell>
                  <TableHeadCell className="text-right">Unit Wt</TableHeadCell>
                  <TableHeadCell className="text-right">Total Exp. Wt</TableHeadCell>
                  <TableHeadCell className="text-right">Unit Price</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {record.items?.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{item.productName}</div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 mt-0.5">
                          <ScanBarcode className="h-3 w-3" />
                          {item.barcode}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-bold text-slate-800 text-xs">
                      {item.quantity}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-700 text-xs">
                      {formatWeight(item.unitWeight)}
                    </TableCell>

                    <TableCell className="text-right font-bold text-slate-900 text-xs">
                      {formatWeight(item.expectedWeight)}
                    </TableCell>

                    <TableCell className="text-right font-medium text-slate-700 text-xs">
                      ₹{item.unitPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Audit Timeline Log */}
        {record.timeline && record.timeline.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <History className="h-4 w-4 text-slate-400" />
              <span>Verification Audit Log Timeline</span>
            </div>

            <div className="space-y-2">
              {record.timeline.map((event, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{event.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{event.description}</div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Close */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Telemetry
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default WeightVerificationDetailsDrawer;
