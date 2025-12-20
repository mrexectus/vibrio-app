
import React, { useState } from 'react';

interface WelcomeTourProps {
  onClose: () => void;
}

const STEPS = [
  {
    title: "Vibrio'ya Hoş Geldin",
    desc: "İlişkinin derinliklerine inmeye hazır mısın? Vibrio, Jungiyen psikoloji ve gelişmiş veri analitiği ile bağını bir röntgen gibi tarar.",
    icon: "👁️",
    badge: "BAŞLANGIÇ"
  },
  {
    title: "Hikayenin Gücü",
    desc: "Metin alanına ne kadar detay girersen, analiz o kadar keskinleşir. Duygularından, şüphelerinden ve ortak anılarınızdan bahsetmeyi unutma.",
    icon: "✍️",
    badge: "ANALİZ"
  },
  {
    title: "Kozmik Sinerji",
    desc: "Burçlarınızı ve ilişki durumunuzu seçerek sistemin astrolojik sinastri algoritmalarını devreye sokun. 'Kozmik Sinerji' paneli sana anlık ipuçları verecektir.",
    icon: "✨",
    badge: "SİNERJİ"
  },
  {
    title: "Gelecek Projeksiyonu",
    desc: "Eğer istersen bir fotoğraf yükle. Yapay zekamız yüz hatlarını ve auranızı işleyerek 20 yıl sonraki halinizi bir projeksiyon olarak sunacaktır.",
    icon: "🔮",
    badge: "PROJEKSİYON"
  }
];

const WelcomeTour: React.FC<WelcomeTourProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-chic-deep/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-chic-bg w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl border border-chic-primary/20 relative overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
          <div 
            className="h-full bg-chic-primary transition-all duration-500 ease-out" 
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>

        <div className="mt-4 flex justify-between items-center mb-8">
           <span className="text-[10px] font-bold tracking-[0.3em] text-chic-primary uppercase">{STEPS[currentStep].badge}</span>
           <span className="text-[10px] text-chic-deep/40 font-bold">{currentStep + 1} / {STEPS.length}</span>
        </div>

        <div className="text-center space-y-6">
           <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg border border-chic-primary/10 text-4xl animate-float">
              {STEPS[currentStep].icon}
           </div>
           
           <div className="space-y-3 animate-slideUp" key={currentStep}>
              <h2 className="text-3xl font-serif font-bold text-chic-deep">{STEPS[currentStep].title}</h2>
              <p className="text-sm text-chic-text leading-relaxed font-sans max-w-xs mx-auto">
                 {STEPS[currentStep].desc}
              </p>
           </div>
        </div>

        <div className="mt-12 flex gap-4">
           {currentStep > 0 && (
             <button 
               onClick={() => setCurrentStep(prev => prev - 1)}
               className="flex-1 py-4 border border-chic-primary/20 text-chic-deep font-bold rounded-2xl uppercase text-[10px] tracking-widest hover:bg-white transition-colors"
             >
               Geri
             </button>
           )}
           <button 
             onClick={next}
             className="flex-[2] py-4 bg-chic-deep text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl shadow-chic-deep/20"
           >
             {currentStep === STEPS.length - 1 ? "Başla →" : "Devam Et"}
           </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-chic-deep/30 hover:text-chic-accent transition-colors text-xl font-light"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default WelcomeTour;
