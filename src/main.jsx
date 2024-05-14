import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ChakraProvider } from '@chakra-ui/react'


const manifestUrl =
  "https://rose-gothic-goose-655.mypinata.cloud/ipfs/QmXZoJcQqFTFyo4VadNdU6b3eNkhqv2VrTTYGGqjAvq6Sr";

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ChakraProvider>
    <App />
    </ChakraProvider>
    </TonConnectUIProvider>
  </React.StrictMode>,
)
