import React, { useState, useEffect } from 'react';
import "./App.css";
import Navbar from './Navbar';
import Header from './Header';
import Liquidity from './Liquidity';
import Footer from './Footer';
import { DeDustClient } from '@dedust/sdk';
import { Spinner, Flex } from "@chakra-ui/react";
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('swap'); // 'swap' or 'liquidity'

  const getPools = async () => {
    try {
      const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });
      const pools = await dedustClient.getPools();
      
      // Filter pools with totalSupply more than 1000 and non-null metadata
      const filteredPools = pools.filter(pool => parseInt(pool.totalSupply) > 10 && pool.assets[0].metadata !== null);
      
      // Create a Map to store unique names and their corresponding image URLs and symbols
      const uniqueNamesWithImages = new Map();
      console.log(filteredPools)
      // Extract and store unique names and their corresponding image URLs from filtered pools
      filteredPools.forEach(pool => {
        const metadata = pool.assets[0].metadata;
        const address = pool.assets[0].address
        if (metadata) {
          const name = metadata.name;
          const imageUrl = metadata.image;
          const symbol = metadata.symbol;
          const contractAddress = address
          const combinedInfo = { imageUrl, symbol, contractAddress };
          if (!uniqueNamesWithImages.has(name)) {
            uniqueNamesWithImages.set(name, combinedInfo);
          }
        }
      });
  
      // Convert the Map to an array of objects for easier handling
      const uniqueNamesArray = Array.from(uniqueNamesWithImages, ([name, info]) => ({ name, ...info }));
      
      return uniqueNamesArray;
    } catch (error) {
      console.log(error);
      return []; // Return an empty array in case of error
    }
  }
  
  useEffect(() => {
    getPools().then(uniqueNamesArray => {
      setCoins(uniqueNamesArray);
      setLoading(false); // Set loading to false when data is loaded
      console.log('Unique Names with Images:', uniqueNamesArray);
    });
  }, []);

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading ? (
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <div>
          {activeTab === 'swap' ? (
            <Header coins={coins} />
          ) : (
            <ErrorBoundary>
              <Liquidity coins={coins} />
            </ErrorBoundary>
          )}
          <Footer />
        </div>
      )}
    </div>
  )
}

export default App;
