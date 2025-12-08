
import React from 'react';

interface SynergyBadgeProps {
  insight: {
    name: string;
    score: number;
  } | null;
}

const SynergyBadge: React.FC<SynergyBadgeProps> = ({ insight }) => {
  if (!insight) return null;

  return (
    <div className="md:hidden w-full mt-3 animate-slideUp">
      <div className="bg-gradient-to-r from-chic-deep to-gray-800 text-white p-3 rounded-xl shadow-lg flex items-center justify-between relative overflow-hidden group">
         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         
         <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg backdrop-blur-sm border border-white/10">
                 ✨
             </div>
             <div className="flex flex-col">
                 <span className="text-[9px] uppercase tracking-widest opacity-70">İlişki Uyumu</span>
                 <span className="font-serif text-sm font-bold tracking-wide">{insight.name}</span>
             </div>
         </div>
         
         <div className="flex flex-col items-end">
             <span className="text-xl font-serif font-bold text-chic-primary">%{insight.score}</span>
         </div>
      </div>
    </div>
  );
};

export default SynergyBadge;
