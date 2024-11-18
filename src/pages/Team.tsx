import React from 'react';
import { Container, PageHeader, TeamCard } from '../components/shared';

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Former VP of Engineering at Ethereum Foundation with 15+ years in blockchain",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Blockchain architect with background in cryptography and distributed systems",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
    bio: "Product strategist specializing in DeFi and Web3 applications",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "Emily Zhang",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    bio: "Smart contract expert with focus on security and optimization",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "David Kumar",
    role: "Security Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Cybersecurity specialist with expertise in blockchain security",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    name: "Lisa Anderson",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    bio: "Community building expert with 8+ years in crypto space",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  }
];

const Team = () => {
  return (
    <Container className="py-20">
      <PageHeader
        title="Our Team"
        description="Meet the experts behind BWT Token's innovation and success"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Join Our Team</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          We're always looking for talented individuals who are passionate about blockchain technology and want to make a difference.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
        >
          View Open Positions
        </a>
      </div>
    </Container>
  );
};

export default Team;