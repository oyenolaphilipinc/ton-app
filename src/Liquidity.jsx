import React, { useState, useEffect } from 'react';
import { 
  RefreshCcw, 
  LineChart, 
  Ellipsis, 
  Wallet, 
  ChevronRight, 
  Plus, 
  Minus,
  TrendingUp,
  Info
} from 'lucide-react';
import { DeDustClient, JettonWallet, VaultJetton } from '@dedust/sdk';
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
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Address, toNano, Sender, fromNano, TonClient, beginCell } from "@ton/ton";
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
import { useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';

const Liquidity = ({ coins }) => {
  const [activeTab, setActiveTab] = useState('pools'); // 'pools', 'positions', 'add', 'remove'
  const [pools, setPools] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPool, setSelectedPool] = useState(null);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [lpAmount, setLpAmount] = useState('');
  const [selectedTokenA, setSelectedTokenA] = useState({
    contractAddress: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
    imageUrl: "https://assets.dedust.io/images/ton.webp",
    name: "Toncoin",
    symbol: "TON",
  });
  const [selectedTokenB, setSelectedTokenB] = useState({
    contractAddress: "EQBynBO23ywHy_CgarY9NK9FTz0yDsG82PtcbSTQgGoXwiuA",
    imageUrl: "https://assets.dedust.io/images/usdt-old.webp",
    name: "TON Bridge USDT",
    symbol: "jUSDT"
  });
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTokenBModalOpen, onOpen: onTokenBModalOpen, onClose: onTokenBModalClose } = useDisclosure();
  const { sender, userAddress, connected } = useTonConnect();
  const client = useTonClient();
  const [tonBalance, setTonBalance] = useState(0);
  const [poolShare, setPoolShare] = useState(0);
  const [impermanentLoss, setImpermanentLoss] = useState(0);
  const [error, setError] = useState(null);

  // Fetch available pools
  const fetchPools = async () => {
    try {
      const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });
      const allPools = await dedustClient.getPools();
      
      // Filter pools with sufficient liquidity and metadata
      const filteredPools = allPools.filter(pool => 
        parseInt(pool.totalSupply) > 100 && 
        pool.assets[0].metadata !== null && 
        pool.assets[1]?.metadata !== null
      );

      // Format pool data
      const formattedPools = filteredPools.map(pool => ({
        address: pool.address,
        tokenA: {
          address: pool.assets[0].address,
          symbol: pool.assets[0].metadata?.symbol || 'Unknown',
          name: pool.assets[0].metadata?.name || 'Unknown',
          imageUrl: pool.assets[0].metadata?.image || '/tons.png',
          balance: pool.assets[0].balance,
        },
        tokenB: {
          address: pool.assets[1]?.address,
          symbol: pool.assets[1]?.metadata?.symbol || 'Unknown',
          name: pool.assets[1]?.metadata?.name || 'Unknown',
          imageUrl: pool.assets[1]?.metadata?.image || '/tons.png',
          balance: pool.assets[1]?.balance,
        },
        totalSupply: pool.totalSupply,
        volume24h: pool.volume24h || '0',
        tvl: pool.tvl || '0',
      }));

      setPools(formattedPools);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching pools:', error);
      setError('Failed to fetch liquidity pools. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch user's liquidity positions
  const fetchUserPositions = async () => {
    if (!connected || !userAddress) return;

    try {
      // This would typically involve querying the user's LP token balances
      // For now, we'll create a mock implementation
      const mockPositions = [
        {
          id: 1,
          pool: pools[0],
          lpTokens: '1000',
          tokenAShare: '500',
          tokenBShare: '100',
          value: '1500',
          apr: '12.5',
        }
      ];
      setUserPositions(mockPositions);
    } catch (error) {
      console.error('Error fetching user positions:', error);
    }
  };

  // Calculate pool share and impermanent loss
  const calculatePoolMetrics = () => {
    if (!selectedPool || !amountA || !amountB) return;

    const totalSupply = parseFloat(selectedPool.totalSupply);
    const userLpTokens = parseFloat(amountA) + parseFloat(amountB);
    const share = (userLpTokens / totalSupply) * 100;
    setPoolShare(share);

    // Simple impermanent loss calculation (simplified)
    const currentRatio = parseFloat(amountA) / parseFloat(amountB);
    const initialRatio = 1; // Assuming 1:1 initial ratio
    const loss = Math.abs(currentRatio - initialRatio) * 0.5;
    setImpermanentLoss(loss);
  };

  // Add liquidity to pool
  const addLiquidity = async () => {
    if (!connected || !selectedPool || !amountA || !amountB) {
      console.error('Missing required parameters for adding liquidity');
      return;
    }

    try {
      const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });
      
      // Implementation would use DeDust SDK to add liquidity
      console.log('Adding liquidity:', {
        pool: selectedPool.address,
        tokenA: selectedTokenA.contractAddress,
        tokenB: selectedTokenB.contractAddress,
        amountA: toNano(amountA),
        amountB: toNano(amountB),
      });

      // This is a placeholder - actual implementation would involve
      // calling the appropriate DeDust contract methods
      alert('Liquidity addition would be implemented here');
      
    } catch (error) {
      console.error('Error adding liquidity:', error);
    }
  };

  // Remove liquidity from pool
  const removeLiquidity = async () => {
    if (!connected || !selectedPool || !lpAmount) {
      console.error('Missing required parameters for removing liquidity');
      return;
    }

    try {
      const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });
      
      // Implementation would use DeDust SDK to remove liquidity
      console.log('Removing liquidity:', {
        pool: selectedPool.address,
        lpAmount: toNano(lpAmount),
      });

      // This is a placeholder - actual implementation would involve
      // calling the appropriate DeDust contract methods
      alert('Liquidity removal would be implemented here');
      
    } catch (error) {
      console.error('Error removing liquidity:', error);
    }
  };

  // Handle token selection
  const handleTokenSelection = (token) => {
    setSelectedTokenA(token);
    onClose();
  };

  const handleTokenBSelection = (token) => {
    setSelectedTokenB(token);
    onTokenBModalClose();
  };

  // Handle search
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCoins(coins);
      return;
    }
    
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  useEffect(() => {
    fetchPools();
  }, []);

  useEffect(() => {
    if (connected) {
      fetchUserPositions();
    }
  }, [connected, pools]);

  useEffect(() => {
    calculatePoolMetrics();
  }, [amountA, amountB, selectedPool]);

  useEffect(() => {
    setFilteredCoins(coins);
  }, [coins]);

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>Loading liquidity pools...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </Flex>
    );
  }

  if (!pools || pools.length === 0) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>No liquidity pools found.</Text>
      </Flex>
    );
  }

  return (
    <div className="mt-2 md:w-4/12 mx-auto md:mt-16">
      <div className="flex justify-around pb-2">
        <h1 className="text-md mr-36 md:text-2xl font-semibold md:font-normal">Liquidity</h1>
        <div className='flex mt-1 gap-3'>
          <RefreshCcw className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md' onClick={fetchPools}/>
          <LineChart className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md text-gray-400'/>
          <Ellipsis className='cursor-pointer hover:bg-gray-50 hover:border hover:rounded-md'/>
        </div>
      </div>
      <hr/>

      {/* Tab Navigation */}
      <Tabs onChange={(index) => setActiveTab(['pools', 'positions', 'add', 'remove'][index])} className="mt-4">
        <TabList>
          <Tab>Pools</Tab>
          <Tab>My Positions</Tab>
          <Tab>Add</Tab>
          <Tab>Remove</Tab>
        </TabList>

        <TabPanels>
          {/* Pools Tab */}
          <TabPanel>
            <div className="space-y-4">
              <Text fontSize="lg" fontWeight="bold">Available Pools</Text>
              {pools.map((pool, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" 
                      onClick={() => setSelectedPool(pool)}>
                  <CardBody>
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap={2}>
                        <Image src={pool.tokenA?.imageUrl || '/tons.png'} w={8} h={8} rounded="full" />
                        <Text fontWeight="bold">{pool.tokenA?.symbol || 'N/A'}</Text>
                        <Text>/</Text>
                        <Image src={pool.tokenB?.imageUrl || '/tons.png'} w={8} h={8} rounded="full" />
                        <Text fontWeight="bold">{pool.tokenB?.symbol || 'N/A'}</Text>
                      </Flex>
                      <Badge colorScheme="green">${parseFloat(pool.tvl).toFixed(2)}</Badge>
                    </Flex>
                    <Flex justify="space-between" mt={2}>
                      <Text fontSize="sm" color="gray.600">24h Volume: ${parseFloat(pool.volume24h).toFixed(2)}</Text>
                      <Text fontSize="sm" color="gray.600">APR: 12.5%</Text>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </div>
          </TabPanel>

          {/* My Positions Tab */}
          <TabPanel>
            <div className="space-y-4">
              <Text fontSize="lg" fontWeight="bold">My Liquidity Positions</Text>
              {userPositions.length === 0 ? (
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>No positions found!</AlertTitle>
                    <AlertDescription>
                      You haven't provided liquidity to any pools yet. Start by adding liquidity to earn fees.
                    </AlertDescription>
                  </Box>
                </Alert>
              ) : (
                userPositions.map((position, index) => (
                  <Card key={index}>
                    <CardBody>
                      <Flex justify="space-between" align="center">
                        <Flex align="center" gap={2}>
                          <Image src={position.pool?.tokenA?.imageUrl || '/tons.png'} w={8} h={8} rounded="full" />
                          <Text fontWeight="bold">{position.pool?.tokenA?.symbol || 'N/A'}</Text>
                          <Text>/</Text>
                          <Image src={position.pool?.tokenB?.imageUrl || '/tons.png'} w={8} h={8} rounded="full" />
                          <Text fontWeight="bold">{position.pool?.tokenB?.symbol || 'N/A'}</Text>
                        </Flex>
                        <Badge colorScheme="blue">${position.value}</Badge>
                      </Flex>
                      <Flex justify="space-between" mt={2}>
                        <Text fontSize="sm" color="gray.600">LP Tokens: {position.lpTokens}</Text>
                        <Text fontSize="sm" color="gray.600">APR: {position.apr}%</Text>
                      </Flex>
                    </CardBody>
                  </Card>
                ))
              )}
            </div>
          </TabPanel>

          {/* Add Liquidity Tab */}
          <TabPanel>
            <div className="space-y-6">
              <Text fontSize="lg" fontWeight="bold">Add Liquidity</Text>
              
              {/* Pool Selection */}
              <div>
                <Text mb={2} fontWeight="medium">Select Pool</Text>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    const pool = pools.find(p => p.address === e.target.value);
                    setSelectedPool(pool);
                    if (pool) {
                      setSelectedTokenA(pool.tokenA || {});
                      setSelectedTokenB(pool.tokenB || {});
                    }
                  }}
                >
                  <option value="">Select a pool...</option>
                  {pools.map((pool, index) => (
                    <option key={index} value={pool.address}>
                      {(pool.tokenA?.symbol || 'N/A')}/{(pool.tokenB?.symbol || 'N/A')}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPool && (
                <>
                  {/* Token A Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text fontWeight="medium">Amount {selectedTokenA?.symbol || 'N/A'}</Text>
                      <Text className="text-gray-500">Balance: {selectedTokenA?.symbol === 'TON' ? tonBalance : '0'}</Text>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-3">
                      <img src={selectedTokenA?.imageUrl || '/tons.png'} width={32} height={32} className="rounded-full mr-2" />
                      <input
                        type="number"
                        className="flex-1 text-lg border-none bg-transparent focus:outline-none"
                        value={amountA}
                        onChange={(e) => setAmountA(e.target.value)}
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Token B Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text fontWeight="medium">Amount {selectedTokenB?.symbol || 'N/A'}</Text>
                      <Text className="text-gray-500">Balance: 0</Text>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-3">
                      <img src={selectedTokenB?.imageUrl || '/tons.png'} width={32} height={32} className="rounded-full mr-2" />
                      <input
                        type="number"
                        className="flex-1 text-lg border-none bg-transparent focus:outline-none"
                        value={amountB}
                        onChange={(e) => setAmountB(e.target.value)}
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Pool Share Info */}
                  {poolShare > 0 && (
                    <Alert status="info">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Pool Share</AlertTitle>
                        <AlertDescription>
                          You will own {poolShare.toFixed(4)}% of this pool
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}

                  {/* Add Liquidity Button */}
                  <button 
                    onClick={addLiquidity}
                    disabled={!connected || !amountA || !amountB}
                    className={`w-full mt-4 border px-4 py-3 rounded-xl ${
                      connected && amountA && amountB 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {connected ? 'Add Liquidity' : 'Connect Wallet'}
                  </button>
                </>
              )}
            </div>
          </TabPanel>

          {/* Remove Liquidity Tab */}
          <TabPanel>
            <div className="space-y-6">
              <Text fontSize="lg" fontWeight="bold">Remove Liquidity</Text>
              
              {/* Position Selection */}
              <div>
                <Text mb={2} fontWeight="medium">Select Position</Text>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    const position = userPositions.find(p => p.id === parseInt(e.target.value));
                    setSelectedPool(position?.pool);
                  }}
                >
                  <option value="">Select a position...</option>
                  {userPositions.map((position, index) => (
                    <option key={index} value={position.id}>
                      {(position.pool?.tokenA?.symbol || 'N/A')}/{(position.pool?.tokenB?.symbol || 'N/A')} - ${position.value}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPool && (
                <>
                  {/* LP Token Amount */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Text fontWeight="medium">LP Token Amount</Text>
                      <Text className="text-gray-500">Available: 1000</Text>
                    </div>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                      value={lpAmount}
                      onChange={(e) => setLpAmount(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>

                  {/* Impermanent Loss Warning */}
                  <Alert status="warning">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Impermanent Loss Risk</AlertTitle>
                      <AlertDescription>
                        Removing liquidity may result in impermanent loss. Current estimated loss: {impermanentLoss.toFixed(2)}%
                      </AlertDescription>
                    </Box>
                  </Alert>

                  {/* Remove Liquidity Button */}
                  <button 
                    onClick={removeLiquidity}
                    disabled={!connected || !lpAmount}
                    className={`w-full mt-4 border px-4 py-3 rounded-xl ${
                      connected && lpAmount 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {connected ? 'Remove Liquidity' : 'Connect Wallet'}
                  </button>
                </>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Token Selection Modal */}
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Token</ModalHeader>
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
              <Flex direction={'column'} gap={5} mt={4}>
                {filteredCoins && filteredCoins.map((coin, index) => (
                  <Flex key={index} gap={4} alignItems={'center'} onClick={() => handleTokenSelection(coin)} className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <Box>
                      <Image src={coin.imageUrl} w={10} />
                    </Box>
                    <Flex direction={'column'}>
                      <Text fontWeight={'bolder'}>{coin.symbol}</Text>
                      <Text>{coin.name}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Liquidity; 