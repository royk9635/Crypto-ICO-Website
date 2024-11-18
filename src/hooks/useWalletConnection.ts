import { create } from 'zustand';
import { useAccount } from 'wagmi';
import { CHAIN_CONFIG } from '../config/constants';
import { useEffect } from 'react';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  walletType: 'BSC' | 'SOLANA' | null;
  chainConfig: typeof CHAIN_CONFIG.BSC | typeof CHAIN_CONFIG.SOLANA;
  setWallet: (params: Partial<WalletState>) => void;
  disconnect: () => void;
}

const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  walletType: null,
  chainConfig: CHAIN_CONFIG.BSC,
  setWallet: (params) => set((state) => ({ ...state, ...params })),
  disconnect: () => set({ address: null, isConnected: false, walletType: null, chainConfig: CHAIN_CONFIG.BSC })
}));

export function useWalletConnection() {
  const { address: bscAddress, isConnected: isBscConnected } = useAccount();
  const walletStore = useWalletStore();

  // Handle BSC wallet connection
  useEffect(() => {
    if (isBscConnected && bscAddress) {
      walletStore.setWallet({
        address: bscAddress,
        isConnected: true,
        walletType: 'BSC',
        chainConfig: CHAIN_CONFIG.BSC
      });
    }
  }, [bscAddress, isBscConnected]);

  // Handle Phantom wallet connection
  useEffect(() => {
    const checkPhantomConnection = async () => {
      const phantom = (window as any).phantom?.solana;
      if (phantom?.isConnected) {
        try {
          const publicKey = phantom.publicKey?.toString();
          if (publicKey) {
            walletStore.setWallet({
              address: publicKey,
              isConnected: true,
              walletType: 'SOLANA',
              chainConfig: CHAIN_CONFIG.SOLANA
            });
          }
        } catch (error) {
          console.error('Error getting Phantom wallet address:', error);
        }
      }
    };

    checkPhantomConnection();

    const handlePhantomConnect = () => checkPhantomConnection();
    const handlePhantomDisconnect = () => walletStore.disconnect();

    const phantom = (window as any).phantom?.solana;
    if (phantom) {
      phantom.on('connect', handlePhantomConnect);
      phantom.on('disconnect', handlePhantomDisconnect);

      return () => {
        phantom.removeListener('connect', handlePhantomConnect);
        phantom.removeListener('disconnect', handlePhantomDisconnect);
      };
    }
  }, []);

  return walletStore;
}