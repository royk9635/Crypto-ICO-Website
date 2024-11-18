import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: SocialLinks;
}

export const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, bio, social }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
    >
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded-lg mb-4 group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-yellow-400 font-medium mb-2">{role}</p>
      <p className="text-gray-400 text-sm mb-4">{bio}</p>
      
      <div className="flex space-x-4">
        {social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Twitter size={20} />
          </a>
        )}
        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        )}
        {social.github && (
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
};