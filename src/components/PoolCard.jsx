import React from 'react';
import { Card, CardBody, Flex, Image, Text, Badge, Box } from '@chakra-ui/react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const PoolCard = ({ pool, onClick, isSelected = false }) => {
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return parseFloat(num).toFixed(2);
  };

  const calculateAPR = () => {
    const baseAPR = 8.5;
    const volumeMultiplier = parseFloat(pool.volume24h) / 1000000;
    return Math.min(baseAPR + volumeMultiplier, 25).toFixed(2);
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onClick(pool)}
    >
      <CardBody>
        {/* Pool Header */}
        <Flex justify="space-between" align="center" mb={3}>
          <Flex align="center" gap={2}>
            <Box position="relative">
              <Image 
                src={pool.tokenA.imageUrl} 
                w={10} 
                h={10} 
                rounded="full" 
                border="2px solid white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
              />
              <Image 
                src={pool.tokenB.imageUrl} 
                w={10} 
                h={10} 
                rounded="full" 
                border="2px solid white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                position="absolute"
                top="0"
                left="6"
              />
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {pool.tokenA.symbol}/{pool.tokenB.symbol}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {pool.tokenA.name} / {pool.tokenB.name}
              </Text>
            </Box>
          </Flex>
          <Badge colorScheme="green" fontSize="sm" px={2} py={1}>
            ${formatNumber(parseFloat(pool.tvl))}
          </Badge>
        </Flex>

        {/* Pool Stats */}
        <Flex justify="space-between" align="center" mb={3}>
          <Flex align="center" gap={1}>
            <DollarSign size={16} className="text-gray-500" />
            <Text fontSize="sm" color="gray-600">
              Vol: ${formatNumber(parseFloat(pool.volume24h))}
            </Text>
          </Flex>
          <Flex align="center" gap={1}>
            <TrendingUp size={16} className="text-green-500" />
            <Text fontSize="sm" color="green.500" fontWeight="medium">
              {calculateAPR()}% APR
            </Text>
          </Flex>
        </Flex>

        {/* Pool Details */}
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={1}>
            <Users size={16} className="text-gray-500" />
            <Text fontSize="sm" color="gray.600">
              {formatNumber(parseFloat(pool.totalSupply))} LP
            </Text>
          </Flex>
          <Badge colorScheme="blue" variant="outline" fontSize="xs">
            Active
          </Badge>
        </Flex>

        {/* Quick Actions */}
        <Flex gap={2} mt={3}>
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Add Liquidity
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            View Details
          </button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PoolCard; 