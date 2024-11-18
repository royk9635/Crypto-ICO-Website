export const CHAIN_CONFIG = {
  BSC: {
    name: 'BSC',
    symbol: 'BNB',
    decimals: 18,
    ownerAddress: '0x44F1f9E13002941Eaa897F6bE2188E7aF0A61A7b',
    minPurchase: 0.1,
    maxPurchase: 1.5, // Updated max purchase
    tokenPrice: 1.7, // USD price
    tokenPerBNB: 1235, // Updated tokens per BNB
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  },
  SOLANA: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    ownerAddress: import.meta.env.VITE_SOLANA_OWNER_ADDRESS,
    minPurchase: 0.5,
    maxPurchase: 50,
    tokenPrice: 1.7, // USD price
    tokenPerSOL: 850,
    rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL
  }
} as const;

export type ChainType = keyof typeof CHAIN_CONFIG;