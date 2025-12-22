
import React, { useState } from 'react';

interface PaywallProps {
  onUnlock: () => void;
}

const SHOPIER_LINK = "https://www.shopier.com/vibrio/41893014"; 

const Paywall: React.FC<PaywallProps> = ({ onUnlock }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSecret = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      onUnlock();
      setClickCount(0);
    }
  };

  return (
    <div className="relative z-50 px-4">
      <div className="bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-chic-primary/10 overflow-hidden max-w-2xl mx-auto flex flex-col md:flex-row">
         
         <div className="p-10 md:p-14 flex-1 space-y-8">
            <div className="space-y-2">
                <span className="text-[10px] font-bold text-chic-primary uppercase tracking-[0.4em]">Premium Erişim</span>
                <h3 className="text-3xl font-serif font-bold text-chic-deep tracking-tight">Mührü Kaldırın</h3>
            </div>
            
            <ul className="space-y-4">
               {[
                 "Bilinçaltı Davranış Analizi",
                 "Gelecek Projeksiyonu (Görsel)",
                 "Klinik Çözüm Rehberi",
                 "PDF Rapor Çıktısı"
               ].map(item => (
                 <li key={item} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-chic-deep/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-chic-primary shadow-[0_0_10px_rgba(212,163,115,0.5)]"></span>
                    {item}
                 </li>
               ))}
            </ul>
         </div>

         <div className="bg-chic-bg p-10 md:w-72 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-chic-primary/5">
            <div className="text-center mb-8">
                <div className="text-3xl font-serif font-bold text-chic-deep">49.00 ₺</div>
                <p className="text-[9px] font-bold text-chic-deep/30 uppercase tracking-widest mt-1">Tek Seferlik Analiz</p>
            </div>
            
            <a 
              href={SHOPIER_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full py-5 bg-chic-deep text-white font-serif italic text-xl rounded-2xl shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95 text-center"
            >
               Kilidi Aç →
            </a>
            
            <div 
              onClick={handleSecret}
              className="mt-6 opacity-20 cursor-pointer select-none"
            >
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Güvenli Ödeme • Shopier</span>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Paywall;
