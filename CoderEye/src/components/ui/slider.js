import React from 'react';

export const Slider = ({ value, onChange }) => (
  <input
    type="range"
    min="0"
    max="100"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="slider"
  />
);