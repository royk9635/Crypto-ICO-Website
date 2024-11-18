import React from 'react';
import '../styles/animatedScene.css';

const AnimatedScene: React.FC = () => {
  return (
    <div className="scene-wrapper">
      {/* Sun */}
      <div className="sun absolute top-8 right-12 z-10">
        <span className="block w-16 h-16 bg-yellow-400/80 rounded-full shadow-lg shadow-yellow-400/30" />
      </div>

      {/* Clouds */}
      <div className="clouds absolute top-12 left-0 right-0 z-20">
        <div className="cloud-left absolute left-8">
          <span className="block w-12 h-6 bg-white/80 rounded-full" />
          <span className="block w-8 h-4 bg-white/80 rounded-full absolute -top-2 left-2" />
        </div>
        <div className="cloud-middle absolute left-1/3">
          <span className="block w-16 h-8 bg-white/80 rounded-full" />
          <span className="block w-10 h-6 bg-white/80 rounded-full absolute -top-3 left-3" />
        </div>
        <div className="cloud-right absolute right-12">
          <span className="block w-14 h-7 bg-white/80 rounded-full" />
          <span className="block w-9 h-5 bg-white/80 rounded-full absolute -top-2 left-2" />
        </div>
      </div>

      {/* Hills */}
      <div className="hills absolute bottom-24 left-0 right-0 z-30">
        <div className="hill relative h-32">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-800/50 to-emerald-900/50 rounded-t-full transform -skew-x-6" />
          <div className="absolute bottom-0 left-1/4 right-0 h-24 bg-gradient-to-b from-emerald-800/30 to-emerald-900/30 rounded-t-full transform skew-x-12" />
        </div>
      </div>

      {/* Trees */}
      <div className="trees absolute bottom-40 left-0 right-0 z-40">
        <div className="left-tree">
          <div className="w-6 h-12 bg-gradient-to-b from-emerald-700 to-emerald-900 rounded-t-full" />
          <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-900 to-yellow-950 mx-auto" />
        </div>
      </div>

      {/* Water */}
      <div className="water absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-500/50 to-blue-600/50 z-50">
        <div className="water-wrap relative w-[150%] h-full">
          <div className="water-lines absolute top-2 left-0 w-full">
            <span className="block w-12 h-0.5 bg-blue-300/30 rounded-full mb-2" />
            <span className="block w-16 h-0.5 bg-blue-300/30 rounded-full mb-2 ml-4" />
            <span className="block w-10 h-0.5 bg-blue-300/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* Ship */}
      <div className="ship absolute bottom-16 left-1/3 z-[51]">
        <div className="w-16 h-8">
          <div className="w-full h-4 bg-gradient-to-r from-red-600 to-red-800 rounded-b-lg" />
          <div className="w-1 h-8 bg-gray-700 absolute -top-6 left-1/2" />
          <div className="w-8 h-6 border-t-2 border-l-2 border-gray-700 absolute -top-6 left-1/2 
                        transform -translate-x-1/2 rotate-45" />
        </div>
      </div>

      {/* Fish */}
      <div className="fish-wrap absolute bottom-8 z-[52]">
        <div className="w-4 h-2">
          <div className="w-3 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
          <div className="w-1 h-2 border-r-2 border-t-2 border-b-2 border-orange-500 
                        absolute top-0 right-0 rounded-r-full" />
        </div>
      </div>

      {/* Birds */}
      <div className="birds absolute top-16 right-1/4 z-[53]">
        <div className="bird-wrapper">
          <span className="block w-4 h-0.5 bg-gray-800/80 rotate-[30deg]" />
          <span className="block w-4 h-0.5 bg-gray-800/80 -rotate-[30deg] -ml-2" />
        </div>
        <div className="bird-wrapper snd absolute -top-4 -right-8">
          <span className="block w-4 h-0.5 bg-gray-800/80 rotate-[30deg]" />
          <span className="block w-4 h-0.5 bg-gray-800/80 -rotate-[30deg] -ml-2" />
        </div>
        <div className="bird-wrapper trd absolute -top-2 -right-16">
          <span className="block w-4 h-0.5 bg-gray-800/80 rotate-[30deg]" />
          <span className="block w-4 h-0.5 bg-gray-800/80 -rotate-[30deg] -ml-2" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedScene;
