import React, { useState } from 'react';
export const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue); // Ensure onValueChange is defined and callable
    }
    setIsOpen(false);
  };

  return (
    <div className="select">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>{value || 'Select'}</SelectValue> {/* Ensure value is not undefined */}
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onClick: () => handleItemClick(child.props.value) })
          )}
        </SelectContent>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, onClick }) => (
  <div className="select-trigger" onClick={onClick}>
    {children}
  </div>
);

export const SelectValue = ({ children }) => (
  <div className="select-value">
    {children}
  </div>
);

export const SelectContent = ({ children }) => (
  <div className="select-content">
    {children}
  </div>
);

export const SelectItem = ({ value, children, onClick }) => (
  <div className="select-item" onClick={onClick} value={value}>
    {children}
  </div>
);
