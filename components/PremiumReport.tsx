
import React from 'react';

interface PremiumReportProps { content: string; }

const PremiumReport: React.FC<PremiumReportProps> = ({ content }) => {
  return (
    <div className="w-full relative">
       <div id="printable-report"
         className="w-full bg-[#FCFBF9] text-chic-deep p-8 md:p-16 relative shadow-2xl rounded-sm font-sans text-sm leading-relaxed overflow-hidden"
       >
         {/* Paper Texture & Noise */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
         
         {/* Watermark */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[20px] border-chic-deep/5 rounded-full pointer-events-none z-0"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-bold text-chic-deep/5 -rotate-12 pointer-events-none select-none z-0 whitespace-nowrap">
            VIBRIO
         </div>

         {/* Header Branding */}
         <div className="relative z-10 flex justify-between items-start border-b-2 border-chic-deep/80 pb-6 mb-10">
            <div>
                <h1 className="text-4xl font-serif font-bold tracking-tight text-chic-deep">VIBRIO</h1>
                <p className="text-[10px] uppercase tracking-[0.4em] text-chic-deep/60 mt-1 font-medium">Soul Analytics Division</p>
            </div>
            <div className="text-right">
                <div className="w-12 h-12 border border-chic-deep rounded-full flex items-center justify-center">
                    <span className="font-serif font-bold text-xl">V</span>
                </div>
            </div>
         </div>

         {/* Content */}
         <div className="relative z-10 prose prose-stone max-w-none 
            prose-headings:font-serif prose-headings:text-chic-deep 
            prose-p:text-chic-deep/90 prose-p:leading-8 
            prose-strong:text-chic-deep prose-strong:font-bold
            prose-li:marker:text-chic-primary"
           dangerouslySetInnerHTML={{ __html: content }} 
         />
         
         {/* Footer / Signature */}
         <div className="relative z-10 mt-16 pt-10 border-t border-chic-deep/10 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-center md:text-left">
                 <p className="font-serif italic text-chic-deep/60 text-lg">"Yıldızlar yolu gösterir, yürümek sana kalmıştır."</p>
                 <p className="text-[9px] uppercase tracking-widest text-chic-deep/30 mt-2">Vibrio Intelligence System v2.5</p>
             </div>
             <div className="w-24 h-24 opacity-80 mix-blend-multiply">
                 {/* Wax Seal / Stamp Effect using CSS/SVG */}
                 <svg viewBox="0 0 100 100" className="w-full h-full text-red-900/20 rotate-12">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                     <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
                     <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor" fontFamily="serif">APPROVED</text>
                     <text x="50" y="40" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="sans-serif" letterSpacing="2">CONFIDENTIAL</text>
                 </svg>
             </div>
         </div>
       </div>

       <button onClick={() => window.print()} className="mt-8 mx-auto flex items-center gap-3 px-8 py-4 bg-chic-deep text-white hover:bg-chic-deep/90 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all no-print shadow-xl hover:translate-y-[-2px]">
          <span>📥</span> Dosyayı PDF Olarak İndir
       </button>
    </div>
  );
};
export default PremiumReport;
