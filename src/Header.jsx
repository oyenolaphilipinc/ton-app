import React from 'react'
import { RefreshCcw } from 'lucide-react';
import { LineChart } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ArrowRightLeft } from 'lucide-react';

const Header = () => {
  return (
    <div className="mt-2 md:w-4/12 mx-auto md:mt-16">
        <div className="flex justify-around pb-2">
            <h1 className="text-md mr-36 md:text-2xl font-semibold md:font-normal">Swap tokens</h1>
            <div className='flex mt-1 gap-3'>
                <RefreshCcw className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md'/>
                <LineChart className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md text-gray-400'/>
                <Ellipsis className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md'/>
            </div>
        </div><hr/>
        <div className="pt-4">
            <div className="flex justify-between">
                <p className="font-lighter ml-2 text-gray-700">You Send</p>
                <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>0</p>
            </div>
            <div className="mt-2 ml-2 flex justify-between">
                <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer"><img src={"/tons.png"} width={40} height={40} className="rounded-full mr-1" /><span className="mt-1 text-3xl">TON</span><ChevronRight className="mt-2" /></h1>
                <h1 className="text-3xl text-gray-400 mr-1">0.00</h1>
            </div>
            <p className="text-right mr-1 text-gray-500 pb-4 md:pb-8">$0</p><hr/>
            <div className="pt-8 md:pt-12">
            <div className="flex justify-between">
            <p className="font-lighter ml-2 text-gray-700">You receive</p>
            <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>0</p>
        </div>
        <div className="mt-2 ml-2 flex justify-between">
            <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer"><img src={"/log.png"} width={40} height={40} className="rounded-full mr-1" /><span className="mt-1 text-3xl">STON</span><ChevronRight className="mt-2" /></h1>
            <h1 className="text-3xl text-gray-400 mr-1">0.00</h1>
        </div>
        <p className="text-right mr-1 text-gray-500 pb-4 md:pb-12">$0</p><hr/>
        <button className="w-10/12 mt-4 border bg-gray-200 px-4 py-3 rounded-xl ml-8 text-gray-600">Enter an amount</button>
            </div>
        </div>
    </div>
  )
}

export default Header