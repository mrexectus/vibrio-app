
import React from 'react';

// HARDCODED SHOPIER LINK AS REQUESTED BY USER
const SHOPIER_LINK = "https://www.shopier.com/vibrio/41893014"; 

interface VisualProjectionProps {
  description?: string;
  isUnlocked?: boolean;
  userImage?: string | null;
  generatedImage?: string | null;
  isGenerating?: boolean;
}

const VisualProjection: React.FC<VisualProjectionProps> = ({ 
    description, 
    isUnlocked = false, 
    userImage,
    generatedImage,
    isGenerating = false
}) => {
  
  // Logic: 
  // 1. If generatedImage exists, use it (Real AI)
  // 2. If generating, use placeholder/userImage with loader
  // 3. Fallback to a HIGH QUALITY OLD COUPLE WITH FACES instead of generic landscape
  
  const displayImage = generatedImage || 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2000&auto=format&fit=crop';
  
  return (
    <div className="w-full bg-white rounded-3xl p-1 shadow-sm border border-chic-primary/10 mt-6 relative overflow-hidden group">
      <div className="p-5 pb-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-chic-deep flex items-center gap-2">
            <span>🔮</span> 20 Yıl Sonraki Haliniz
        </h3>
        <p className="text-[10px] text-gray-400 mt-1">
            {isGenerating ? "Yapay zeka görseli işliyor..." : generatedImage ? "AI simülasyonu tamamlandı." : "Projeksiyon hazırlanıyor."}
        </p>
      </div>

      {/* Image Container - Aspect 4:3 matches the generation config */}
      <div className="relative w-full aspect-[4/3] bg-chic-secondary/10 rounded-2xl overflow-hidden mt-2">
        
        {/* Background Image */}
        <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform 
                ${isGenerating ? 'blur-md scale-105 opacity-60' : ''}
                ${isUnlocked ? 'blur-none scale-100' : 'blur-xl scale-110 grayscale-[0.2]'}
            `} 
            style={{ backgroundImage: `url('${displayImage}')` }}
        ></div>
        
        {/* Generating State Overlay */}
        {isGenerating && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm overflow-hidden">
                {/* Scanline Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-chic-deep/50 shadow-[0_0_20px_rgba(70,63,58,0.5)] animate-scan"></div>
                
                <div className="w-12 h-12 border-4 border-chic-deep border-t-transparent rounded-full animate-spin mb-4 shadow-xl"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-chic-deep animate-pulse">Fotoğraf Banyo Ediliyor...</span>
                <span className="text-[9px] text-chic-deep/60 mt-1">Yüz hatları & aura taranıyor</span>
            </div>
        )}

        {/* Locked Overlay (Only if not generating and not unlocked) */}
        {!isUnlocked && !isGenerating && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30 shadow-2xl animate-[pulse_3s_ease-in-out_infinite]">
                    <span className="text-3xl drop-shadow-lg">🔒</span>
                </div>
                <h4 className="font-serif text-white text-xl font-medium tracking-wide drop-shadow-md mb-2">
                    {generatedImage ? "Görsel Hazır" : "Görüntü İşleniyor"}
                </h4>
                <p className="text-white/80 text-xs font-light max-w-[200px] leading-relaxed">
                    {generatedImage 
                        ? "Yapay zeka, yüz hatlarınızı ve ilişkinizin aurasını kullanarak 20 yıl sonraki halinizi çizdi." 
                        : "Görsel üretim algoritması tamamlanmak üzere."}
                </p>
                <button 
                  onClick={() => window.open(SHOPIER_LINK, '_blank')}
                  className="mt-4 px-6 py-2 bg-chic-primary hover:bg-white hover:text-chic-primary transition-colors text-white rounded-full text-[10px] uppercase tracking-widest font-bold shadow-lg cursor-pointer relative z-50 pointer-events-auto"
                >
                    Kilidi Kaldır ve Gör
                </button>
            </div>
        )}

        {/* Text Description Overlay (Only when Unlocked and Generated) */}
        {isUnlocked && !isGenerating && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                 <p className="text-white text-sm font-serif italic leading-relaxed drop-shadow-md line-clamp-3">
                    "{description}"
                 </p>
                 <div className="mt-2 text-[9px] uppercase tracking-widest text-white/60">
                    {generatedImage ? "Vibrio GenAI v2.5 Render" : "Vibrio AI Projection"}
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default VisualProjection;
