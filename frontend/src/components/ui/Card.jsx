import React from 'react';

/**
 * Reusable Card Component with subtle border, shadow, and rounded corners
 */
export const Card = ({
  children,
  className = '',
  header,
  headerAction,
  title,
  subtitle,
  footer,
  padding = 'p-5',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs transition-shadow duration-150 ${className}`}
      {...props}
    >
      {(header || title) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="font-bold text-sm text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            {header}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={padding}>{children}</div>
      {footer && <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 rounded-b-xl text-xs">{footer}</div>}
    </div>
  );
};

export default Card;
