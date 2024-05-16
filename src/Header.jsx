import React, { useState } from 'react';
import { RefreshCcw, LineChart, Ellipsis, Wallet, ChevronRight, ArrowRightLeft,  } from 'lucide-react';
import CollapsibleItem from './Collapsible';
import { DeDustClient } from '@dedust/sdk';
import { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Image,
  Text,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { Address, toNano, Sender, fromNano } from "@ton/ton";
import {
  Asset,
  Factory,
  JettonRoot,
  MAINNET_FACTORY_ADDR,
  Pool,
  PoolType,
  VaultNative,
} from "@dedust/sdk";
import { useTonConnect } from './hooks/useTonConnect';
import { useTonClient } from './hooks/useTonClient';
import { TonClient4 } from '@ton/ton';
import { TonConnectUI } from '@tonconnect/ui-react';


const Header = ({coins}) => {
  const [amount, setAmount] = useState('');
  const [change, setChange] = useState('');
  const [buttonText, setButtonText] = useState('Enter an amount');
  const [buttonColor, setButtonColor] = useState('bg-gray-200 text-gray-600');
  const [selectedToken, setSelectedToken] = useState(null); // State to store the selected token
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [filteredCoins, setFilteredCoins] = useState(coins); // State to store filtered coins
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()
  const {sender, userAddress, connected} = useTonConnect()
  const client = useTonClient()
  const [tonBalance, setTonBalance] = useState()
  const [selectedContract, setSelectedContract] = useState('')

  useEffect(() => {
    // Initialize filtered coins with all coins initially
    setFilteredCoins(coins);
  }, [coins]);

  const fetchBalance = async ()=>{
     if(client && connected){
  const wallet = await client.getBalance(userAddress)
  const balance = fromNano(wallet)
    setTonBalance(balance)
    console.log(balance)
    }
  }

  // useEffect(()=>{
  //  fetchBalance()
  // },[client])

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

  // Function to filter coins based on search query
  const handleSearch = (query) => {
    const filtered = coins.filter(coin => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCoins(filtered);
  };

  // Function to handle selection of a token
  const handleTokenSelection = (token) => {
    setSelectedToken(token);
    onClose(); // Close the modal
  };

  const handleCoinSelection = (token) => {
    setSelectedCoin(token);
    onSecondModalClose(); // Close the modal
  };

  const swap = async(address, amount)=>{
    console.log('AMount', amount),
    console.log('ca', address)
    const client = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
  });
    console.log('console log')
    const factory = client.open(
      Factory.createFromAddress(MAINNET_FACTORY_ADDR)
    )

    

    const contractAddress = Address.parse(address)
    
    const jetton = client.open(JettonRoot.createFromAddress(contractAddress))

    const pool = client.open(
      Pool.createFromAddress(
        await factory.getPoolAddress({
          poolType: PoolType.VOLATILE,
          assets: [Asset.native(), Asset.jetton(jetton.address)]
        })
      )
    )

    const nativeVault = client.open(
      VaultNative.createFromAddress(
        await factory.getVaultAddress(Asset.native())
      )
    )

    const lastBlock = await client.getLastBlock()
    const poolState = await client.getAccountLite(
      lastBlock.last.seqno,
      pool.address
    );
     if (poolState.account.state.type !== "active") {
    throw new Error("Pool is not exist.");
  }

   const vaultState = await client.getAccountLite(
    lastBlock.last.seqno,
    nativeVault.address,
  );
  if (vaultState.account.state.type !== "active") {
    throw new Error("Native Vault is not exist.");
  }

  const amountIn = toNano(amount);

  const { amountOut: expectedAmountOut } = await pool.getEstimatedSwapOut({
    assetIn: Asset.native(),
    amountIn,
  });

  // Slippage handling (1%)
  const minAmountOut = (expectedAmountOut * 99n) / 100n; // expectedAmountOut - 1%
  console.log(fromNano(minAmountOut))


   await nativeVault.sendSwap(
    sender,
    {
      poolAddress: pool.address,
      amount: amountIn,
      limit: minAmountOut,
      gasAmount: toNano("0.25"),
    },
  );

  }

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
          <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>{selectedToken && selectedToken.symbol == 'TON' ? tonBalance : selectedToken != 'TON' ? '0' : tonBalance  }</p>
        </div>
        <div className="mt-2 ml-2 flex justify-between">
          <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer">
            <img src={selectedToken ? selectedToken.imageUrl : '/tons.png'} width={40} height={40} className="rounded-full mr-1" />
            <span className="mt-1 text-3xl" onClick={onOpen}>{selectedToken ? selectedToken.symbol : 'Ton'}</span>
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
            <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>{selectedToken && selectedToken.symbol == 'TON' ? tonBalance : selectedToken != 'TON' ? '0' : tonBalance  }</p>
          </div>
          <div className="mt-2 ml-2 flex justify-between">
            <h1 className="flex text-gray-800 hover:text-[#0680fb] cursor-pointer" onClick={onSecondModalOpen}>
              <img src={selectedCoin ? selectedCoin.imageUrl : "/log.png"} width={40} height={40} className="rounded-full mr-1" />
              <span className="mt-1 text-3xl">{selectedCoin ? selectedCoin.symbol : 'STON'}</span>
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
          <button onClick={()=>{
            if(selectedCoin != null){
              swap(selectedCoin.contractAddress, amount)
            }
            
          }} className={`w-10/12 mt-4 border  px-4 py-3 rounded-xl ml-8 ${buttonColor}`}>{connected ? 'Swap' : buttonText}</button>
        </div>
      </div>


      <Modal 
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Box>
                <InputGroup>
                  <InputLeftElement>
                    <SearchIcon />
                  </InputLeftElement>
                  <Input placeholder='Search assets or address' onChange={(e) => handleSearch(e.target.value)} />
                </InputGroup>
              </Box>

              <Tabs>
                <TabList>
                  <Tab>Assets</Tab>
                  <Tab>Favourite</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex direction={'column'} gap={5} >
                      {filteredCoins && filteredCoins.map((coin, index)=>{
                        return(
                          <Flex key={index} gap={4} alignItems={'center'} onClick={() => handleTokenSelection(coin)}>
                            <Box>
                              <Image src={coin.imageUrl} w={10} />
                            </Box>

                            <Flex direction={'column'}>
                              <Text fontWeight={'bolder'}>{coin.symbol}</Text>
                              <Text>{coin.name}</Text>
                            </Flex>
                          </Flex>
                        )
                      })}

                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal 
      isCentered
      onClose={onSecondModalClose}
      isOpen={isSecondModalOpen}
      motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Box>
                <InputGroup>
                  <InputLeftElement>
                    <SearchIcon />
                  </InputLeftElement>
                  <Input placeholder='Search assets or address' onChange={(e) => handleSearch(e.target.value)} />
                </InputGroup>
              </Box>

              <Tabs>
                <TabList>
                  <Tab>Assets</Tab>
                  <Tab>Favourite</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex direction={'column'} gap={5} >
                      {filteredCoins && filteredCoins.map((coin, index)=>{
                        return(
                          <Flex key={index} gap={4} alignItems={'center'} onClick={() => handleCoinSelection(coin)}>
                            <Box>
                              <Image src={coin.imageUrl} w={10} />
                            </Box>

                            <Flex direction={'column'}>
                              <Text fontWeight={'bolder'}>{coin.symbol}</Text>
                              <Text>{coin.name}</Text>
                            </Flex>
                          </Flex>
                        )
                      })}

                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' mr={3} onClick={onSecondModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Header;
