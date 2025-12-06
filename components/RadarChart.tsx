import React from 'react';

interface RadarChartProps {
  trust: number;
  passion: number;
  communication: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ trust, passion, communication }) => {
  const center = 100;
  const scale = 0.8;
  
  const points = [
    { val: trust, a: -Math.PI/2 },
    { val: passion, a: Math.PI/6 },
    { val: communication, a: 5*Math.PI/6 }
  ].map(p => {
    const r = p.val * scale;
    return `${center + r * Math.cos(p.a)},${center + r * Math.sin(p.a)}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full p-2 select-none">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4A373" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4A373" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {[0.3, 0.6, 0.9].map(r => (
         <circle key={r} cx={center} cy={center} r={100 * scale * r} fill="none" stroke="#E6CCB2" strokeWidth="0.5" strokeDasharray="4 4" />
      ))}

      {[0, 1, 2].map(i => {
         const a = -Math.PI/2 + i * (2*Math.PI/3);
         const x = center + 100 * scale * Math.cos(a);
         const y = center + 100 * scale * Math.sin(a);
         return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E6CCB2" strokeWidth="1" />
      })}
      
      <polygon points={points} fill="url(#radarFill)" stroke="#D4A373" strokeWidth="2" className="drop-shadow-sm animate-[pulse_4s_ease-in-out_infinite]" />
      
      {points.split(' ').map((pt, i) => (
        <circle key={i} cx={pt.split(',')[0]} cy={pt.split(',')[1]} r="3" fill="#FFF" stroke="#D4A373" strokeWidth="1" />
      ))}
      
      <text x={center} y={15} textAnchor="middle" className="font-serif text-[9px] fill-chic-deep font-bold tracking-widest">GÜVEN</text>
      <text x={185} y={150} textAnchor="middle" className="font-serif text-[9px] fill-chic-deep font-bold tracking-widest">TUTKU</text>
      <text x={15} y={150} textAnchor="middle" className="font-serif text-[9px] fill-chic-deep font-bold tracking-widest">İLETİŞİM</text>
    </svg>
  );
};
export default RadarChart;