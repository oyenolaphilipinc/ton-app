import React, { useState } from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between border-b-2 pb-1">
        <div className="">
            <h1 className="flex text-xl font-bold ml-2 mt-1"><img src={"/log.png"} width={40} height={40} className="rounded-full" /><span className="mt-2 ml-1 hidden md:flex">Speedy Swap</span></h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Navigation Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'swap'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab('liquidity')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'liquidity'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Liquidity
            </button>
          </div>
          <TonConnectButton />
        </div>
    </div>
  )
}

export default Navbar