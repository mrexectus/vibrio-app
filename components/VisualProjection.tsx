import React from 'react';

interface VisualProjectionProps {
  description?: string;
  isUnlocked?: boolean;
}

const VisualProjection: React.FC<VisualProjectionProps> = ({ description, isUnlocked = false }) => {
  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-chic-primary/10 mt-6 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-chic-deep flex items-center gap-2">
            <span>📸</span> 20 Yıl Sonra
        </h3>
        {!isUnlocked && <span className="bg-chic-deep text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-wider">Premium</span>}
      </div>

      <p className="text-xs text-chic-deep/70 mb-4">
        {isUnlocked 
            ? (description || "Yapay zeka analizine göre oluşturulan gelecek projeksiyonu.") 
            : "İlişkinizin enerjisine ve genetik kodlarınıza dayanarak; 20 yıl sonraki haliniz veya potansiyel çocuğunuzun yapay zeka tarafından oluşturulan tahmini."}
      </p>

      {/* Container for the image area */}
      <div className="relative w-full aspect-[4/3] bg-chic-secondary/10 rounded-xl overflow-hidden shadow-inner">
        
        {/* Abstract Blur representing the 'Image' - Always blurred if locked */}
        <div className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isUnlocked ? 'blur-none' : 'blur-2xl scale-110 opacity-60'}`} 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop')" }}>
        </div>
        
        {/* Overlay for Locked State */}
        {!isUnlocked && (
            <>
                <div className="absolute inset-0 bg-gradient-to-t from-chic-deep/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30 shadow-lg animate-bounce">
                    <span className="text-2xl">🔒</span>
                    </div>
                    <h4 className="font-serif text-lg font-medium tracking-wide drop-shadow-md">Görsel Kilitli</h4>
                    <p className="text-[10px] uppercase tracking-widest opacity-90 mt-2 font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        Simülasyon Tamamlandı
                    </p>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default VisualProjection;