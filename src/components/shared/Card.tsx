import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', animate = true }) => {
  const baseClasses = 'bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300';
  
  if (!animate) {
    return (
      <div className={`${baseClasses} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};