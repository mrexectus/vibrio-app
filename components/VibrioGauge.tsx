
import React, { useEffect, useState } from 'react';

interface VibrioGaugeProps {
  score: number;
  metrics?: {
    trust: number;
    passion: number;
    communication: number;
  };
}

const METRIC_DETAILS = {
  trust: {
    label: "GÜVEN",
    icon: "🛡️",
    desc: "Duygusal emniyetin temelidir. Savunma mekanizmalarının yerini gerçek yakınlığın ve şeffaflığın almasını sağlar."
  },
  passion: {
    label: "TUTKU",
    icon: "🔥",
    desc: "İlişkinin motor gücüdür. Fiziksel çekimin ötesinde, partnerler arasındaki bitmek bilmeyen keşif arzusunu temsil eder."
  },
  communication: {
    label: "İLETİŞİM",
    icon: "💬",
    desc: "Ruhsal veri aktarım hattıdır. Kelimelerin ötesindeki sessiz anlaşma, empati ve çatışma çözme kapasitesidir."
  }
};

const VibrioGauge: React.FC<VibrioGaugeProps> = ({ score, metrics }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [displayMetrics, setDisplayMetrics] = useState({
    trust: 0,
    passion: 0,
    communication: 0
  });
  const [activeTooltip, setActiveTooltip] = useState<keyof typeof METRIC_DETAILS | null>(null);
  
  const size = 160;
  const center = size / 2;
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayScore(Math.min(Math.round(ease * score), score));
      
      if (metrics) {
        setDisplayMetrics({
          trust: Math.min(Math.round(ease * metrics.trust), metrics.trust),
          passion: Math.min(Math.round(ease * metrics.passion), metrics.passion),
          communication: Math.min(Math.round(ease * metrics.communication), metrics.communication),
        });
      }
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [score, metrics]);

  const getStatus = (s: number) => {
    if (s < 50) return { label: "KRİTİK", color: "#9D8189" };
    if (s < 75) return { label: "DENGELİ", color: "#D4A373" };
    if (s < 90) return { label: "GÜÇLÜ", color: "#8A9A5B" };
    return { label: "KOZMİK", color: "#463F3A" };
  };

  const status = getStatus(displayScore);
  const offset = circumference - (displayScore / 100) * circumference;

  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i / 60) * 360;
    const isMajor = i % 10 === 0;
    return (
      <line
        key={i}
        x1={center}
        y1={10}
        x2={center}
        y2={isMajor ? 18 : 14}
        stroke={isMajor ? "#D4A373" : "#E6CCB2"}
        strokeWidth={isMajor ? 2 : 1}
        transform={`rotate(${angle} ${center} ${center})`}
        opacity={0.6}
      />
    );
  });

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
             <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9D8189" />
                <stop offset="50%" stopColor="#D4A373" />
                <stop offset="100%" stopColor="#8A9A5B" />
             </linearGradient>
             <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                   <feMergeNode in="coloredBlur" />
                   <feMergeNode in="SourceGraphic" />
                </feMerge>
             </filter>
          </defs>
          <g>{ticks}</g>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#F3E5E5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            filter="url(#glow)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-serif font-bold text-chic-deep tracking-tighter">
            {displayScore}
          </span>
          <span className="text-[9px] font-sans font-bold tracking-[0.2em] mt-1" style={{ color: status.color }}>
            {status.label}
          </span>
        </div>
      </div>

      {metrics && (
        <div className="flex gap-4 mt-4 relative w-full justify-center">
          {(Object.keys(METRIC_DETAILS) as Array<keyof typeof METRIC_DETAILS>).map((key) => (
            <div 
              key={key}
              className="group relative flex flex-col items-center"
              onMouseEnter={() => setActiveTooltip(key)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
            >
              <div className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center text-sm transition-all duration-300 shadow-sm cursor-help ${activeTooltip === key ? 'border-chic-primary scale-110 shadow-md ring-2 ring-chic-primary/20' : 'border-chic-primary/10'}`}>
                {METRIC_DETAILS[key].icon}
              </div>
              <div className="text-[8px] font-bold mt-1 text-chic-deep/40 tracking-widest uppercase">{METRIC_DETAILS[key].label}</div>
              <div className="text-[10px] font-bold text-chic-deep">%{displayMetrics[key]}</div>

              {activeTooltip === key && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-60 bg-chic-deep/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl z-[100] animate-fadeIn pointer-events-none border border-white/10">
                  <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                    <span className="text-lg">{METRIC_DETAILS[key].icon}</span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-chic-primary">{METRIC_DETAILS[key].label}</span>
                    <span className="ml-auto font-serif italic text-white/60 text-xs">%{metrics[key]}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed font-medium opacity-90 text-justify">
                    {METRIC_DETAILS[key].desc}
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-chic-deep/95"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VibrioGauge;
