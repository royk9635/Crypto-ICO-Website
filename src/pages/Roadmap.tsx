import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container, PageHeader } from '../components/shared';
import { Rocket, Zap, Globe, Lock, Star, Target, Gem } from 'lucide-react';
import WaveBackground from '../components/WaveBackground';
import AnimatedScene from '../components/AnimatedScene';
import Fireflies from '../components/Fireflies';
import ParticlesBackground from '../components/ParticlesBackground';
import '../styles/roadmap.css';

const roadmapData = [
  {
    quarter: "Q2 2024",
    title: "Foundation Phase",
    icon: <Lock className="w-8 h-8" />,
    items: [
      "Token Smart Contract Development",
      "Security Audit by CertiK",
      "Website & Whitepaper Launch",
      "Community Building & Social Media Presence"
    ],
    gradient: "from-purple-600 to-blue-600",
    status: "Upcoming"
  },
  {
    quarter: "Q3 2024",
    title: "Launch Phase",
    icon: <Rocket className="w-8 h-8" />,
    items: [
      "Private Sale & Presale Events",
      "PancakeSwap DEX Listing",
      "CoinGecko & CMC Listings",
      "Initial Marketing Campaign"
    ],
    gradient: "from-blue-600 to-cyan-600",
    status: "Planning"
  },
  {
    quarter: "Q4 2024",
    title: "Growth Phase",
    icon: <Star className="w-8 h-8" />,
    items: [
      "Staking Platform Launch",
      "Mobile App Beta Release",
      "Strategic Partnerships",
      "Community Governance Implementation"
    ],
    gradient: "from-cyan-600 to-teal-600",
    status: "Planning"
  },
  {
    quarter: "Q1 2025",
    title: "Expansion Phase",
    icon: <Target className="w-8 h-8" />,
    items: [
      "Cross-chain Bridge Development",
      "Major CEX Listings",
      "NFT Marketplace Launch",
      "Enhanced DeFi Features"
    ],
    gradient: "from-teal-600 to-green-600",
    status: "Planning"
  },
  {
    quarter: "Q2 2025",
    title: "Innovation Phase",
    icon: <Gem className="w-8 h-8" />,
    items: [
      "Metaverse Integration",
      "Web3 Gaming Platform",
      "Global Marketing Expansion",
      "Enterprise Partnerships"
    ],
    gradient: "from-green-600 to-emerald-600",
    status: "Planning"
  }
];

const Roadmap = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen">
      {/* Remove any background colors from the gradient classes */}
      <ParticlesBackground />
      
      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">
        {/* Animated Wave Background */}
        <WaveBackground />
        
        {/* Animated Scene */}
        <div className="absolute inset-0 pointer-events-none" style={{ height: '50vh' }}>
          <AnimatedScene />
        </div>
        
        {/* Content Container with Enhanced Glass Effect */}
        <Container className="relative py-20 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <PageHeader
              title="Roadmap"
              description="Our strategic journey towards building a revolutionary Web3 ecosystem"
              className="text-glow relative z-30"
            />
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative mt-40"
          >
            {/* Enhanced Timeline Line */}
            <div className="timeline-line absolute left-[50%] top-0 bottom-0 w-1 hidden lg:block">
              <div className="h-full bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-50 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-timeline-glow"></div>
            </div>

            {roadmapData.map((phase, index) => (
              <motion.div
                key={phase.quarter}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative mb-16 last:mb-0 ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:text-right'}`}
              >
                {/* Enhanced Timeline Node */}
                <div className={`
                  timeline-node hidden lg:flex absolute top-0 
                  ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}
                  w-20 h-20 rounded-full bg-black/40 backdrop-blur-md
                  items-center justify-center z-10
                  shadow-glow border-4 border-gradient
                  hover:scale-110 transition-transform duration-300
                  group
                `}>
                  <div className="node-content relative w-full h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/5"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {React.cloneElement(phase.icon, {
                        className: 'w-10 h-10 transform group-hover:scale-110 transition-transform duration-300 text-white/90 group-hover:text-white icon-glow'
                      })}
                    </div>
                  </div>
                </div>

                {/* Enhanced Content Card */}
                <motion.div
                  className={`
                    relative p-8 rounded-2xl
                    bg-black/40 backdrop-blur-xl
                    border border-white/10
                    card-glow
                    hover:shadow-[0_0_80px_rgba(147,51,234,0.2)]
                    transition-all duration-500
                    group
                    z-30
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Phase Status and Quarter with Enhanced Styling */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="quarter-badge px-3 py-1 text-sm font-semibold rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                      {phase.quarter}
                    </span>
                    <span className={`status-badge px-3 py-1 text-sm font-semibold rounded-full 
                      ${phase.status === 'Upcoming' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {phase.status}
                    </span>
                  </div>
                  
                  {/* Enhanced Phase Title */}
                  <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${phase.gradient} 
                    group-hover:scale-105 transition-transform duration-300 title-glow`}>
                    {phase.title}
                  </h3>

                  {/* Enhanced Phase Items */}
                  <ul className="space-y-3">
                    {phase.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + itemIndex * 0.1 }}
                        className="item-glow flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors duration-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse-slow"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default Roadmap;