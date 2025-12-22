
import React, { useEffect, useState } from 'react';

interface VibrioGaugeProps {
  score: number;
}

const VibrioGauge: React.FC<VibrioGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  const size = 200;
  const center = size / 2;
  const radius = 85;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const duration = 2500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 5); // Ultra smooth ease
      setDisplayScore(Math.round(ease * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90 overflow-visible">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--chic-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--chic-primary)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
            style={{ filter: 'drop-shadow(0 0 10px rgba(212, 163, 115, 0.2))' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-serif font-bold text-chic-deep tracking-tighter">
            {displayScore}
          </span>
          <span className="text-[9px] font-bold tracking-[0.4em] mt-2 opacity-30 uppercase">
            Uyum Endeksi
          </span>
        </div>
      </div>
    </div>
  );
};

export default VibrioGauge;