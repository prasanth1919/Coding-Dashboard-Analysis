import React from 'react';

export const Button = ({ children, variant, onClick }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === 'default' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);