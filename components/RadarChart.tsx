
import React from 'react';

interface RadarChartProps {
  trust: number;
  passion: number;
  communication: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ trust, passion, communication }) => {
  const size = 300;
  const center = size / 2;
  const radius = 90; // Slightly reduced to fit labels
  
  // Calculate coordinates
  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRad = (Math.PI / 180) * angleDegrees;
    // Organic scaling: values > 50 start pushing out faster
    const dist = (value / 100) * radius; 
    return {
      x: center + dist * Math.cos(angleRad),
      y: center + dist * Math.sin(angleRad)
    };
  };

  const axes = [
    { label: "GÜVEN", angle: -90, value: trust, color: "#8A9A5B" },
    { label: "TUTKU", angle: 30, value: passion, color: "#D4A373" },
    { label: "İLETİŞİM", angle: 150, value: communication, color: "#9D8189" }
  ];

  const points = axes.map(axis => getCoordinates(axis.value, axis.angle));

  // Improved organic curve logic
  const createCurvedPath = (pts: {x:number, y:number}[]) => {
     let d = `M ${pts[0].x} ${pts[0].y}`;
     for (let i = 0; i < pts.length; i++) {
        const pStart = pts[i];
        const pEnd = pts[(i + 1) % pts.length];
        
        // Midpoint
        const midX = (pStart.x + pEnd.x) / 2;
        const midY = (pStart.y + pEnd.y) / 2;
        
        // Dynamic Push factor logic:
        // Calculate average value of the two points
        const valStart = axes[i].value;
        const valEnd = axes[(i+1)%3].value;
        const avgVal = (valStart + valEnd) / 2;
        
        // Exponential push: If scores are high, push outline WAY out to make it look "fuller"
        // 1.0 is a straight line. 
        // If average is 100, we want a nice round curve (e.g. 1.3)
        // If average is 20, we want it skinny (e.g. 1.05)
        const pushFactor = 1 + (avgVal / 100) * 0.35; 

        const cpX = center + (midX - center) * pushFactor;
        const cpY = center + (midY - center) * pushFactor;
        
        d += ` Q ${cpX} ${cpY} ${pEnd.x} ${pEnd.y}`;
     }
     return d;
  };

  const blobPath = createCurvedPath(points);

  // Background Grid Circles
  const gridLevels = [30, 60, 90]; 

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none overflow-visible">
      <defs>
        <filter id="blobGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A373" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#9D8189" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8A9A5B" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Grid Circles */}
      {gridLevels.map((level, i) => (
         <circle 
           key={i} 
           cx={center} 
           cy={center} 
           r={(level/100)*radius} 
           fill={i===2 ? "#FFF" : "none"} 
           fillOpacity="0.3"
           stroke="#E6CCB2" 
           strokeDasharray="4 4" 
           strokeWidth="1"
         />
      ))}

      {/* Axis Lines */}
      {axes.map((axis, i) => {
         const end = getCoordinates(100, axis.angle);
         return (
           <line 
             key={i} 
             x1={center} 
             y1={center} 
             x2={end.x} 
             y2={end.y} 
             stroke="#E6CCB2" 
             strokeWidth="1" 
             opacity="0.5" 
           />
         );
      })}

      {/* The Organic Blob */}
      <path 
        d={blobPath} 
        fill="url(#blobGradient)" 
        stroke="#463F3A" 
        strokeWidth="0" 
        filter="url(#blobGlow)"
        className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />

      {/* Data Points */}
      {points.map((p, i) => (
        <g key={i} className="group">
           {/* Ripple for high values */}
           {axes[i].value > 80 && (
              <circle cx={p.x} cy={p.y} r="12" fill={axes[i].color} opacity="0.2" className="animate-ping" />
           )}
           <circle 
             cx={p.x} 
             cy={p.y} 
             r={axes[i].value > 80 ? 6 : 4} 
             fill="#FFF" 
             stroke={axes[i].color} 
             strokeWidth="2" 
             className="transition-all duration-500"
           />
           {/* Value */}
           <text 
             x={p.x} 
             y={p.y + (axes[i].angle === -90 ? -15 : 25)} 
             textAnchor="middle" 
             fill={axes[i].color}
             className="text-[11px] font-bold"
           >
             {axes[i].value}
           </text>
        </g>
      ))}

      {/* Labels */}
      {axes.map((axis, i) => {
        const labelPos = getCoordinates(125, axis.angle); 
        return (
          <text 
            key={i} 
            x={labelPos.x} 
            y={labelPos.y} 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="font-serif text-[10px] fill-chic-deep font-bold tracking-[0.2em] uppercase"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;
