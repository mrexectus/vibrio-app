import React from 'react';

interface PremiumReportProps { content: string; }

const PremiumReport: React.FC<PremiumReportProps> = ({ content }) => {
  return (
    <div className="w-full relative">
       <div id="printable-report"
         className="w-full bg-white text-chic-deep p-6 md:p-12 relative shadow-sm rounded-none md:rounded-b-3xl font-sans text-sm leading-relaxed border-t border-dashed border-chic-primary/30"
       >
         <div className="absolute inset-0 bg-floral-pattern opacity-[0.03] pointer-events-none"></div>

         <div className="relative pb-6 mb-8 text-center">
            <h2 className="text-3xl font-serif font-bold tracking-widest text-chic-deep mb-2">VIBRIO</h2>
            <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-chic-primary">Personal Relationship Dossier</p>
         </div>

         <div className="relative z-10 prose prose-stone max-w-none prose-p:font-sans prose-p:text-chic-deep/80 prose-headings:font-serif prose-headings:text-chic-deep prose-strong:text-chic-accent"
           dangerouslySetInnerHTML={{ __html: content }} 
         />
         
         <div className="mt-12 pt-8 border-t border-chic-primary/10 text-center">
             <p className="font-serif italic text-chic-deep/50 text-lg">"Yıldızlar yolu gösterir, yürümek sana kalmıştır."</p>
         </div>
       </div>

       <button onClick={() => window.print()} className="mt-8 mx-auto flex items-center gap-2 px-6 py-3 border border-chic-primary/30 text-chic-deep hover:bg-chic-primary hover:text-white rounded-full text-xs uppercase tracking-widest transition-all no-print shadow-sm">
          <span>📥</span> Dosyayı Kaydet (PDF)
       </button>
    </div>
  );
};
export default PremiumReport;