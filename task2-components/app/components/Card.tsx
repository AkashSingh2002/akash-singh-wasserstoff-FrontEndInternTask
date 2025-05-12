'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

const variantStyles = {
  default: 'bg-white shadow-md',
  elevated: 'bg-white shadow-xl',
  outlined: 'bg-white border border-gray-200 shadow-sm',
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  header,
  footer,
  variant = 'default',
  className = '',
  ...props
}) => {
  const cardClasses = [
    'rounded-lg p-6 w-full max-w-md',
    variantStyles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {header}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      {children && (
        <div className="space-y-4">
          {children}
        </div>
      )}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;