import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-yellow-400 border-yellow-400' : 'text-gray-300 hover:text-yellow-400 border-transparent';
  };

  return (
    <nav className="backdrop-blur-xl bg-gray-900/80 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Coins className="h-8 w-8 text-yellow-400 group-hover:animate-spin-slow" />
              <span className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                BWT Token
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/token-sale', label: 'Token Sale' },
                { path: '/tokenomics', label: 'Tokenomics' },
                { path: '/roadmap', label: 'Roadmap' },
                { path: '/team', label: 'Team' },
                { path: '/airdrop', label: 'Airdrop' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${isActive(item.path)} px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2`}
                >
                  {item.label}
                </Link>
              ))}
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;