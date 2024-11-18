import { bscTestnet } from 'wagmi/chains';
import { Connection, clusterApiUrl } from '@solana/web3.js';

// BSC Testnet Configuration
export const bscConfig = {
  chainId: bscTestnet.id,
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

// Solana Configuration
export const solanaConfig = {
  network: import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('devnet'),
  connection: new Connection(import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('devnet')),
};