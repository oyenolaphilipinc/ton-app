import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Image,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Wallet, ChevronRight } from 'lucide-react';

const AddLiquidity = ({ 
  isOpen, 
  onClose, 
  selectedPool, 
  coins, 
  onAddLiquidity, 
  connected, 
  tonBalance 
}) => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [poolShare, setPoolShare] = useState(0);
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [selectedTokenA, setSelectedTokenA] = useState(null);
  const [selectedTokenB, setSelectedTokenB] = useState(null);
  const [isTokenAModalOpen, setIsTokenAModalOpen] = useState(false);
  const [isTokenBModalOpen, setIsTokenBModalOpen] = useState(false);

  useEffect(() => {
    if (selectedPool) {
      setSelectedTokenA(selectedPool.tokenA);
      setSelectedTokenB(selectedPool.tokenB);
    }
  }, [selectedPool]);

  useEffect(() => {
    if (amountA && amountB && selectedPool) {
      const totalSupply = parseFloat(selectedPool.totalSupply);
      const userLpTokens = parseFloat(amountA) + parseFloat(amountB);
      const share = totalSupply > 0 ? (userLpTokens / totalSupply) * 100 : 0;
      setPoolShare(share);
    }
  }, [amountA, amountB, selectedPool]);

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

  const handleTokenSelection = (token, isTokenA) => {
    if (isTokenA) {
      setSelectedTokenA(token);
      setIsTokenAModalOpen(false);
    } else {
      setSelectedTokenB(token);
      setIsTokenBModalOpen(false);
    }
  };

  const handleAddLiquidity = async () => {
    if (!connected || !selectedPool || !amountA || !amountB) {
      return;
    }

    try {
      await onAddLiquidity(
        selectedPool.address,
        selectedTokenA.contractAddress,
        selectedTokenB.contractAddress,
        amountA,
        amountB
      );
      onClose();
      setAmountA('');
      setAmountB('');
    } catch (error) {
      console.error('Error adding liquidity:', error);
    }
  };

  const getBalance = (token) => {
    if (token?.symbol === 'TON') {
      return tonBalance;
    }
    return '0'; // For other tokens, you'd fetch from wallet
  };

  return (
    <>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPool ? (
              <Box spaceY={4}>
                {/* Pool Info */}
                <Alert status="info" mb={4}>
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Pool: {selectedPool.tokenA.symbol}/{selectedPool.tokenB.symbol}</AlertTitle>
                    <AlertDescription>
                      TVL: ${parseFloat(selectedPool.tvl).toFixed(2)} | APR: {selectedPool.apr}%
                    </AlertDescription>
                  </Box>
                </Alert>

                {/* Token A Input */}
                <Box>
                  <div className="flex justify-between mb-2">
                    <Text fontWeight="medium">Amount {selectedTokenA?.symbol}</Text>
                    <Text className="text-gray-500">
                      Balance: {getBalance(selectedTokenA)}
                    </Text>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg p-3">
                    <img 
                      src={selectedTokenA?.imageUrl || '/tons.png'} 
                      width={32} 
                      height={32} 
                      className="rounded-full mr-2" 
                    />
                    <input
                      type="number"
                      className="flex-1 text-lg border-none bg-transparent focus:outline-none"
                      value={amountA}
                      onChange={(e) => setAmountA(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                </Box>

                {/* Divider */}
                <Flex justify="center" my={2}>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Text fontSize="lg" color="blue.600">+</Text>
                  </div>
                </Flex>

                {/* Token B Input */}
                <Box>
                  <div className="flex justify-between mb-2">
                    <Text fontWeight="medium">Amount {selectedTokenB?.symbol}</Text>
                    <Text className="text-gray-500">
                      Balance: {getBalance(selectedTokenB)}
                    </Text>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-lg p-3">
                    <img 
                      src={selectedTokenB?.imageUrl || '/tons.png'} 
                      width={32} 
                      height={32} 
                      className="rounded-full mr-2" 
                    />
                    <input
                      type="number"
                      className="flex-1 text-lg border-none bg-transparent focus:outline-none"
                      value={amountB}
                      onChange={(e) => setAmountB(e.target.value)}
                      placeholder="0.0"
                    />
                  </div>
                </Box>

                {/* Pool Share Info */}
                {poolShare > 0 && (
                  <Alert status="success" mt={4}>
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Pool Share</AlertTitle>
                      <AlertDescription>
                        You will own {poolShare.toFixed(4)}% of this pool
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}

                <Divider my={4} />

                {/* Summary */}
                <Box p={4} bg="gray.50" borderRadius="lg">
                  <Text fontWeight="bold" mb={2}>Summary</Text>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm" color="gray.600">Rate</Text>
                    <Text fontSize="sm">
                      1 {selectedTokenA?.symbol} = {(parseFloat(amountB) / parseFloat(amountA || 1)).toFixed(6)} {selectedTokenB?.symbol}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="sm" color="gray.600">Pool Share</Text>
                    <Text fontSize="sm">{poolShare.toFixed(4)}%</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="sm" color="gray.600">LP Tokens</Text>
                    <Text fontSize="sm">{(parseFloat(amountA || 0) + parseFloat(amountB || 0)).toFixed(6)}</Text>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Text>Please select a pool first</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleAddLiquidity}
              disabled={!connected || !amountA || !amountB}
            >
              {connected ? 'Add Liquidity' : 'Connect Wallet'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Token Selection Modals */}
      {/* Token A Modal */}
      <Modal isCentered onClose={() => setIsTokenAModalOpen(false)} isOpen={isTokenAModalOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Token A</ModalHeader>
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
                  <Flex 
                    key={index} 
                    gap={4} 
                    alignItems={'center'} 
                    onClick={() => handleTokenSelection(coin, true)} 
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
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
            <Button colorScheme='blue' mr={3} onClick={() => setIsTokenAModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Token B Modal */}
      <Modal isCentered onClose={() => setIsTokenBModalOpen(false)} isOpen={isTokenBModalOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Token B</ModalHeader>
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
                  <Flex 
                    key={index} 
                    gap={4} 
                    alignItems={'center'} 
                    onClick={() => handleTokenSelection(coin, false)} 
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
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
            <Button colorScheme='blue' mr={3} onClick={() => setIsTokenBModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLiquidity; 