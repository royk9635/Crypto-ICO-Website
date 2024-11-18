import React, { useState } from 'react';
import { useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useChain } from '../context/ChainContext';

const WALLET_OPTIONS = [
  { id: 'metamask', name: 'MetaMask (BSC)', chain: 'BSC' },
  { id: 'phantom', name: 'Phantom (Solana)', chain: 'SOLANA' }
] as const;

export const WalletConnect = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { selectedChain, setSelectedChain } = useChain();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async (walletId: string) => {
    try {
      if (walletId === 'metamask') {
        if (!window.ethereum) {
          toast.error('Please install MetaMask');
          window.open('https://metamask.io/', '_blank');
          return;
        }
        await connect({ connector: injected() });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setSelectedChain('BSC');
        toast.success('Connected to MetaMask');
      } else if (walletId === 'phantom') {
        const phantom = window.phantom?.solana;
        if (!phantom) {
          toast.error('Please install Phantom wallet');
          window.open('https://phantom.app/', '_blank');
          return;
        }
        try {
          const connection = await phantom.connect();
          setWalletAddress(connection.publicKey.toString());
          setIsConnected(true);
          setSelectedChain('SOLANA');
          toast.success('Connected to Phantom wallet');
        } catch (err) {
          toast.error('Failed to connect to Phantom wallet');
        }
      }
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      if (selectedChain === 'BSC') {
        disconnect();
      } else if (selectedChain === 'SOLANA') {
        const phantom = window.phantom?.solana;
        if (phantom) {
          await phantom.disconnect();
        }
      }
      setWalletAddress(null);
      setIsConnected(false);
      setSelectedChain('BSC');
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    <div className="relative">
      {isConnected && walletAddress ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-300">
            {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          </span>
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Wallet size={16} />
            Connect Wallet
            <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                {WALLET_OPTIONS.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {wallet.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};