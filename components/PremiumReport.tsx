
import React from 'react';

interface PremiumReportProps { content: string; }

const PremiumReport: React.FC<PremiumReportProps> = ({ content }) => {
  return (
    <div className="w-full relative">
       <style>{`
         @media print {
            @page { margin: 0; }
            body { margin: 1.6cm; background: white !important; }
            .no-print { display: none !important; }
            #printable-report { 
              box-shadow: none !important; 
              border: none !important;
              padding: 0 !important;
            }
         }
         #printable-report h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 1.5rem; color: #463F3A; }
         #printable-report h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; border-left: 4px solid #D4A373; padding-left: 1rem; }
         #printable-report p { margin-bottom: 1rem; line-height: 1.8; color: #5E503F; }
         #printable-report table { width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
         #printable-report th { background: #463F3A; color: white; padding: 0.75rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
         #printable-report td { padding: 0.75rem; border: 1px solid #E5E0D8; font-size: 0.875rem; }
         #printable-report blockquote { border: 1px dashed #D4A373; padding: 1.5rem; background: #FCFBF9; font-style: italic; margin: 2rem 0; }
       `}</style>

       <div id="printable-report"
         className="w-full bg-[#FCFBF9] text-chic-deep p-8 md:p-16 relative shadow-[0_50px_100px_rgba(0,0,0,0.05)] rounded-sm font-sans text-sm leading-relaxed overflow-hidden transition-all duration-700 border border-chic-primary/5"
       >
         {/* Texture Overlay */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
         
         {/* Watermarks */}
         <div className="absolute top-10 right-10 opacity-10 select-none pointer-events-none uppercase tracking-[0.5em] text-[10px] font-black rotate-90 origin-right">
            Confidential • Vibrio Intelligence
         </div>
         <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none z-0">
             <div className="text-[25vw] font-serif font-black">V</div>
         </div>

         {/* Dossier Header */}
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start border-b-[3px] border-chic-deep pb-8 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-chic-deep">Sinastri Dosyası: #VBR-{Math.floor(Math.random()*90000+10000)}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-chic-deep tracking-tighter">İlişki Röntgeni</h1>
                <p className="text-xs text-chic-deep/50 mt-2 font-medium">Bilinçaltı, Arketip ve Karma Analizi Raporu</p>
            </div>
            <div className="mt-6 md:mt-0 text-right md:w-48">
                <p className="text-[9px] font-bold uppercase tracking-widest text-chic-deep/40">Oluşturulma Tarihi</p>
                <p className="font-serif italic text-lg">{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
         </div>

         {/* Content Injection */}
         <div className="relative z-10 prose-custom prose-chic"
           dangerouslySetInnerHTML={{ __html: content }} 
         />
         
         {/* Footer / Signature Block */}
         <div className="relative z-10 mt-20 pt-10 border-t border-chic-deep/10 flex flex-col md:flex-row justify-between items-end gap-10">
             <div className="max-w-md">
                 <p className="font-serif italic text-chic-deep/70 text-lg leading-snug">"Ruhun karanlık odaları sadece doğru anahtarla açılır. Bu rapor o anahtarın ilk dişlisidir."</p>
                 <div className="flex gap-4 mt-6">
                     <div className="w-10 h-10 rounded-full bg-chic-deep/5 border border-chic-deep/10 flex items-center justify-center text-xl">🧿</div>
                     <div className="w-10 h-10 rounded-full bg-chic-deep/5 border border-chic-deep/10 flex items-center justify-center text-xl">🧬</div>
                     <div className="w-10 h-10 rounded-full bg-chic-deep/5 border border-chic-deep/10 flex items-center justify-center text-xl">⚖️</div>
                 </div>
             </div>
             <div className="flex flex-col items-end">
                 <div className="w-32 h-32 opacity-80 mix-blend-multiply transition-transform hover:rotate-6 duration-700">
                     <svg viewBox="0 0 100 100" className="w-full h-full text-chic-primary/40">
                         <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 1" />
                         <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                         <text x="50" y="48" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" letterSpacing="2">VERIFIED BY AI</text>
                         <text x="50" y="58" textAnchor="middle" fontSize="12" fontWeight="black" fill="currentColor" fontFamily="serif">VIBRIO</text>
                     </svg>
                 </div>
                 <p className="text-[8px] uppercase tracking-widest text-chic-deep/30 mt-2">Bu belge dijital olarak imzalanmıştır.</p>
             </div>
         </div>
       </div>

       <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 no-print">
           <button 
             onClick={() => window.print()} 
             className="px-10 py-5 bg-chic-deep text-white hover:bg-black rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-2xl hover:translate-y-[-4px] active:translate-y-0"
           >
              📥 PDF Olarak Kaydet (Mühürlü Kopya)
           </button>
           <button 
             onClick={() => {
                if(navigator.share) {
                    navigator.share({ title: 'Vibrio Analiz Raporum', text: 'İlişkimin gizli kodlarını çözdüm.', url: window.location.href });
                }
             }}
             className="px-10 py-5 bg-white border border-chic-deep/10 text-chic-deep hover:bg-chic-bg rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl"
           >
              🔗 Raporu Paylaş
           </button>
       </div>
    </div>
  );
};
export default PremiumReport;
