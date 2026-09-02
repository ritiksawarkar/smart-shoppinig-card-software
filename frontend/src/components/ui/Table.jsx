import React from 'react';

/**
 * Reusable Responsive Table Container
 */
export const Table = ({ children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200/80">
      <table className={`w-full text-left text-xs border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`bg-slate-50 text-slate-600 font-semibold border-b border-slate-200/80 uppercase tracking-wider text-[11px] ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return <tbody className={`divide-y divide-slate-100 bg-white ${className}`}>{children}</tbody>;
};

export const TableRow = ({ children, className = '', onClick }) => {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors hover:bg-slate-50/80 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
};

export const TableHeadCell = ({ children, className = '' }) => {
  return <th className={`px-3.5 py-3 font-semibold text-slate-700 whitespace-nowrap ${className}`}>{children}</th>;
};

export const TableCell = ({ children, className = '' }) => {
  return <td className={`px-3.5 py-3 text-slate-700 whitespace-nowrap ${className}`}>{children}</td>;
};

export default Table;
