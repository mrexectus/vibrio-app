
import React from 'react';

interface MetricInsightsProps {
  metrics: {
    trust: number;
    passion: number;
    communication: number;
  };
}

const INSIGHT_DATA = {
  trust: {
    label: "Güven Faktörü",
    icon: "🛡️",
    color: "bg-chic-success/5",
    border: "border-chic-success/20",
    text: "Güven, bir ilişkinin 'duygusal emniyet supabı'dır. Sadece sadakati değil, partnerinizin yanında savunmasız kalabilme cesaretini de temsil eder. Gottman metoduna göre güven, 'karşılıklı çıkar'ın ötesine geçip 'ortak refah'ı önceliklendirdiğinizde inşa edilir. Analizinizdeki güven skoru, partnerinizin sizin en karanlık odalarınızda elinizi tutup tutamayacağına dair bilinçaltı inancınızı yansıtır."
  },
  passion: {
    label: "Tutku Dinamiği",
    icon: "🔥",
    color: "bg-chic-primary/5",
    border: "border-chic-primary/20",
    text: "Tutku, ilişkinin motoruna yakıt sağlayan 'eros' enerjisidir. Bu enerji sadece fiziksel çekimden değil, partnerinize duyduğunuz bitmek bilmeyen 'merak' duygusundan beslenir. Jungiyen perspektifte tutku, kendi içinizdeki tamamlanmamış parçaları partnerinizde bulduğunuzda alevlenir. Skoru korumak için, partnerinizi her gün 'yeniden keşfedilmesi gereken bir gizem' olarak görmeye devam etmelisiniz."
  },
  communication: {
    label: "İletişim Kanalı",
    icon: "💬",
    color: "bg-chic-accent/5",
    border: "border-chic-accent/20",
    text: "İletişim, duygusal verilerin iki ruh arasında gidip geldiği 'fiber optik hat'tır. Sağlıklı bir iletişimde kelimelerden çok, satır aralarındaki 'duygusal çağrılar' önemlidir. Partnerinizin bir şakasına gülmeniz veya bir iç çekişine dönüp bakmanız, iletişimin en temel tuğlalarıdır. Bu skoru yükseltmek, 'haklı çıkma' arzusunu terk edip partnerinizin gerçekliğini 'onun gözlerinden' görme sanatında ustalaşmayı gerektirir."
  }
};

const MetricInsights: React.FC<MetricInsightsProps> = ({ metrics }) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-chic-deep/40 pl-2">Metrik Analiz Detayları</h4>
      
      {(Object.keys(INSIGHT_DATA) as Array<keyof typeof INSIGHT_DATA>).map((key) => {
        const item = INSIGHT_DATA[key];
        return (
          <div key={key} className={`p-5 rounded-[2rem] border ${item.border} ${item.color} transition-all hover:shadow-md`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-chic-deep uppercase tracking-widest">{item.label}</span>
                <span className="text-[9px] text-chic-deep/40 font-medium">Etki Gücü: %{metrics[key]}</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-chic-text/80 font-medium text-justify italic">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MetricInsights;
