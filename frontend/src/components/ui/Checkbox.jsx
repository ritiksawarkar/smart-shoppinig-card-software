import React, { useId } from 'react';

/**
 * Reusable Accessible Checkbox Component
 */
export const Checkbox = ({
  label,
  checked = false,
  onChange,
  name,
  disabled = false,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = props.id || generatedId;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={checkboxId}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 rounded-xs border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer accent-blue-600"
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="ml-2 text-xs font-medium text-slate-700 select-none cursor-pointer hover:text-slate-900"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
