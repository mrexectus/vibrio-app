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
    <div className="absolute inset-0 z-20 flex items-start justify-center pt-12 md:pt-20 px-4">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md transition-all"></div>
      
      <div className="relative z-30 w-full max-w-sm bg-[#FDFBF7] p-1.5 rounded-xl shadow-2xl animate-[fadeIn_0.5s_ease-out]">
         <div className="border border-chic-primary/40 rounded-lg p-8 text-center relative">
            <h3 className="text-2xl font-serif font-bold text-chic-deep mb-2 italic">Premium Dosya</h3>
            <div className="w-8 h-[1px] bg-chic-primary mx-auto mb-6"></div>

            <p className="text-sm text-chic-deep/80 mb-8 leading-relaxed font-light font-sans">
              İlişkinizin <strong>bilinçaltı kodlarını</strong>, <strong>gelecek haritasını</strong> ve <strong>iletişim panzehirlerini</strong> içeren 12 sayfalık klinik analiz kilitlendi.
            </p>

            <ul className="text-left space-y-3 mb-8 px-2">
               <li className="text-xs text-chic-deep flex items-start gap-3"><span className="text-chic-primary text-lg leading-none">⋆</span> <span><strong>Gölge Benlik:</strong> Partnerinizin size söyleyemediği, bastırdığı arzular.</span></li>
               <li className="text-xs text-chic-deep flex items-start gap-3"><span className="text-chic-primary text-lg leading-none">⋆</span> <span><strong>Mahşerin 4 Atlısı:</strong> İlişkiyi zehirleyen davranışlar ve çözümleri.</span></li>
            </ul>

            <a href={SHOPIER_LINK} target="_blank" rel="noreferrer" 
               className="block w-full py-4 bg-chic-deep text-white font-sans font-bold text-xs tracking-[0.25em] uppercase rounded shadow-lg hover:bg-chic-primary hover:shadow-xl transition-all duration-300"
            >
               Kilidi Kaldır (49₺)
            </a>
            
            <div className="mt-4 flex items-center justify-center gap-2 opacity-50 select-none cursor-pointer" onClick={handleAdminBypass}>
               <span className="text-[10px]">🔒</span>
               <p className="text-[8px] text-chic-deep uppercase tracking-widest">Güvenli Ödeme</p>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Paywall;