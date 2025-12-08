import React from 'react';

interface RadarChartProps {
  trust: number;
  passion: number;
  communication: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ trust, passion, communication }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100; // Base radius for the grid
  
  // Convert polar to cartesian
  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRad = (Math.PI / 180) * angleDegrees;
    // Normalize value (0-100) to radius distance
    // We add a slight exponential curve so high values look more "impactful"
    const dist = (value / 100) * radius; 
    return {
      x: center + dist * Math.cos(angleRad),
      y: center + dist * Math.sin(angleRad)
    };
  };

  // Axis configuration
  // Trust: Top (-90deg), Passion: Bottom Right (30deg), Communication: Bottom Left (150deg)
  const axes = [
    { label: "GÜVEN", angle: -90, value: trust, color: "#8A9A5B" }, // Greenish
    { label: "TUTKU", angle: 30, value: passion, color: "#D4A373" }, // Gold
    { label: "İLETİŞİM", angle: 150, value: communication, color: "#9D8189" } // Mauve
  ];

  // Calculate polygon points
  const points = axes.map(axis => getCoordinates(axis.value, axis.angle));
  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  // Calculate grid levels (0%, 50%, 100%)
  const levels = [0.33, 0.66, 1].map(scale => 
     axes.map(axis => {
       const coord = getCoordinates(100 * scale, axis.angle);
       return `${coord.x},${coord.y}`;
     }).join(' ')
  );

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none overflow-visible">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A373" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9D8189" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background Web/Grid */}
      {levels.map((levelPoints, i) => (
        <polygon 
          key={i} 
          points={levelPoints} 
          fill={i === 2 ? "#fff" : "none"} 
          fillOpacity="0.5"
          stroke="#E6CCB2" 
          strokeWidth="1" 
          strokeDasharray="4 4"
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

      {/* The Data Shape */}
      <polygon 
        points={pointsString} 
        fill="url(#chartGradient)" 
        stroke="#463F3A" 
        strokeWidth="2" 
        className="drop-shadow-xl transition-all duration-1000 ease-out"
        filter="url(#glow)"
      />

      {/* Data Points (Vertices) */}
      {points.map((p, i) => (
        <g key={i} className="group">
           {/* Pulsing effect for high values */}
           {axes[i].value > 80 && (
             <circle cx={p.x} cy={p.y} r="8" fill={axes[i].color} opacity="0.3" className="animate-ping" />
           )}
           <circle 
             cx={p.x} 
             cy={p.y} 
             r={axes[i].value > 80 ? 5 : 3} 
             fill="#FFF" 
             stroke={axes[i].color} 
             strokeWidth="2" 
             className="transition-all duration-500"
           />
           {/* Value Tooltip Label near point */}
           <text 
             x={p.x} 
             y={p.y + (axes[i].angle === -90 ? -10 : 20)} 
             textAnchor="middle" 
             fill={axes[i].color}
             className="text-[10px] font-bold"
           >
             {axes[i].value}
           </text>
        </g>
      ))}

      {/* Axis Labels (Fixed positions outside) */}
      {axes.map((axis, i) => {
        const labelPos = getCoordinates(118, axis.angle); // Push text further out
        return (
          <text 
            key={i} 
            x={labelPos.x} 
            y={labelPos.y} 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="font-serif text-[10px] fill-chic-deep font-bold tracking-widest uppercase"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;