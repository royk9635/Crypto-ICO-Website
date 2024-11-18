import React, { useState } from 'react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Gift, AlertTriangle, Coins, Timer } from 'lucide-react';
import { parseEther, formatEther } from 'viem';
import { toast } from 'react-hot-toast';

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x44F1f9E13002941Eaa897F6bE2188E7aF0A61A7b";

export function AirdropClaim() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('0.1');
  
  const { data: balance } = useBalance({
    address: address,
  });

  const { writeContract, isPending } = useWriteContract();

  const handleClaim = async () => {
    try {
      const result = await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'claim',
        value: parseEther(amount),
      });

      toast.success('Transaction submitted!');
      
      const receipt = await useWaitForTransactionReceipt({
        hash: result,
      });

      if (receipt.status === 'success') {
        toast.success('Airdrop claimed successfully!');
      } else {
        toast.error('Transaction failed');
      }
    } catch (error) {
      console.error('Claim error:', error);
      toast.error('Failed to claim airdrop');
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl backdrop-blur-xl">
        <div className="flex items-center gap-3 text-yellow-500">
          <AlertTriangle size={24} />
          <p className="font-medium">Please connect your wallet to claim the airdrop.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Airdrop Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="text-yellow-500" size={20} />
            <span className="text-gray-400">Available Tokens</span>
          </div>
          <p className="text-2xl font-bold text-white">995 BWT</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="text-yellow-500" size={20} />
            <span className="text-gray-400">Token Value</span>
          </div>
          <p className="text-2xl font-bold text-white">$56.00</p>
        </div>
      </div>

      {/* Claim Card */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700">
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
                {balance ? formatEther(balance.value) : '0'} BNB
              </span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.1"
              step="0.1"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter BNB amount"
            />
          </div>

          <button
            onClick={handleClaim}
            disabled={isPending || !amount}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg px-6 py-3 font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Claiming...' : 'Claim Now'}
          </button>

          <p className="text-sm text-gray-400 text-center">
            Note: This will transfer the specified amount to the contract owner.
          </p>
        </div>
      </div>
    </div>
  );
}