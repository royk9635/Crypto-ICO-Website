import React from 'react';
import '../styles/fireflies.css';

const Fireflies: React.FC = () => {
  // Create an array of 15 fireflies
  const fireflies = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="fireflies-container">
      {fireflies.map((i) => (
        <div key={i} className={`firefly firefly-${i}`} />
      ))}
    </div>
  );
};

export default Fireflies;
