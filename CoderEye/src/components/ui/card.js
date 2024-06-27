import React from 'react';

export const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b border-gray-200 pb-2 mb-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div>{children}</div>
);