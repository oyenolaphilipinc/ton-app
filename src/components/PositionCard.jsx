import React from 'react';
import { Card, CardBody, Flex, Image, Text, Badge, Box, Progress } from '@chakra-ui/react';
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle } from 'lucide-react';

const PositionCard = ({ position, onRemove, onAddMore }) => {
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return parseFloat(num).toFixed(2);
  };

  const calculateImpermanentLoss = () => {
    // Mock calculation - in real implementation this would be calculated from price changes
    const baseLoss = Math.random() * 5; // 0-5% random loss for demo
    return baseLoss.toFixed(2);
  };

  const getLossColor = (loss) => {
    const lossNum = parseFloat(loss);
    if (lossNum < 1) return 'green';
    if (lossNum < 3) return 'yellow';
    return 'red';
  };

  const impermanentLoss = calculateImpermanentLoss();
  const lossColor = getLossColor(impermanentLoss);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        {/* Position Header */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={2}>
            <Box position="relative">
              <Image 
                src={position.pool.tokenA.imageUrl} 
                w={12} 
                h={12} 
                rounded="full" 
                border="2px solid white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
              />
              <Image 
                src={position.pool.tokenB.imageUrl} 
                w={12} 
                h={12} 
                rounded="full" 
                border="2px solid white"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                position="absolute"
                top="0"
                left="8"
              />
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {position.pool.tokenA.symbol}/{position.pool.tokenB.symbol}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Position Value: ${formatNumber(parseFloat(position.value))}
              </Text>
            </Box>
          </Flex>
          <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
            Active
          </Badge>
        </Flex>

        {/* Position Stats */}
        <Box mb={4}>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">LP Tokens</Text>
            <Text fontSize="sm" fontWeight="medium">{formatNumber(parseFloat(position.lpTokens))}</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">{position.pool.tokenA.symbol} Share</Text>
            <Text fontSize="sm" fontWeight="medium">{formatNumber(parseFloat(position.tokenAShare))}</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">{position.pool.tokenB.symbol} Share</Text>
            <Text fontSize="sm" fontWeight="medium">{formatNumber(parseFloat(position.tokenBShare))}</Text>
          </Flex>
        </Box>

        {/* Performance Metrics */}
        <Box mb={4} p={3} bg="gray.50" borderRadius="lg">
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="medium">Performance</Text>
            <Flex align="center" gap={1}>
              <TrendingUp size={16} className="text-green-500" />
              <Text fontSize="sm" color="green.500" fontWeight="medium">
                {position.apr}% APR
              </Text>
            </Flex>
          </Flex>
          
          {/* Impermanent Loss Warning */}
          <Flex align="center" gap={2} mb={2}>
            <AlertTriangle size={16} className={`text-${lossColor}-500`} />
            <Text fontSize="sm" color={`${lossColor}.500`}>
              Impermanent Loss: {impermanentLoss}%
            </Text>
          </Flex>
          
          {/* Time in Position */}
          <Flex align="center" gap={2}>
            <Clock size={16} className="text-gray-500" />
            <Text fontSize="sm" color="gray.600">
              In position for 15 days
            </Text>
          </Flex>
        </Box>

        {/* Action Buttons */}
        <Flex gap={2}>
          <button 
            onClick={() => onAddMore(position)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add More
          </button>
          <button 
            onClick={() => onRemove(position)}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PositionCard; 