import React from 'react';

export const Table = ({ children }) => (
  <table className="min-w-full bg-white">{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }) => (
  <tr className="whitespace-no-wrap border-b border-gray-200">{children}</tr>
);

export const TableHead = ({ children }) => (
  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {children}
  </th>
);

export const TableCell = ({ children }) => (
  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{children}</td>
);