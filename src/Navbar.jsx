import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between border-b-2 pb-1">
        <div className="">
            <h1 className="flex text-xl font-bold ml-2 mt-1"><img src={"/log.png"} width={40} height={40} className="rounded-full" /><span className="mt-2 ml-1 hidden md:flex">STON</span></h1>
        </div>
        <div>
            <button className="border px-3 py-1 rounded-md bg-[#0680fb] text-white mr-1 mt-2 md:mr-3">Connect Wallet</button>
        </div>
    </div>
  )
}

export default Navbar