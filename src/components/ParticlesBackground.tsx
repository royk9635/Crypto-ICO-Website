import React from 'react';
import Fireflies from './Fireflies';
import '../styles/particles.css';

const ParticlesBackground: React.FC = () => {
  return (
    <div className="particles-wrapper">
      {/* Fireflies will be rendered on top of this dark background */}
      <Fireflies />
    </div>
  );
};

export default ParticlesBackground;
