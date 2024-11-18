import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';
import { ChainProvider } from './context/ChainContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tokenomics from './pages/Tokenomics';
import Roadmap from './pages/Roadmap';
import Airdrop from './pages/Airdrop';
import TokenSale from './pages/TokenSale';
import Team from './pages/Team';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [bscTestnet],
  connectors: [injected()],
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
  }
});

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ChainProvider>
          <Router>
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tokenomics" element={<Tokenomics />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/airdrop" element={<Airdrop />} />
                <Route path="/token-sale" element={<TokenSale />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </div>
            <Toaster position="bottom-right" />
          </Router>
        </ChainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;