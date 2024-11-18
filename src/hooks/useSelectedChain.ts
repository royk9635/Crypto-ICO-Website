import { useState, useEffect } from 'react';

interface Chain {
  id: string;
  name: string;
  symbol: string;
}

export function useSelectedChain() {
  const [selectedChain, setSelectedChain] = useState<Chain>({
    id: 'BSC',
    name: 'BSC',
    symbol: 'BNB'
  });

  useEffect(() => {
    // Get initial chain from localStorage
    const storedChain = localStorage.getItem('selectedChain');
    if (storedChain) {
      const chain = {
        BSC: { id: 'BSC', name: 'BSC', symbol: 'BNB' },
        SOL: { id: 'SOL', name: 'Solana', symbol: 'SOL' },
        TRX: { id: 'TRX', name: 'TRON', symbol: 'TRX' }
      }[storedChain];
      
      if (chain) {
        setSelectedChain(chain);
      }
    }

    // Listen for chain changes
    const handleChainChange = (event: CustomEvent) => {
      setSelectedChain(event.detail);
    };

    window.addEventListener('chainChanged', handleChainChange as EventListener);
    return () => {
      window.removeEventListener('chainChanged', handleChainChange as EventListener);
    };
  }, []);

  return selectedChain;
}