
import React, { useState } from 'react';

interface SynergyBadgeProps {
  insight: {
    name: string;
    score: number;
    desc: string;
    element1: string;
    element2: string;
  } | null;
}

const SynergyBadge: React.FC<SynergyBadgeProps> = ({ insight }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!insight) return null;

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="md:hidden w-full mt-3 animate-slideUp cursor-pointer active:scale-95 transition-transform"
      >
        <div className="bg-gradient-to-r from-chic-deep to-gray-800 text-white p-3 rounded-xl shadow-lg flex items-center justify-between relative overflow-hidden group">
           {/* Glow Effect */}
           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
           
           <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg backdrop-blur-sm border border-white/10 shadow-inner">
                   ✨
               </div>
               <div className="flex flex-col">
                   <div className="flex items-center gap-1">
                      <span className="text-[9px] uppercase tracking-widest opacity-80">Kozmik Uyum</span>
                      <span className="text-[8px] bg-white/20 px-1 rounded text-white/90">Detay</span>
                   </div>
                   <span className="font-serif text-sm font-bold tracking-wide">{insight.name}</span>
               </div>
           </div>
           
           <div className="flex flex-col items-end">
               <span className="text-xl font-serif font-bold text-chic-primary">%{insight.score}</span>
           </div>
        </div>
        <div className="text-[8px] text-center text-chic-deep/40 mt-1 italic">
           Detaylı yorumu okumak için dokunun 👆
        </div>
      </div>

      {/* Mobile Detail Modal (Bottom Sheet Style) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-chic-deep/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setIsOpen(false)}>
           <div 
             className="bg-[#FDFBF7] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 relative shadow-2xl animate-slideUp border-t border-chic-primary/20"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Handle Bar for Mobile Feel */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-50"></div>

              <div className="text-center mb-6">
                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md border border-chic-primary/10 mb-3 text-4xl">
                    🔮
                 </div>
                 <h3 className="text-2xl font-serif text-chic-deep font-bold">{insight.name}</h3>
                 <div className="flex justify-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-chic-secondary/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-chic-deep">
                        {insight.element1} + {insight.element2}
                    </span>
                 </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-chic-primary/10 shadow-inner mb-6">
                 <p className="text-chic-text text-sm leading-relaxed text-justify font-sans">
                    {insight.desc}
                 </p>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-chic-deep text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-chic-deep/90 shadow-lg"
              >
                Anlaşıldı
              </button>
           </div>
        </div>
      )}
    </>
  );
};

export default SynergyBadge;
