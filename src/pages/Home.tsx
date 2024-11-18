import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap, Timer, BarChart2, Users, Coins } from 'lucide-react';
import { Container, Card } from '../components/shared';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-metaverse-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="fixed inset-0 cyber-particles opacity-20 pointer-events-none" />
      
      <Container className="py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient-3d floating-3d">
            BWT Token Presale
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join our presale at launch price of $1.70 USD per token
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <Link 
              to="/airdrop" 
              className="px-8 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 pointer-events-auto"
            >
              Claim Airdrop
            </Link>
            <Link 
              to="/token-sale" 
              className="px-8 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 hover:scale-105 pointer-events-auto"
            >
              Buy Tokens
            </Link>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <Card className="text-center p-6">
            <Timer className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Presale Stage</h3>
            <p className="text-2xl font-bold text-yellow-400">Stage 1/3</p>
          </Card>
          
          <Card className="text-center p-6">
            <BarChart2 className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Token Launch Price</h3>
            <p className="text-2xl font-bold text-green-400">$1.70</p>
          </Card>
          
          <Card className="text-center p-6">
            <Coins className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rate</h3>
            <p className="text-2xl font-bold text-blue-400">1,235 BWT/BNB</p>
          </Card>
          
          <Card className="text-center p-6">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Max Purchase</h3>
            <p className="text-2xl font-bold text-purple-400">1.5 BNB</p>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-12 h-12" />,
              title: "Secure Presale",
              description: "Audited smart contracts with multi-signature wallet protection"
            },
            {
              icon: <Rocket className="w-12 h-12" />,
              title: "Early Access",
              description: "Be among the first to own BWT tokens at the lowest price"
            },
            {
              icon: <Zap className="w-12 h-12" />,
              title: "Instant Distribution",
              description: "Tokens are automatically sent to your wallet after purchase"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-purple-400 mb-4 floating-3d">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gradient-3d">{feature.title}</h3>
              <p className="text-purple-200">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;