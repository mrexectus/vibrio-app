
import React from 'react';

// HARDCODED SHOPIER LINK AS REQUESTED BY USER
const SHOPIER_LINK = "https://www.shopier.com/vibrio/41893014"; 

interface VisualProjectionProps {
  description?: string;
  isUnlocked?: boolean;
  userImage?: string | null;
}

const VisualProjection: React.FC<VisualProjectionProps> = ({ description, isUnlocked = false, userImage }) => {
  // Use user's uploaded image if available, otherwise a generic couple/future placeholder
  const bgImage = userImage || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop';

  return (
    <div className="w-full bg-white rounded-3xl p-1 shadow-sm border border-chic-primary/10 mt-6 relative overflow-hidden group">
      <div className="p-5 pb-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-chic-deep flex items-center gap-2">
            <span>🔮</span> 20 Yıl Sonraki Haliniz
        </h3>
        <p className="text-[10px] text-gray-400 mt-1">Yapay zeka simülasyonu tamamlandı.</p>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-chic-secondary/10 rounded-2xl overflow-hidden mt-2">
        
        {/* Background Image - Heavily Blurred if Locked */}
        <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${isUnlocked ? 'blur-none scale-100' : 'blur-2xl scale-110 grayscale-[0.2]'}`} 
            style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        
        {/* Locked Overlay */}
        {!isUnlocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30 shadow-2xl animate-[pulse_3s_ease-in-out_infinite]">
                    <span className="text-3xl drop-shadow-lg">🔒</span>
                </div>
                <h4 className="font-serif text-white text-xl font-medium tracking-wide drop-shadow-md mb-2">Görsel Hazır</h4>
                <p className="text-white/80 text-xs font-light max-w-[200px] leading-relaxed">
                    Yapay zeka; yüz hatlarınızı ve yaşlanma genetiğinizi analiz ederek gelecekteki görüntünüzü oluşturdu.
                </p>
                <button 
                  onClick={() => window.open(SHOPIER_LINK, '_blank')}
                  className="mt-4 px-6 py-2 bg-chic-primary hover:bg-white hover:text-chic-primary transition-colors text-white rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg cursor-pointer relative z-50 pointer-events-auto"
                >
                    Kilidi Kaldır ve Gör
                </button>
            </div>
        )}

        {/* Text Description Overlay (Only when Unlocked) */}
        {isUnlocked && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                 <p className="text-white text-sm font-serif italic leading-relaxed drop-shadow-md">
                    "{description}"
                 </p>
                 <div className="mt-2 text-[9px] uppercase tracking-widest text-white/60">Vibrio AI Projection</div>
            </div>
        )}
      </div>
    </div>
  );
};

export default VisualProjection;
