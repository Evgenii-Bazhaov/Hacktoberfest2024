import React from 'react';

export const Alert = ({ className, children }) => {
  return (
    <div className={`bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h3 className="font-bold">{children}</h3>
);

export const AlertDescription = ({ children }) => (
  <div className="mt-2">{children}</div>
);
