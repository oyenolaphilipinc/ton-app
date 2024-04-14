import React, { useState } from 'react';
import { RefreshCcw, LineChart, Ellipsis, Wallet, ChevronRight, ArrowRightLeft } from 'lucide-react';
import CollapsibleItem from './Collapsible';

const Header = () => {
  const [amount, setAmount] = useState('');
  const [change, setChange] = useState('');
  const [buttonText, setButtonText] = useState('Enter an amount');
  const [buttonColor, setButtonColor] = useState('bg-gray-200 text-gray-600');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setButtonText('Connect Wallet Address');
    setButtonColor('bg-[#0680fb] text-white');
  };

  const handleSetChange = (event) => {
    setChange(event.target.value);
    setButtonText('Connect Wallet Address');
    setButtonColor('bg-[#0680fb] text-white');
  };

  return (
    <div className="mt-2 md:w-4/12 mx-auto md:mt-16">
      <div className="flex justify-around pb-2">
        <h1 className="text-md mr-36 md:text-2xl font-semibold md:font-normal">Swap tokens</h1>
        <div className='flex mt-1 gap-3'>
          <RefreshCcw className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md'/>
          <LineChart className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md text-gray-400'/>
          <Ellipsis className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md'/>
        </div>
      </div>
      <hr/>
      <div className="pt-4">
        <div className="flex justify-between">
          <p className="font-lighter ml-2 text-gray-700">You Send</p>
          <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>0</p>
        </div>
        <div className="mt-2 ml-2 flex justify-between">
          <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer">
            <img src={"/tons.png"} width={40} height={40} className="rounded-full mr-1" />
            <span className="mt-1 text-3xl">TON</span>
            <ChevronRight className="mt-2" />
          </h1>
          <input
            type="text"
            className="text-3xl text-black font-semibold text-right border-none bg-transparent focus:outline-none w-full max-w-[150px] md:max-w-none"
            value={amount}
            onChange={handleAmountChange}
            placeholder='0.00'
          />
        </div>
        <p className="text-right mr-1 text-gray-500 pb-4 md:pb-8">$0</p>
        <div className="flex items-center">
          <hr className="flex-1 border-1 border-gray-300" />
          <div className="mx-4 border px-1 py-1 rounded-full">
            <ArrowRightLeft className="text-[#0680fb]" />
          </div>
          <hr className="flex-1 border-1 border-gray-300" />
        </div>
        <div className="pt-8 md:pt-12">
          <div className="flex justify-between">
            <p className="font-lighter ml-2 text-gray-700">You receive</p>
            <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>0</p>
          </div>
          <div className="mt-2 ml-2 flex justify-between">
            <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer">
              <img src={"/log.png"} width={40} height={40} className="rounded-full mr-1" />
              <span className="mt-1 text-3xl">STON</span>
              <ChevronRight className="mt-2" />
            </h1>
            <input
              type="text"
              className="text-3xl text-black font-semibold text-right border-none bg-transparent focus:outline-none w-full max-w-[150px] md:max-w-none"
              value={change}
              onChange={handleSetChange}
              placeholder='0.00'
            />
          </div>
          <p className="text-right mr-1 text-gray-500 pb-4 md:pb-12">$0</p>
          <hr/>
          <CollapsibleItem />
          <button className={`w-10/12 mt-4 border  px-4 py-3 rounded-xl ml-8 ${buttonColor}`}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
