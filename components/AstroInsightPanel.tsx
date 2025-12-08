
import React from 'react';

interface AstroInsightPanelProps {
  insight: {
    name: string;
    desc: string;
    score: number;
    element1: string;
    element2: string;
  } | null;
}

const AstroInsightPanel: React.FC<AstroInsightPanelProps> = ({ insight }) => {
  if (!insight) {
    return (
      <div className="hidden md:flex flex-col space-y-6 pt-2 sticky top-24 self-center pl-4 transition-all duration-500 opacity-100">
         <h1 className="text-4xl font-serif font-light text-chic-deep leading-tight tracking-wide">
           İlişkinin <br/><span className="italic text-chic-primary font-normal">Röntgenini Çek.</span>
         </h1>
         <p className="text-chic-text/70 leading-relaxed font-light text-sm max-w-sm">
           Vibrio; Jungiyen psikoloji ve astrolojinin gücüyle, partnerinizin zihnindeki kilitli odaları açar.
         </p>
         
         <div className="grid grid-cols-1 gap-4 mt-6">
            <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white border border-chic-primary/20 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">🧠</div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-chic-deep uppercase tracking-widest">Bilinçaltı Okuma</span>
                    <span className="text-[10px] text-chic-deep/60">Söylemediklerini duyun.</span>
                </div>
            </div>
            <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white border border-chic-primary/20 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">🚩</div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-chic-deep uppercase tracking-widest">Manipülasyon Taraması</span>
                    <span className="text-[10px] text-chic-deep/60">Toksik sinyalleri yakalayın.</span>
                </div>
            </div>
            <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white border border-chic-primary/20 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">🔮</div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-chic-deep uppercase tracking-widest">2045 Projeksiyonu</span>
                    <span className="text-[10px] text-chic-deep/60">Gelecekteki halinizi görün.</span>
                </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block sticky top-24 pl-4 animate-fadeIn">
        <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-chic-primary/20 overflow-hidden min-h-[400px]">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-chic-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 border-b border-chic-primary/10 pb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-chic-deep/50">Kozmik Sinerji</span>
                    <div className="px-3 py-1 bg-chic-deep text-white text-xs font-bold rounded-full shadow-lg">
                        %{insight.score} Uyum
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-chic-bg border border-chic-primary/20 mb-4 shadow-inner">
                        <span className="text-4xl">✨</span>
                    </div>
                    <h2 className="text-2xl font-serif text-chic-deep font-bold mb-1">{insight.name}</h2>
                    <div className="flex justify-center gap-2 text-[10px] uppercase tracking-widest text-chic-accent/80 font-medium">
                        <span>{insight.element1}</span>
                        <span className="text-chic-primary">•</span>
                        <span>{insight.element2}</span>
                    </div>
                </div>

                <div className="bg-chic-bg/50 p-6 rounded-2xl border border-chic-primary/10 backdrop-blur-sm flex-grow">
                    <p className="text-sm font-sans text-chic-text leading-relaxed text-justify first-letter:text-2xl first-letter:font-serif first-letter:mr-1">
                        {insight.desc}
                    </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] text-chic-deep/40 italic justify-center">
                    <span>*Detaylı analiz raporun içinde yer alacaktır.</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AstroInsightPanel;
