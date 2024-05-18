import React, { useState } from 'react';
import { RefreshCcw, LineChart, Ellipsis, Wallet, ChevronRight, ArrowRightLeft,  } from 'lucide-react';
import CollapsibleItem from './Collapsible';
import { DeDustClient, JettonWallet, VaultJetton } from '@dedust/sdk';
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
import { Address, toNano, Sender, fromNano, TonClient } from "@ton/ton";
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
import { TonConnectUI, useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios'


const Header = ({coins}) => {
  const [amount, setAmount] = useState('');
  const [change, setChange] = useState('');
  const [buttonText, setButtonText] = useState('Enter an amount');
  const [buttonColor, setButtonColor] = useState('bg-gray-200 text-gray-600');
  const [selectedToken, setSelectedToken] = useState({
    contractAddress: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
    imageUrl: "https://assets.dedust.io/images/ton.webp",
    name: "Toncoin",
    symbol: "TON",
  }); // State to store the selected token
  const [selectedCoin, setSelectedCoin] = useState({
    contractAddress: "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA",
    imageUrl: "https://assets.dedust.io/images/usdt-old.webp",
    name: "TON Bridge USDT",
    symbol: "jUSDT"
  })
  const [filteredCoins, setFilteredCoins] = useState(coins); // State to store filtered coins
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()
  const {sender, userAddress, connected} = useTonConnect()
  const client = useTonClient()
  const [tonBalance, setTonBalance] = useState(0)
  const [amountOut, setAmountOut] = useState(0)
 const [amountInUSD, setAmountInUSD] = useState(0);
  const [fromTokenPrice, setFromTokenPrice] = useState(0); // State variable for fromTokenPrice
  const [toTokenPrice, setToTokenPrice] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0)
  const [priceAmount, setPriceAmount] = useState(0)

  useEffect(() => {
    // Initialize filtered coins with all coins initially
    setFilteredCoins(coins);
  }, [coins]);

  const fetchBalance = async ()=>{
    
     if(client && connected){
  const wallet = await client.getLastBlock()
  const seqno = wallet.last.seqno
  const balance = await client.getAccount(seqno, userAddress)
  const tonBalance = parseFloat(fromNano(balance.account.balance.coins))
    console.log(tonBalance.toFixed(4))
    setTonBalance(tonBalance.toFixed(4))
    }
  }

  useEffect(()=>{
   fetchBalance()
  },[])

    useEffect(() => {
    if (selectedToken && selectedCoin && amount) {
      fetchEquivalentAmount(selectedToken.contractAddress, selectedCoin.contractAddress, amount);
    }
  }, [selectedToken, selectedCoin, amount]);


const fetchTonPrice = async () => {
  const apiKey = 'CG-HVh6stdWnBt3jz9oHydUvJMa'; // Replace with your actual API key

  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'the-open-network',
        vs_currencies: 'usd'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': apiKey
      }
    });

    return response.data['the-open-network'];
  } catch (error) {
    console.error('Error fetching TON price:', error);
    return null; // Return null or some default value in case of error
  }
};


   const fetchTokenDetails = async (contractAddress) => {
    try {
      const response = await axios.get(`https://api.dexscreener.io/latest/dex/tokens/${contractAddress}`);
      console.log(response.data)
      
      return response.data.pairs[0];
    } catch (error) {
      console.error('Error fetching token details:', error);
      return null;
    }
  };
const fetchEquivalentAmount = async (fromAddress, toAddress, amount) => {
  console.log("toaddress", toAddress)
  try {
    let fromTokenData;
    let toTokenData;

    if (selectedToken.symbol === "TON") {
      fromTokenData = await fetchTonPrice();
      toTokenData = await fetchTokenDetails(toAddress);

      console.log("fromTokenData:", fromTokenData);
      console.log("toTokenData:", toTokenData);

      if (fromTokenData && toTokenData) {
        const fromTokenPrice = parseFloat(fromTokenData.usd);
        const toTokenPrice = parseFloat(toTokenData.priceUsd);

        console.log("fromTokenPrice:", fromTokenPrice);
        console.log("toTokenPrice:", toTokenPrice);
        const amountInUSD = amount * fromTokenPrice
        setAmountInUSD(amountInUSD)

        if (toTokenPrice !== 0) {
          const equivalentAmount = (amount * fromTokenPrice) / toTokenPrice;
           const expectedAmountOut = await getExpectedSwapAmount(toAddress, amount);
        console.log("Expected amount out considering price impact:", expectedAmountOut);
          console.log("Equivalent amount:", equivalentAmount);
           const priceImpactPercentage = ((equivalentAmount - expectedAmountOut) / equivalentAmount) * 100;
        console.log("Price Impact Percentage:", priceImpactPercentage.toFixed(2) + "%");
        const priceAMount = (expectedAmountOut * toTokenPrice)
          
          console.log("real", amountInUSD)
          setPriceAmount(priceAMount)
          
          setAmountOut(expectedAmountOut);
          setPriceImpact(priceImpactPercentage)
          setFromTokenPrice(fromTokenPrice)
          setToTokenPrice(toTokenPrice)
        } else {
          console.error("Error: Division by zero (toTokenPrice is 0)");
        }
      }
    } else if (selectedCoin.symbol === "TON") {
      fromTokenData = await fetchTokenDetails(fromAddress);
      toTokenData = await fetchTonPrice();

      console.log("fromTokenData:", fromTokenData);
      console.log("toTokenData:", toTokenData);

      if (fromTokenData && toTokenData) {
        const fromTokenPrice = parseFloat(fromTokenData.priceUsd);
        const toTokenPrice = parseFloat(toTokenData.usd);
        
        console.log("fromTokenPrice:", fromTokenPrice);
        console.log("toTokenPrice:", toTokenPrice);

        if (toTokenPrice !== 0) {
          const equivalentAmount = (amount * fromTokenPrice) / toTokenPrice;
         
          console.log("Equivalent amount:", equivalentAmount);
          
        const priceAMount = (equivalentAmount * fromTokenPrice)
          
          const amountInUSD = amount * fromTokenPrice
          console.log("real", amountInUSD)
            console.log("real", amountInUSD)
          setPriceAmount(priceAMount)
          setAmountOut(equivalentAmount);
          setAmountInUSD(amountInUSD)
          setFromTokenPrice(fromTokenPrice)
          setToTokenPrice(toTokenPrice)
        } else {
          console.error("Error: Division by zero (toTokenPrice is 0)");
        }
      }
    } else {
      fromTokenData = await fetchTokenDetails(fromAddress);
      toTokenData = await fetchTokenDetails(toAddress);

      console.log("fromTokenData:", fromTokenData);
      console.log("toTokenData:", toTokenData);

      if (fromTokenData && toTokenData) {
        const fromTokenPrice = parseFloat(fromTokenData.priceUsd);
        const toTokenPrice = parseFloat(toTokenData.priceUsd);

        console.log("fromTokenPrice:", fromTokenPrice);
        console.log("toTokenPrice:", toTokenPrice);

        if (toTokenPrice !== 0) {
          const equivalentAmount = (amount * fromTokenPrice) / toTokenPrice;
          console.log("Equivalent amount:", equivalentAmount);
          const amountInUSD = amount * fromTokenPrice
          
          setAmountOut(equivalentAmount.toFixed(5));
          setAmountInUSD(amountInUSD)
          setFromTokenPrice(fromTokenPrice)
          setToTokenPrice(toTokenPrice)
        } else {
          console.error("Error: Division by zero (toTokenPrice is 0)");
        }
      }
    }
  } catch (error) {
    console.error('Error fetching equivalent amount:', error);
  }
};



 const getExpectedSwapAmount = async (address, amount) => {
  const client = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
  });

  const factory = client.open(
    Factory.createFromAddress(MAINNET_FACTORY_ADDR)
  );

  const contractAddress = Address.parse(address);
  const jetton = client.open(JettonRoot.createFromAddress(contractAddress));


   

  const pool = client.open(
    Pool.createFromAddress(
      await factory.getPoolAddress({
        poolType: PoolType.VOLATILE,
        assets: [Asset.native(), Asset.jetton(jetton.address)]
      })
    )
  );

  const lastBlock = await client.getLastBlock();
  const poolState = await client.getAccountLite(
    lastBlock.last.seqno,
    pool.address
  );

  if (poolState.account.state.type !== "active") {
    throw new Error("Pool is not exist.");
  }

  const amountIn = toNano(amount);

  const { amountOut: expectedAmountOut } = await pool.getEstimatedSwapOut({
    assetIn: Asset.native(),
    amountIn,
  });

  

  // Slippage handling (1%)
  const minAmountOut = (expectedAmountOut * 99n) / 100n; // expectedAmountOut - 1%
  console.log("Min amount out after slippage:", fromNano(minAmountOut));

  return fromNano(minAmountOut);
};


  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setButtonText('Connect Wallet Address');
    setButtonColor('bg-[#0680fb] text-white');
  };

 

  // Function to filter coins based on search query
const fetchTokenDetailsFromTon = async (contractAddress) => {
  console.log('fetching ton details')
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
    url: `https://ton-mainnet.s.chainbase.online/2gdN9YBhuIewH7tTgyVeCkCKFl5/v1/getTokenData?address=${contractAddress}`
  };

  try {
    const response = await axios(options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching token details:', error);
    throw error;
  }
};

const fetchAdditionalContent = async (url) => {
  if (!url) {
    throw new Error('Invalid URL');
  }

  try {
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching additional content:', error);
    throw error;
  }
};

  const isTonContractAddress = (address) => {
  // Assuming TON contract addresses start with "EQ" and are 48 characters long
  const tonAddressPattern = /^EQ[A-Za-z0-9_-]/;
  return tonAddressPattern.test(address);
};


const handleSearch = async (query) => {
  if (isTonContractAddress(query)) {
    // Fetch coin details using the contract address
    try {
      const coinDetails = await fetchTokenDetailsFromTon(query);
      console.log('Coin Details:', coinDetails);

      if (coinDetails.result && coinDetails.result.jetton_content) {
        const jettonContent = coinDetails.result.jetton_content;

        if (jettonContent.type === 'onchain') {
          // Use the on-chain data directly
          const onChainData = jettonContent.data;
          console.log('On-chain Data:', onChainData);
          const combinedDetails = { 
            name: onChainData.name,
            symbol:  onChainData.symbol, 
            imageUrl: onChainData.image,
            contractAddress : query
          }
            
          setFilteredCoins([combinedDetails]);
        } else if (jettonContent.type === 'offchain') {
          // Fetch the off-chain data from the URI
          const offChainUri = jettonContent.data;
          console.log('Off-chain URI:', offChainUri);

          if (offChainUri) {
            const additionalContent = await fetchAdditionalContent(offChainUri);
            console.log('Off-chain Data:', additionalContent);
            const combinedDetails = { 
              name: additionalContent.name,
              symbol: additionalContent.symbol,
              imageUrl: additionalContent.image,
              contractAddress: query
            };
            setFilteredCoins([combinedDetails]);
          } else {
            console.error('Off-chain URI is undefined');
            setFilteredCoins([coinDetails]);
          }
        }
      } else {
        setFilteredCoins([coinDetails]);
      }
    } catch (error) {
      console.error('Error fetching coin details:', error);
      setFilteredCoins([]); // Clear the list or show a message indicating the coin wasn't found
    }
  } else {
    // Filter coins by name or symbol
    const filtered = coins.filter(coin => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredCoins(filtered);
  }
};



  // Function to handle selection of a token
  const handleTokenSelection = (token) => {
    setSelectedToken(token);
      setFilteredCoins(coins);
    onClose(); // Close the modal
  };

  const handleCoinSelection = (token) => {
    setSelectedCoin(token);
      setFilteredCoins(coins);
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

  const fetchPrice = async(address, amount)=>{
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

  setAmountOut(amountOut)
  // Slippage handling (1%)
  const minAmountOut = (expectedAmountOut * 99n) / 100n; // expectedAmountOut - 1%
  console.log(fromNano(minAmountOut))


  }

 const swapJettontoTon = async (from, amount) => {
  console.log('Amount', amount);
  console.log('fromAddress', from);
  console.log('selectedToken', selectedToken);

  const client = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
  });

  const factory = client.open(
    Factory.createFromAddress(MAINNET_FACTORY_ADDR)
  );

  const fromAddress = Address.parse(from);

  // Open the jetton vault
  const jettonVault = client.open(await factory.getJettonVault(fromAddress));
  const jettonRoot = client.open(JettonRoot.createFromAddress(fromAddress));
  console.log(sender)
  const jettonWallet = client.open(await jettonRoot.getWallet(sender.address));

  
  console.log(jettonWallet.address)
  // Open the pool
  const pool = client.open(
    Pool.createFromAddress(
      await factory.getPoolAddress({
        poolType: PoolType.VOLATILE,
        assets: [Asset.native(), Asset.jetton(jettonRoot.address)],
      })
    )
  );

  const amountIn = toNano(amount);

  // Estimate the amount of TON to receive
  const { amountOut: expectedAmountOut } = await pool.getEstimatedSwapOut({
    assetIn: Asset.jetton(jettonRoot.address),
    amountIn,
  });



  

  const minAmountOut = (expectedAmountOut * 99n) / 100n;
  console.log('Expected Amount Out (TON):', fromNano(expectedAmountOut));
  console.log('Min Amount Out (TON):', fromNano(minAmountOut));

  

  // Sending the transfer from the Jetton Wallet to the Jetton Vault
  await jettonWallet.sendTransfer(sender, toNano("0.185"), {
    amount: amountIn,
    destination: jettonVault.address,
    responseAddress: sender.address,
    forwardAmount: toNano("0.125"),
    forwardPayload: VaultJetton.createSwapPayload({
      poolAddress: pool.address,
      limit: minAmountOut,
    }),
  });

  console.log('Swap initiated from Jetton to TON');
};


const swapJettonToJetton = async(from, to, amount)=>{
  console.log('Amount', amount);
  console.log('fromAddress', from);
  

  const client = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
  });

  const factory = client.open(
    Factory.createFromAddress(MAINNET_FACTORY_ADDR)
  );

  const fromAddress = Address.parse(from);
  const toAddress = Address.parse(to);

  const fromAsset = Asset.jetton(fromAddress)
  const TON = Asset.native()
  const toAsset = Asset.jetton(toAddress)

const TON_FROM = client.open(await factory.getPool(PoolType.VOLATILE, [TON, fromAsset]));
const TON_TO = client.open(await factory.getPool(PoolType.VOLATILE, [TON, toAsset]));

 const jettonVault = client.open(await factory.getJettonVault(fromAddress));
const FromRoot = client.open(JettonRoot.createFromAddress(fromAddress));
const FromWallet = client.open(await FromRoot.getWallet(sender.address));

const amountIn = toNano(amount);

FromWallet.sendTransfer(
  sender,
  toNano("0.265"),
  {
    amount: amountIn,
    destination: jettonVault.address,
    responseAddress: sender.address,
    forwardAmount: toNano('0.215'),
    forwardPayload: VaultJetton.createSwapPayload({
      poolAddress: TON_FROM.address,
      next:{
        poolAddress: TON_TO.address
      }
    })
  }
)
}


  const handleSwap= async ()=>{
    if(selectedToken.symbol === "TON"){
      swap(selectedCoin.contractAddress, amount)
    }else if(selectedCoin.symbol === "TON"){
      swapJettontoTon(selectedToken.contractAddress, amount)
    }else if(selectedCoin.symbol != "TON" && selectedToken.symbol != "TON"){
      swapJettonToJetton(selectedToken.contractAddress, selectedCoin.contractAddress, amount)
    }
  }
const [tonConnectUI] = useTonConnectUI();

 const sendFee = async (amount) => {
  

  // Define the recipient address
  const feeAddress = Address.parse('UQAp050vzuXoS-LlgRB7KJnvY3wisP1ewpGldwQWKf3pmfzL');

  // Calculate the amount to send
  const sendAmount = toNano((amount * 1) / 100);

  // Define the transaction
  const tx = {
    messages: [
      {
        address: feeAddress, // Ensure address is in the correct format
        amount: sendAmount, 
        payload: null // No payload is needed for a simple transfer
      }
    ],
    validUntil: Date.now() + 1000000 // Transaction validity period (in milliseconds)
  };

  // Send the transaction using TonConnectUI
  try {
    await tonConnectUI.sendTransaction(tx);
    console.log('Transaction sent successfully');
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
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
          <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>{selectedToken && selectedToken.symbol == 'TON' ? tonBalance : '0'  }</p>
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
        <p className="text-right mr-1 text-gray-500 pb-4 md:pb-8">${amountInUSD.toFixed(2)}</p>
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
            <p className="flex mr-2 text-gray-500"><Wallet className="w-4 mr-1"/>{selectedCoin && selectedCoin.symbol == 'TON' ? tonBalance : '0' }</p>
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
              value={amountOut}
              placeholder={Number(0)}
              readOnly
            />
          </div>
          <p className="text-right mr-1 text-gray-500 pb-4 md:pb-12">${priceAmount.toFixed(2)}</p>
          <hr/>
          <CollapsibleItem fromPrice={fromTokenPrice} toPrice={toTokenPrice} selectedToken={selectedToken} selectedCoin={selectedCoin} amountOut={amountOut} priceImpact={priceImpact} />
          <button onClick={handleSwap} className={`w-10/12 mt-4 border  px-4 py-3 rounded-xl ml-8 ${buttonColor}`}>{connected ? 'Swap' : buttonText}</button>
          <button onClick={sendFee} className={`w-10/12 mt-4 border  px-4 py-3 rounded-xl ml-8 `}>
            appo
          </button>
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
