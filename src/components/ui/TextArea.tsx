import React from 'react';
interface TextAreaProps extends
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function TextArea({
  label,
  error,
  className = '',
  id,
  ...props
}: TextAreaProps) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700 mb-1">

          {label}
        </label>
      }
      <textarea
        id={inputId}
        className={`
          flex min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props} />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>);

}