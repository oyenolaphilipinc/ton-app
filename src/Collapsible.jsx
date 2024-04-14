import React, { useState } from 'react';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div
        className="flex justify-between items-center p-1 cursor-pointer"
        onClick={toggleCollapsible}
      >
        <h2 className="text-lg text-gray-500">{title}</h2>
        <svg
          className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </div>
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

const CollapsibleItem = () => {
  return (
    <div className="container mx-auto py-8">
      <Collapsible title="1 Ton ≈ 0.253467882663 STON">
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">1 TON Price</p>
            <p className="text-lg text-gray-500">≈ 0.239148991 STON</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">1 STON price</p>
            <p className="text-lg text-gray-500">≈ 0.239148991 STON</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">Price impact</p>
            <p className="text-lg text-green-600">≈ 0.01%</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">Minimum received</p>
            <p className="text-lg text-gray-500">≈ 23.7985 STON</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">Blockchain fee</p>
            <p className="text-lg text-gray-500">≈ 0.08-0.3 TON</p>
        </div>
      </Collapsible>
    </div>
  );
};

export default CollapsibleItem;
