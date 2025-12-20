
import React, { useState, useRef, useEffect, useMemo, useLayoutEffect } from 'react';
import { analyzeRelationship } from './services/geminiService';
import { AnalysisStatus, VibrioResponse, HistoryItem } from './types';
import VibrioGauge from './components/VibrioGauge';
import PremiumReport from './components/PremiumReport';
import RadarChart from './components/RadarChart'; 
import Paywall from './components/Paywall'; 
import Logo from './components/Logo';
import Footer from './components/Footer';
import AstroInsightPanel from './components/AstroInsightPanel';
import SynergyBadge from './components/SynergyBadge';
import VisualProjection from './components/VisualProjection';
import WelcomeTour from './components/WelcomeTour';
import HistoryDrawer from './components/HistoryDrawer';
import SoulLoading from './components/SoulLoading';
import AuraSettings, { AuraType } from './components/AuraSettings';
import MetricInsights from './components/MetricInsights';

const ZODIACS = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];

const RELATIONSHIP_TYPES = [
  { id: 'flirt', label: 'Flört' },
  { id: 'partner', label: 'Sevgili' },
  { id: 'fiance', label: 'Nişanlı' },
  { id: 'married', label: 'Evli' },
  { id: 'long_distance', label: 'Uzak Mesafe İlişkisi' },
  { id: 'separated', label: 'Ayrı Yaşıyoruz / Moladayız' },
  { id: 'ex', label: 'Eski Sevgili' },
  { id: 'complicated', label: 'Karmaşık / Belirsiz' },
  { id: 'platonik', label: 'Platonik / Tek Taraflı' }
];

const getElement = (zodiac: string) => {
    const fire = ["Koç", "Aslan", "Yay"];
    const earth = ["Boğa", "Başak", "Oğlak"];
    const air = ["İkizler", "Terazi", "Kova"];
    const water = ["Yengeç", "Akrep", "Balık"];
    if (fire.includes(zodiac)) return "Ateş";
    if (earth.includes(zodiac)) return "Toprak";
    if (air.includes(zodiac)) return "Hava";
    if (water.includes(zodiac)) return "Su";
    return "";
};

const SUGGESTIONS = [
  { 
    category: "Dinamikler", 
    color: "bg-chic-primary/10",
    items: ["Love Bombing", "Gaslighting", "Breadcrumbing", "Orbeting", "Stashing", "Benimleme", "Kaçan Kovalanır", "Toksik Döngü"] 
  },
  { 
    category: "Duygular", 
    color: "bg-chic-accent/10",
    items: ["Yetersizlik", "Ait Olma", "Güvensizlik", "Heyecan", "Melankoli", "Öfke", "Hayranlık", "Şüphe"] 
  },
  { 
    category: "Engeller", 
    color: "bg-chic-deep/5",
    items: ["Mesafe", "Aile Baskısı", "Kariyer", "Eski Sevgili", "Üçüncü Kişiler", "Zıt Karakterler", "Yalan", "Sessizlik"] 
  },
  { 
    category: "Hedefler", 
    color: "bg-chic-success/10",
    items: ["Evlilik", "Ciddi İlişki", "Sadece Flört", "Güven Tazelemek", "Onu Unutmak", "Kendimi Tanımak"] 
  }
];

const getAstroInsight = (z1: string, z2: string) => {
  if (!z1 || !z2) return null;
  const i1 = ZODIACS.indexOf(z1);
  const i2 = ZODIACS.indexOf(z2);
  let diff = Math.abs(i1 - i2);
  if (diff > 6) diff = 12 - diff;
  
  const aspects = [
    { name: "Kavuşum: Soul Mirror", desc: "İnanılmaz bir benzerlik. Birbirinizin en derin, karanlık ve aydınlık yönlerini bir ayna gibi yansıtıyorsunuz.", score: 95 },
    { name: "Yarı Sekstil: Karma Köprüsü", desc: "Birbirinizin kör noktalarını tamamlıyorsunuz. Aranızda sessiz bir öğretici-öğrenci dinamiği var.", score: 68 },
    { name: "Sekstil: Entelektüel Sinerji", desc: "Harika bir arkadaşlık ve zihinsel uyum. İletişim kanalınız her zaman açık.", score: 82 },
    { name: "Kare: Tutkulu Gerilim", desc: "Yüksek adrenalin ve dinamizm. Birbirinizi hem çok çekici buluyor hem de en hassas noktalarınızdan tetikliyorsunuz.", score: 72 },
    { name: "Üçgen: İlahi Senkronizasyon", desc: "Zahmetsiz bir akış. Birbirinizin ruhsal ritmine en baştan uyumlanmışsınız.", score: 96 },
    { name: "Quin-Cunx: Mistik Gizem", desc: "Bazen birbirinizi hiç anlamadığınızı hissedebilirsiniz ama bu gizem sizi daha da derine çekiyor.", score: 60 },
    { name: "Zıt: Manyetik Polarite", desc: "Tamamen zıt kutuplar ama birbirini tamamlayan tek parçalar. Birinizde olmayan her şey diğerinde var.", score: 91 }
  ];
  
  return { 
    ...aspects[diff], 
    element1: getElement(z1), 
    element2: getElement(z2) 
  };
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [userZodiac, setUserZodiac] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState('');
  const [relStatus, setRelStatus] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<(VibrioResponse & { futureImageUrl?: string }) | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAura, setShowAura] = useState(false);
  const [currentAura, setCurrentAura] = useState<AuraType>('default');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedUnlocked = localStorage.getItem('vibrio_unlocked');
    if (savedUnlocked === 'true') setIsUnlocked(true);

    const tourDone = localStorage.getItem('vibrio_tour_completed');
    if (!tourDone) setShowTour(true);

    const savedHistory = localStorage.getItem('vibrio_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedAura = localStorage.getItem('vibrio_aura') as AuraType;
    if (savedAura) handleAuraChange(savedAura);
  }, []);

  const handleAuraChange = (aura: AuraType) => {
    setCurrentAura(aura);
    localStorage.setItem('vibrio_aura', aura);
    if (aura === 'default') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', aura);
    }
  };

  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('vibrio_tour_completed', 'true');
  };

  const saveToHistory = (data: VibrioResponse & { futureImageUrl?: string }) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      userZodiac,
      partnerZodiac,
      relStatus,
      result: data
    };
    const updatedHistory = [newItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('vibrio_history', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('vibrio_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('vibrio_history');
  };

  const loadFromHistory = (item: HistoryItem) => {
    setUserZodiac(item.userZodiac);
    setPartnerZodiac(item.partnerZodiac);
    setRelStatus(item.relStatus);
    setResult(item.result);
    setStatus(AnalysisStatus.COMPLETED);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    // Enforce 50 character minimum validation
    if (!inputText || inputText.trim().length < 50) {
      setErrorMsg("Ruhsal derinlik analizi için en az 50 karakterlik bir hikaye girmelisin.");
      return;
    }
    
    setErrorMsg(null);
    setStatus(AnalysisStatus.ANALYZING);

    try {
      const data = await analyzeRelationship(inputText, userZodiac, partnerZodiac, relStatus, imageFile);
      setResult(data);
      saveToHistory(data);
      setStatus(AnalysisStatus.COMPLETED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setErrorMsg(e.message);
      setStatus(AnalysisStatus.IDLE);
    }
  };

  const reset = () => { 
    setStatus(AnalysisStatus.IDLE); 
    setInputText(''); 
    setResult(null); 
    setImageFile(null); 
    setRelStatus('');
    setUserZodiac('');
    setPartnerZodiac('');
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const clearInputText = () => {
    if (inputText && window.confirm("Yazdıklarını silmek istediğine emin misin?")) {
        setInputText('');
    }
  };

  const astroInsight = useMemo(() => getAstroInsight(userZodiac, partnerZodiac), [userZodiac, partnerZodiac]);

  const getInputDepth = (len: number) => {
    if (len > 1000) return { label: 'Efsanevi', color: 'text-purple-500' };
    if (len > 500) return { label: 'Maksimum', color: 'text-chic-success' };
    if (len > 200) return { label: 'Yüksek', color: 'text-chic-primary' };
    return { label: 'Standart', color: 'text-chic-deep/40' };
  };

  const depth = getInputDepth(inputText.length);
  const isInputTooShort = inputText.length > 0 && inputText.length < 50;

  const handleSuggestionClick = (item: string) => {
    setInputText(prev => {
        const trimmed = prev.trim();
        if (trimmed.length === 0) return item;
        const lastChar = trimmed.slice(-1);
        const needsSpace = !['.', '!', '?', ','].includes(lastChar);
        return trimmed + (needsSpace ? ", " : " ") + item;
    });
  };

  return (
    <div className="min-h-dvh font-sans text-chic-text pb-safe relative overflow-x-hidden bg-chic-bg transition-colors duration-500">
      {showTour && <WelcomeTour onClose={handleCloseTour} />}
      <HistoryDrawer 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        history={history}
        onSelect={loadFromHistory}
        onDelete={deleteFromHistory}
        onClear={clearHistory}
      />
      <AuraSettings 
        currentAura={currentAura}
        onAuraChange={handleAuraChange}
        isOpen={showAura}
        onClose={() => setShowAura(false)}
      />
      
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-chic-primary/10 h-16 flex items-center px-6 justify-between transition-colors">
        <div onClick={reset} className="cursor-pointer scale-75 transition-transform active:scale-70"><Logo /></div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAura(true)} 
            className="w-10 h-10 rounded-full border border-chic-primary/20 flex items-center justify-center text-chic-primary hover:bg-chic-primary/5 transition-colors"
            title="Görünümü Değiştir"
          >
            🎨
          </button>
          <button 
            onClick={() => setShowHistory(true)} 
            className="w-10 h-10 rounded-full border border-chic-primary/20 flex items-center justify-center text-chic-primary hover:bg-chic-primary/5 transition-colors relative"
            title="Geçmiş Analizler"
          >
            🕒
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-chic-accent text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white">
                {history.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setShowTour(true)} 
            className="w-10 h-10 rounded-full border border-chic-primary/20 flex items-center justify-center text-chic-primary hover:bg-chic-primary/5 transition-colors"
            title="Yardım Al"
          >
            ？
          </button>
          {status === AnalysisStatus.COMPLETED && (
            <button onClick={reset} className="bg-chic-deep text-white px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg transition-transform active:scale-95">Yeni Analiz</button>
          )}
        </div>
      </nav>

      <main className="pt-20 max-w-6xl mx-auto px-4">
        {status === AnalysisStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
            <AstroInsightPanel insight={astroInsight} />
            
            <div className="space-y-6 pt-4">
              <div className="md:hidden">
                <SynergyBadge insight={astroInsight} />
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-chic-primary/20 transition-all focus-within:shadow-2xl focus-within:border-chic-primary/40 relative input-stylized-frame custom-input-container">
                <div className="relative group">
                    <textarea 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full min-h-[220px] bg-transparent resize-y outline-none font-medium text-chic-deep leading-relaxed scrollbar-hide placeholder:italic pr-10"
                    placeholder="İlişkinizin hikayesini, şüphelerinizi ve hissettiklerinizi buraya dökün... Detaylar analizin kalitesini artırır."
                    />
                    {inputText && (
                        <button 
                            onClick={clearInputText}
                            className="absolute top-0 right-0 p-2 text-chic-accent/40 hover:text-red-500 transition-colors"
                            title="Metni Temizle"
                        >
                            ✕
                        </button>
                    )}
                </div>
                
                <div className="mt-4 space-y-5 border-t border-chic-primary/10 pt-5 mb-6">
                    <div className="flex flex-col gap-4">
                        {SUGGESTIONS.map(cat => (
                            <div key={cat.category} className="flex flex-col gap-1.5">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-chic-deep/40 px-1">{cat.category}</span>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map(item => (
                                        <button 
                                            key={item}
                                            onClick={() => handleSuggestionClick(item)}
                                            className={`text-[10px] font-medium px-4 py-1.5 border border-chic-primary/10 rounded-full hover:border-chic-primary hover:bg-chic-primary/5 transition-all active:scale-95 shadow-sm bg-white`}
                                        >
                                            + {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] mb-4 border-t border-chic-primary/10 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="opacity-40">Veri Derinliği:</span>
                    <span className={`font-bold ${depth.color}`}>{depth.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isInputTooShort && <span className="text-red-500 animate-pulse">⚠️ En az 50</span>}
                    <span className={`font-bold ${isInputTooShort ? 'text-red-500' : 'text-chic-deep'}`}>{inputText.length}</span>
                    <span className="opacity-40">Karakter</span>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <select 
                    value={relStatus} 
                    onChange={e => setRelStatus(e.target.value)} 
                    className="w-full p-4 bg-chic-bg rounded-2xl border border-chic-primary/10 text-sm focus:border-chic-primary outline-none appearance-none font-medium text-chic-deep transition-colors"
                  >
                    <option value="">Mevcut İlişki Durumu</option>
                    {RELATIONSHIP_TYPES.map(type => (
                        <option key={type.id} value={type.label}>{type.label}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <select value={userZodiac} onChange={e => setUserZodiac(e.target.value)} className="p-4 bg-chic-bg rounded-2xl border border-chic-primary/10 text-sm focus:border-chic-primary outline-none appearance-none font-medium transition-colors">
                      <option value="">Senin Burcun</option>
                      {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                    <select value={partnerZodiac} onChange={e => setPartnerZodiac(e.target.value)} className="p-4 bg-chic-bg rounded-2xl border border-chic-primary/10 text-sm focus:border-chic-primary outline-none appearance-none font-medium transition-colors">
                      <option value="">Onun Burcu</option>
                      {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className={`p-4 rounded-2xl border transition-all ${imageFile ? 'bg-chic-success border-chic-success text-white' : 'bg-chic-bg border-chic-primary/10 hover:border-chic-primary'}`}
                    title="Fotoğraf Ekle"
                  >
                    {imageFile ? '✅' : '📸'}
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  <button 
                    onClick={handleSubmit} 
                    className="flex-[2] bg-chic-deep text-white rounded-2xl font-serif italic text-lg shadow-lg hover:bg-black transition-all active:scale-[0.98]"
                  >
                    Analiz Et →
                  </button>
                  <button 
                    onClick={reset}
                    className="flex-1 bg-white border border-chic-primary/20 text-chic-deep rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-chic-bg transition-colors reset-btn"
                  >
                    Sıfırla
                  </button>
                </div>
                {errorMsg && <p className="mt-4 text-center text-xs text-red-500 font-bold animate-pulse">{errorMsg}</p>}
              </div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.ANALYZING && (
          <SoulLoading />
        )}

        {status === AnalysisStatus.COMPLETED && result && (
          <div className="animate-slideUp space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-chic-primary/10 text-center transition-colors">
                  <VibrioGauge score={result.vibrio_score} metrics={result.metrics} />
                  <p className="mt-4 font-hand text-xl italic text-chic-deep">{result.free_comment}</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-chic-primary/10 h-64 transition-colors">
                  <RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} />
                </div>
                <MetricInsights metrics={result.metrics} />
                <VisualProjection 
                  isUnlocked={isUnlocked} 
                  generatedImage={result.futureImageUrl} 
                  description="Birlikte geçecek 20 yılın ardından, gözlerinizdeki o derin huzur ve birbirinize olan bağlılığınız birer sanat eserine dönüşecek."
                />
              </div>
              <div className="md:col-span-8">
                {!isUnlocked && <Paywall onUnlock={() => setIsUnlocked(true)} />}
                <div className={`transition-all duration-1000 ${!isUnlocked ? 'blur-md pointer-events-none opacity-50 h-[400px] overflow-hidden' : ''}`}>
                  <PremiumReport content={result.premium_report_content} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
