import React from 'react';

interface SectionHeaderProps {
  subheading: string;
  title: string;
  description?: React.ReactNode;
  subheadingColor?: string;
  titleSize?: 'sm' | 'lg';
  className?: string;
}

export function SectionHeader({
  subheading,
  title,
  description,
  subheadingColor = 'text-accent',
  titleSize = 'lg',
  className = '',
}: SectionHeaderProps) {
  const titleClasses =
    titleSize === 'sm'
      ? 'text-2xl md:text-3xl font-bold text-slate-900'
      : 'text-3xl md:text-4xl font-bold text-slate-900 mb-4';

  return (
    <div className={`text-center ${className}`}>
      <p className={`text-sm font-semibold ${subheadingColor} uppercase tracking-wider mb-2`}>
        {subheading}
      </p>
      <h2 className={titleClasses}>
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
