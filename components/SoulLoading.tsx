
import React, { useState, useEffect } from 'react';

const STAGES = [
  { msg: "Bilinçaltı Parametreleri Taranıyor...", progress: 10 },
  { msg: "Mikro-İfade ve Dilbilimsel Analiz...", progress: 25 },
  { msg: "Jungiyen Arketip Desenleri Çıkarılıyor...", progress: 40 },
  { msg: "Gottman Metodu ile Çatışma Simülasyonu...", progress: 55 },
  { msg: "Astro-Sinastri Haritası Entegre Ediliyor...", progress: 70 },
  { msg: "Klinik Rapor ve Gelecek Projeksiyonu...", progress: 85 },
  { msg: "Ruhsal Veri Mühürleniyor...", progress: 98 }
];

const SoulLoading: React.FC = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2800);

    const progressInterval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = STAGES[stageIndex].progress;
        if (prev < target) return prev + 1;
        return prev;
      });
    }, 40);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [stageIndex]);

  return (
    <div className="fixed inset-0 z-[200] bg-chic-bg flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      
      <div className="relative w-72 h-72 mb-16 flex items-center justify-center">
        <div className="absolute inset-0 border-[1px] border-chic-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-6 border-[1px] border-chic-primary/10 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[40%] bg-white rounded-full shadow-[0_0_60px_rgba(212,163,115,0.2)] flex items-center justify-center z-10">
          <span className="text-3xl animate-float">🧿</span>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-chic-primary/30 to-transparent blur-md animate-scan"></div>
      </div>

      <div className="text-center space-y-6 relative z-10 max-w-sm">
        <div className="h-12 flex items-center justify-center">
            <h2 key={stageIndex} className="text-2xl font-serif font-medium text-chic-deep animate-reveal tracking-tight italic">
                {STAGES[stageIndex].msg}
            </h2>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-chic-deep/30 font-black">
            Vibrio v2.5 • Soul Intelligence
        </p>
      </div>

      <div className="mt-16 w-full max-w-sm">
        <div className="flex justify-between items-end mb-3">
            <span className="text-[9px] font-bold text-chic-primary uppercase tracking-widest">Kuantum Bağlantı: Aktif</span>
            <span className="text-lg font-serif italic text-chic-deep">%{displayProgress}</span>
        </div>
        <div className="h-[1px] w-full bg-chic-primary/10 rounded-full overflow-hidden">
            <div 
                className="h-full bg-chic-primary transition-all duration-700 ease-out" 
                style={{ width: `${displayProgress}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default SoulLoading;
