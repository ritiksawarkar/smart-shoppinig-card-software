import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const ConnectionStatusBadge = ({ status }) => {
  const isConnected = status === 'Connected';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
        isConnected
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-100 text-slate-600 border-slate-300'
      }`}
    >
      {isConnected ? (
        <Wifi className="h-3 w-3 text-emerald-600" />
      ) : (
        <WifiOff className="h-3 w-3 text-slate-400" />
      )}
      <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
    </span>
  );
};

export default ConnectionStatusBadge;
