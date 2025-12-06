import React from 'react';

interface VisualProjectionProps {
  description?: string;
}

const VisualProjection: React.FC<VisualProjectionProps> = ({ description }) => {
  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-chic-primary/10 mt-6 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-chic-deep">Yapay Zeka Vizyonu</h3>
        <span className="bg-chic-deep text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-wider">Premium</span>
      </div>

      <p className="text-xs text-chic-deep/70 mb-4 line-clamp-2">
        {description || "Partnerinizle 20 yıl sonraki haliniz veya potansiyel çocuğunuzun yapay zeka tarafından oluşturulan tahmini görüntüsü."}
      </p>

      {/* Container for the blurred image */}
      <div className="relative w-full aspect-[4/3] bg-chic-secondary/20 rounded-xl overflow-hidden cursor-not-allowed">
        {/* Abstract Blur representing the 'Image' */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center blur-xl scale-110 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-chic-deep/60 to-transparent"></div>
        
        {/* Lock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30">
               <span className="text-2xl">🔒</span>
            </div>
            <h4 className="font-serif text-lg font-medium tracking-wide">Görsel Kilitli</h4>
            <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">20 Yıl Sonraki Haliniz / Çocuk Tahmini</p>
        </div>
      </div>
      
      <div className="absolute top-2 right-2 animate-pulse">
        <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded border border-green-500/20">● Render Tamamlandı</span>
      </div>
    </div>
  );
};

export default VisualProjection;