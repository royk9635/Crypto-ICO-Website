import React, { useEffect, useRef } from 'react';

const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with pixel ratio for better quality
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Wave parameters
    const waves = [
      {
        wavelength: 400,
        amplitude: 40,
        speed: 0.04,
        frequency: 2,
        color: 'rgba(147, 51, 234, 0.15)' // Purple
      },
      {
        wavelength: 300,
        amplitude: 30,
        speed: 0.03,
        frequency: 1.5,
        color: 'rgba(59, 130, 246, 0.15)' // Blue
      },
      {
        wavelength: 200,
        amplitude: 20,
        speed: 0.02,
        frequency: 1,
        color: 'rgba(6, 182, 212, 0.15)' // Cyan
      }
    ];

    let time = 0;
    let animationFrameId: number;

    const drawWave = (
      wavelength: number,
      amplitude: number,
      speed: number,
      frequency: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x <= window.innerWidth; x += 1) {
        const y = Math.sin((x / wavelength + time * speed) * frequency) * amplitude;
        const baseY = canvas.height / 2 + y;

        // Create smooth curve instead of straight lines
        if (x === 0) {
          ctx.moveTo(x, baseY);
        } else {
          ctx.lineTo(x, baseY);
        }
      }

      // Complete the wave shape
      ctx.lineTo(window.innerWidth, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // Add gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color.replace('0.15', '0.1'));
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, color.replace('0.15', '0.05'));
      
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw waves from back to front
      waves.forEach(wave => {
        drawWave(
          wave.wavelength,
          wave.amplitude,
          wave.speed,
          wave.frequency,
          wave.color
        );
      });

      time += 0.01; // Slower time increment for smoother animation
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0,
        opacity: 0.8,
        mixBlendMode: 'soft-light'
      }}
    />
  );
};

export default WaveBackground;
