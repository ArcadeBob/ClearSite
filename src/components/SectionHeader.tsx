import React from 'react';

type SectionHeaderVariant = 'left-bar' | 'banner' | 'overlapping';

interface SectionHeaderProps {
  subheading: string;
  title: string;
  description?: React.ReactNode;
  subheadingColor?: string;
  titleSize?: 'sm' | 'lg';
  variant?: SectionHeaderVariant;
  className?: string;
}

export function SectionHeader({
  subheading,
  title,
  description,
  subheadingColor = 'text-accent',
  titleSize = 'lg',
  variant = 'left-bar',
  className = '',
}: SectionHeaderProps) {
  const sizeClasses =
    titleSize === 'sm'
      ? 'text-2xl md:text-3xl'
      : 'text-3xl md:text-4xl';

  if (variant === 'banner') {
    return (
      <div className={`bg-brand py-10 px-6 -mx-4 sm:-mx-6 lg:-mx-8 ${className}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
            {subheading}
          </p>
          <h2 className={`font-heading text-white uppercase tracking-wide ${sizeClasses}`}>
            {title}
          </h2>
          {description && (
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'overlapping') {
    return (
      <div className={`relative ${className}`}>
        <h2
          className="font-heading text-5xl md:text-7xl text-brand/10 uppercase tracking-wide absolute -top-8 left-0 select-none pointer-events-none"
          aria-hidden="true"
        >
          {title}
        </h2>
        <div className="relative pt-6">
          <h2 className={`font-heading text-brand uppercase tracking-wide ${sizeClasses}`}>
            {title}
          </h2>
          {description && (
            <p className="text-lg text-slate-600 max-w-2xl mt-4">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: left-bar variant
  return (
    <div className={`border-l-4 border-accent pl-6 ${className}`}>
      <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
        {subheading}
      </p>
      <h2 className={`font-heading text-brand uppercase tracking-wide ${sizeClasses}`}>
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-600 max-w-2xl mt-4">
          {description}
        </p>
      )}
    </div>
  );
}
