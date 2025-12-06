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
            <span>🔮</span> Gelecek Simülasyonu
        </h3>
        <span className="bg-chic-deep text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-wider">
            {isUnlocked ? 'Kilit Açıldı' : 'Premium'}
        </span>
      </div>

      <p className="text-xs text-chic-deep/70 mb-4 font-serif italic leading-relaxed">
        {isUnlocked 
            ? (description || "Yapay zeka analizi tamamlandı.") 
            : "Yapay zeka; yüz hatlarınızı, enerji uyumunuzu ve genetik kodlarınızı analiz etti. 20 yıl sonraki haliniz (veya potansiyel çocuğunuz) oluşturuldu."}
      </p>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-chic-secondary/10 rounded-xl overflow-hidden shadow-inner border border-chic-primary/20">
        
        {/* Placeholder Image - Always blurred heavily if locked */}
        <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${isUnlocked ? 'blur-none scale-100' : 'blur-xl scale-110 grayscale-[0.5]'}`} 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop')" }}
        ></div>
        
        {/* Locked Overlay */}
        {!isUnlocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/40 shadow-xl animate-[pulse_3s_ease-in-out_infinite]">
                    <span className="text-3xl">🔒</span>
                </div>
                <h4 className="font-serif text-white text-lg font-medium tracking-wide drop-shadow-md">Görseli Görmek İçin Dokun</h4>
                <div className="mt-3 px-3 py-1 bg-chic-primary/80 backdrop-blur-sm rounded-full text-[9px] text-white uppercase tracking-widest font-bold shadow-lg">
                    Sadece Premium Üyeler
                </div>
            </div>
        )}

        {/* Unlocked Badge */}
        {isUnlocked && (
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-chic-deep border border-chic-primary/20 shadow-sm">
                AI Generated
            </div>
        )}
      </div>
    </div>
  );
};

export default VisualProjection;