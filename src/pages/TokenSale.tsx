import React, { useState } from 'react';
import { useAccount, useBalance, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Coins, Timer } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useChain } from '../context/ChainContext';
import { Container, Card, Button } from '../components/shared';

const TokenSale = () => {
  const { selectedChain, getChainConfig } = useChain();
  const chainConfig = getChainConfig();
  
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const { writeContract } = useWriteContract();

  const calculateTokens = (amount: string) => {
    if (!amount) return '0';
    return (Number(amount) * chainConfig.tokenPerBNB).toString();
  };

  const handlePurchase = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    const purchaseAmount = Number(amount);
    if (purchaseAmount < chainConfig.minPurchase || purchaseAmount > chainConfig.maxPurchase) {
      toast.error(`Amount must be between ${chainConfig.minPurchase} and ${chainConfig.maxPurchase} ${chainConfig.symbol}`);
      return;
    }

    setLoading(true);
    try {
      await writeContract({
        address: chainConfig.ownerAddress as `0x${string}`,
        abi: [{
          name: 'buyTokens',
          type: 'function',
          stateMutability: 'payable',
          inputs: [],
          outputs: []
        }],
        functionName: 'buyTokens',
        value: parseEther(amount),
      });
      
      toast.success(`Successfully purchased ${calculateTokens(amount)} BWT tokens!`);
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to purchase tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-gray-400">Token Launch Price</span>
            </div>
            <p className="text-2xl font-bold text-white">$1.70 USD</p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-gray-400">Rate</span>
            </div>
            <p className="text-2xl font-bold text-white">1,235 BWT/BNB</p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Coins className="text-yellow-400" size={20} />
              <span className="text-gray-400">Max Purchase</span>
            </div>
            <p className="text-2xl font-bold text-white">1.5 BNB</p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Timer className="text-yellow-400" size={20} />
              <span className="text-gray-400">Sale Ends In</span>
            </div>
            <p className="text-2xl font-bold text-white">48h</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-2xl font-bold mb-8">Purchase Tokens</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-400">Amount in {chainConfig.symbol}</label>
                <span className="text-sm text-gray-400">
                  Balance: {balance ? formatEther(balance.value) : '0'} {chainConfig.symbol}
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={chainConfig.minPurchase}
                max={chainConfig.maxPurchase}
                step="0.1"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder={`Enter ${chainConfig.symbol} amount`}
              />
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">You'll receive:</span>
                <span className="text-white font-medium">
                  {calculateTokens(amount)} BWT
                </span>
              </div>
            </div>

            <Button
              onClick={handlePurchase}
              disabled={!isConnected || loading || !amount}
              isLoading={loading}
              className="w-full"
            >
              {!isConnected ? 'Connect Wallet to Purchase' : loading ? 'Processing...' : 'Purchase Tokens'}
            </Button>

            <div className="text-sm text-gray-400">
              <p>• Minimum purchase: {chainConfig.minPurchase} {chainConfig.symbol}</p>
              <p>• Maximum purchase: {chainConfig.maxPurchase} {chainConfig.symbol}</p>
              <p>• Rate: 1 {chainConfig.symbol} = {chainConfig.tokenPerBNB} BWT</p>
              <p>• Tokens will be automatically sent to your wallet</p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default TokenSale;