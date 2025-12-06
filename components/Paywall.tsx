import React, { useState } from 'react';

interface PaywallProps {
  onUnlock: () => void;
}

// ENV VARS for Vite and Node
const SHOPIER_LINK = (import.meta as any).env?.VITE_SHOPIER_PRODUCT_LINK || 
                     (process as any).env?.VITE_SHOPIER_PRODUCT_LINK || 
                     "https://www.shopier.com/ShowProductNew/products.php?id=DEMO"; 

const Paywall: React.FC<PaywallProps> = ({ onUnlock }) => {
  const [adminClicks, setAdminClicks] = useState(0);

  const handleAdminBypass = () => {
    const newCount = adminClicks + 1;
    setAdminClicks(newCount);
    if (newCount >= 5) {
      const confirmBypass = window.confirm("Yönetici Girişi: Raporu ödeme yapmadan açmak istiyor musun?");
      if(confirmBypass) {
         onUnlock();
         setAdminClicks(0);
      }
    }
  };

  return (
    <div className="w-full relative z-30">
      <div className="bg-[#FDFBF7] p-2 rounded-2xl shadow-2xl animate-[fadeIn_0.5s_ease-out] ring-1 ring-chic-primary/20">
         <div className="bg-white border border-chic-primary/30 rounded-xl p-8 text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chic-primary via-chic-accent to-chic-primary"></div>
            <div className="absolute -right-6 -top-6 text-[100px] opacity-5 rotate-12">🔒</div>

            <h3 className="text-3xl font-serif font-bold text-chic-deep mb-2">Analizin Devamı</h3>
            <p className="text-xs text-chic-accent uppercase tracking-[0.2em] mb-6">Premium İçerik</p>

            <div className="text-left bg-chic-bg p-5 rounded-lg mb-8 border border-chic-primary/10">
               <p className="text-sm font-bold text-chic-deep mb-3 border-b border-chic-primary/10 pb-2">Kilidi Açınca Göreceklerin:</p>
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                    <span className="text-green-600 text-lg leading-none">✓</span> 
                    <span className="text-sm text-chic-deep/80"><strong>Bilinçaltı & Gölge Benlik:</strong> Partnerinizin size söyleyemediği, bastırdığı gerçek duygular.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-green-600 text-lg leading-none">✓</span> 
                    <span className="text-sm text-chic-deep/80"><strong>Gelecek Simülasyonu:</strong> 20 yıl sonraki görsel tahmininiz.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-green-600 text-lg leading-none">✓</span> 
                    <span className="text-sm text-chic-deep/80"><strong>Klinik Panzehir:</strong> Toksik döngüleri kıran Gottman taktikleri.</span>
                 </li>
               </ul>
            </div>

            <a href={SHOPIER_LINK} target="_blank" rel="noreferrer" 
               className="block w-full py-5 bg-chic-deep text-white font-serif italic text-xl rounded-xl shadow-lg hover:bg-chic-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
               <span className="relative z-10">Kilidi Kaldır (49₺)</span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </a>
            
            <p className="text-[10px] text-gray-400 mt-4">Tek seferlik ödeme. Abonelik gerektirmez.</p>
            
            <div className="mt-4 flex items-center justify-center gap-2 opacity-30 select-none cursor-pointer hover:opacity-100 transition-opacity" onClick={handleAdminBypass}>
               <span className="text-[10px]">🛡️</span>
               <p className="text-[8px] text-chic-deep uppercase tracking-widest">256-bit SSL Güvenli Ödeme</p>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Paywall;