import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ChakraProvider } from '@chakra-ui/react'



const manifestUrl =
  "https://salmon-academic-heron-126.mypinata.cloud/ipfs/bafkreib6qbfo3ty7hews5os7xcggc3jvi6a4my5vbsjz32aeyqatoxjpuq";

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ChakraProvider>
    <App />
    </ChakraProvider>
    </TonConnectUIProvider>
  </React.StrictMode>,
)
