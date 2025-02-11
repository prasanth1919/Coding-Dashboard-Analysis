import React from 'react';

export const Progress = ({ value, max }) => (
  <div className="relative pt-1">
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
      <div
        style={{ width: `${(value / max) * 100}% `}}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
      ></div>
    </div>
  </div>
);