
import React, { useState, useEffect } from 'react';

const STAGES = [
  { msg: "Bilinçaltı Girişleri Doğrulanıyor...", progress: 15 },
  { msg: "Dilbilimsel Duygu Analizi Başlatıldı...", progress: 30 },
  { msg: "Jungiyen Arketip Desenleri Eşleşiyor...", progress: 45 },
  { msg: "Astrolojik Sinastri Haritası Çiziliyor...", progress: 60 },
  { msg: "Olasılık Matrisi ve Gelecek Simülasyonu...", progress: 80 },
  { msg: "Ruhsal Rapor Hazırlanıyor ve Mühürleniyor...", progress: 95 }
];

const SoulLoading: React.FC = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2500);

    const progressInterval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = STAGES[stageIndex].progress;
        if (prev < target) return prev + 1;
        return prev;
      });
    }, 50);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [stageIndex]);

  return (
    <div className="fixed inset-0 z-[200] bg-chic-bg flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-constellation opacity-10 animate-spin-slow"></div>

      {/* Central Visual: Sacred Geometry Loader */}
      <div className="relative w-64 h-64 mb-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-[1px] border-chic-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-[1px] border-chic-primary/10 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
        
        {/* Pulsing Core */}
        <div className="absolute inset-[35%] bg-white rounded-full shadow-[0_0_50px_rgba(212,163,115,0.3)] flex items-center justify-center z-10">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-chic-primary/20 to-chic-accent/20 animate-pulse"></div>
          <span className="absolute text-2xl animate-float">👁️</span>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-chic-primary rounded-full shadow-[0_0_15px_#D4A373]"></div>
        </div>
        <div className="absolute inset-0 animate-[spin_5s_linear_infinite_reverse]">
            <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-chic-accent rounded-full shadow-[0_0_10px_#9D8189]"></div>
        </div>

        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-chic-primary/40 to-transparent blur-sm animate-scan"></div>
      </div>

      {/* Text Info */}
      <div className="text-center space-y-4 relative z-10 max-w-xs">
        <div className="h-8">
            <h2 key={stageIndex} className="text-xl font-serif font-bold text-chic-deep animate-slideUp tracking-wide">
                {STAGES[stageIndex].msg}
            </h2>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-chic-deep/40 font-bold">
            Vibrio Analiz Motoru v2.5
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-12 w-full max-w-sm relative">
        <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-bold text-chic-primary uppercase tracking-widest">Sistem Durumu: Aktif</span>
            <span className="text-sm font-serif italic text-chic-deep">%{displayProgress}</span>
        </div>
        <div className="h-[2px] w-full bg-chic-primary/10 rounded-full overflow-hidden">
            <div 
                className="h-full bg-chic-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,163,115,0.5)]" 
                style={{ width: `${displayProgress}%` }}
            ></div>
        </div>
        {/* Decorative ticks */}
        <div className="absolute -bottom-4 left-0 w-full flex justify-between px-1 opacity-20">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="w-[1px] h-2 bg-chic-deep"></div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-12 text-[9px] text-chic-deep/20 italic tracking-widest">
        Düşünceleriniz analiz ediliyor, lütfen pencereyi kapatmayın.
      </div>
    </div>
  );
};

export default SoulLoading;
