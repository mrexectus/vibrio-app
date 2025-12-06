import React, { useEffect, useState } from 'react';

interface VibrioGaugeProps {
  score: number;
}

const VibrioGauge: React.FC<VibrioGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 55;
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
    <div className="relative w-36 h-36 flex items-center justify-center">
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
        <span className="text-4xl font-serif text-chic-deep font-medium">{displayScore}</span>
        <span className="text-[8px] uppercase tracking-widest text-chic-accent mt-1">Uyum</span>
      </div>
    </div>
  );
};
export default VibrioGauge;