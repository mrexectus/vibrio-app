import React, { useEffect, useState } from 'react';

interface VibrioGaugeProps {
  score: number;
}

const VibrioGauge: React.FC<VibrioGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  // Reduced size: Radius 40 (was 55), stroke 3
  const radius = 40;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.min(Math.round(easeOut * score), score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle 
          stroke="#F3E5E5" 
          strokeWidth={stroke} 
          fill="transparent" 
          r={normalizedRadius} 
          cx={radius} 
          cy={radius} 
        />
        <circle
          stroke="url(#gradientScore)"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#9D8189" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-serif text-chic-deep font-medium">{displayScore}</span>
      </div>
    </div>
  );
};
export default VibrioGauge;