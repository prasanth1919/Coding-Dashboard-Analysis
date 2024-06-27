import React from 'react';

export const Badge = ({ children, variant, className }) => (
  <span
    className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
      variant === 'secondary' ? 'bg-gray-200 text-gray-800' : ''
    } ${className}`}
  >
    {children}
  </span>
);