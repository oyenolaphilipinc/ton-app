import React, { useState } from 'react';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-1">
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

const CollapsibleItem = ({fromPrice, toPrice, selectedToken, selectedCoin, amountOut, priceImpact}) => {
  return (
    <div className="container mx-auto py-8">
      <Collapsible title={`${selectedToken ? `1 ${selectedToken.symbol}` : null} ≈ ${(fromPrice/toPrice).toFixed(4)} ${selectedCoin && selectedCoin.symbol} `}>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">{selectedToken ? `1 ${selectedToken.symbol}` : null} </p>
            <p className="text-lg text-gray-500">≈ {fromPrice && toPrice && (fromPrice/toPrice).toFixed(4)} {selectedCoin && selectedCoin.symbol}</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">1 {selectedCoin ? selectedCoin.symbol : null} price</p>
            <p className="text-lg text-gray-500">≈ {fromPrice && toPrice && (toPrice/fromPrice).toFixed(6)} {selectedToken &&selectedToken.symbol }</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">Price impact</p>
            <p className={priceImpact > 1 ? "text-lg text-green-600" : "text-lg text-red-600"}>≈ {priceImpact ? priceImpact.toFixed(2) : '1'}%</p>
        </div>
        <div className="flex justify-between">
            <p className="text-lg text-gray-500">Minimum received</p>
            <p className="text-lg text-gray-500">≈ {amountOut ? amountOut : 0} {selectedCoin && selectedCoin.symbol}</p>
        </div>
      
      </Collapsible>
    </div>
  );
};

export default CollapsibleItem;
