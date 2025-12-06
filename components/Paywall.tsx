
import React, { useState } from 'react';

interface PaywallProps {
  onUnlock: () => void;
}

// HARDCODED SHOPIER LINK AS REQUESTED BY USER
const SHOPIER_LINK = "https://www.shopier.com/vibrio/41893014"; 

const Paywall: React.FC<PaywallProps> = ({ onUnlock }) => {
  const [adminClicks, setAdminClicks] = useState(0);

  const handleAdminBypass = () => {
    const newCount = adminClicks + 1;
    setAdminClicks(newCount);
    if (newCount >= 5) {
       onUnlock();
       setAdminClicks(0);
    }
  };

  return (
    <div className="w-full relative z-30">
      <div className="bg-[#FDFBF7] p-1.5 rounded-2xl shadow-xl animate-[fadeIn_0.5s_ease-out] border border-chic-primary/20 max-w-3xl mx-auto">
         
         {/* TICKET STYLE DESIGN */}
         <div className="bg-white border border-chic-primary/10 rounded-xl flex flex-col md:flex-row relative overflow-hidden">
            
            {/* Left Side: Value Prop */}
            <div className="p-6 flex-1 flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-chic-primary/30"></div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔒</span>
                    <h3 className="text-xl font-serif font-bold text-chic-deep">Analizin Devamı</h3>
                </div>
                
                {/* Horizontal Features List for "Read in one go" */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-chic-deep/80 leading-relaxed">
                   <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Bilinçaltı Gerçekleri</span>
                   <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Gelecek Simülasyonu (20 Yıl)</span>
                   <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Klinik Panzehir & Taktikler</span>
                </div>
            </div>

            {/* Divider (Dashed Line) */}
            <div className="hidden md:flex flex-col justify-between py-2 items-center w-8 relative">
                <div className="absolute -top-3 w-6 h-6 bg-[#FDFBF7] rounded-full border border-chic-primary/20 z-10"></div>
                <div className="h-full border-r-2 border-dashed border-chic-primary/20"></div>
                <div className="absolute -bottom-3 w-6 h-6 bg-[#FDFBF7] rounded-full border border-chic-primary/20 z-10"></div>
            </div>

            {/* Right Side: Action */}
            <div className="p-5 bg-chic-bg/50 flex flex-col items-center justify-center md:w-48 border-t md:border-t-0 md:border-l border-chic-primary/10">
                <a href={SHOPIER_LINK} target="_blank" rel="noreferrer" 
                   className="group relative px-6 py-2.5 bg-gradient-to-r from-chic-deep to-gray-800 text-white font-serif italic text-lg rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 w-full text-center"
                >
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     Aç (49₺) <span className="text-xs not-italic font-sans opacity-70">➔</span>
                   </span>
                </a>
                <div className="mt-3 flex items-center justify-center gap-1 opacity-40 cursor-pointer" onClick={handleAdminBypass}>
                    <span className="text-[9px]">🔒</span>
                    <span className="text-[8px] uppercase tracking-widest">Güvenli Ödeme</span>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};
export default Paywall;
