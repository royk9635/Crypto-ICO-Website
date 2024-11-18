import React, { createContext, useContext, useState } from 'react';
import { CHAIN_CONFIG, type ChainType } from '../config/constants';

interface ChainContextType {
  selectedChain: ChainType;
  setSelectedChain: (chain: ChainType) => void;
  getChainConfig: () => typeof CHAIN_CONFIG[ChainType];
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const ChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<ChainType>('BSC');

  const getChainConfig = () => {
    return CHAIN_CONFIG[selectedChain];
  };

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain, getChainConfig }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error('useChain must be used within a ChainProvider');
  }
  return context;
};