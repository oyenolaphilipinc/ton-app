import React from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'

const Navbar = () => {
  return (
    <div className="flex justify-between border-b-2 pb-1">
        <div className="">
            <h1 className="flex text-xl font-bold ml-2 mt-1"><img src={"/log.png"} width={40} height={40} className="rounded-full" /><span className="mt-2 ml-1 hidden md:flex">Speedy Swap</span></h1>
        </div>
        <div>
           <TonConnectButton />
        </div>
    </div>
  )
}

export default Navbar