
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { analyzeRelationship } from './services/geminiService';
import { AnalysisStatus, VibrioResponse, HistoryItem } from './types';
import VibrioGauge from './components/VibrioGauge';
import PremiumReport from './components/PremiumReport';
import RadarChart from './components/RadarChart'; 
import Paywall from './components/Paywall'; 
import Logo from './components/Logo';
import Footer from './components/Footer';
import SynergyBadge from './components/SynergyBadge';
import VisualProjection from './components/VisualProjection';
import WelcomeTour from './components/WelcomeTour';
import HistoryDrawer from './components/HistoryDrawer';
import SoulLoading from './components/SoulLoading';
import AuraSettings, { AuraType } from './components/AuraSettings';
import MetricInsights from './components/MetricInsights';

const ZODIACS = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];

const RELATIONSHIP_TYPES = [
  { id: 'flirt', label: 'Flört' }, { id: 'partner', label: 'Sevgili' },
  { id: 'married', label: 'Evli' }, { id: 'complicated', label: 'Karmaşık' },
  { id: 'ex', label: 'Eski Sevgili' }, { id: 'platonik', label: 'Platonik' }
];

const QUICK_EMOTIONS = ["Toksik mi?", "Özlüyor mu?", "Gelecek Var mı?", "Neden Soğuk?"];

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [userZodiac, setUserZodiac] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState('');
  const [relStatus, setRelStatus] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<(VibrioResponse & { futureImageUrl?: string }) | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showAura, setShowAura] = useState(false);
  const [currentAura, setCurrentAura] = useState<AuraType>('default');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const savedUnlocked = localStorage.getItem('vibrio_unlocked');
    if (savedUnlocked === 'true') setIsUnlocked(true);
    const savedHistory = localStorage.getItem('vibrio_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    const savedAura = localStorage.getItem('vibrio_aura') as AuraType;
    if (savedAura) handleAuraChange(savedAura);
  }, []);

  const handleAuraChange = (aura: AuraType) => {
    setCurrentAura(aura);
    localStorage.setItem('vibrio_aura', aura);
    document.documentElement.setAttribute('data-theme', aura);
  };

  const handleSubmit = async () => {
    if (inputText.trim().length < 15) {
      setErrorMsg("Daha derin bir analiz için en az birkaç cümle yazmalısın.");
      return;
    }
    setErrorMsg(null);
    setStatus(AnalysisStatus.ANALYZING);
    try {
      const data = await analyzeRelationship(inputText, userZodiac, partnerZodiac, relStatus);
      setResult(data);
      const newItem = { id: Date.now().toString(), timestamp: Date.now(), userZodiac, partnerZodiac, relStatus, result: data };
      const updatedHistory = [newItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('vibrio_history', JSON.stringify(updatedHistory));
      setStatus(AnalysisStatus.COMPLETED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setErrorMsg("Bağlantı zayıf, ruhlar senkronize edilemiyor. Lütfen tekrar dene.");
      setStatus(AnalysisStatus.IDLE);
    }
  };

  const reset = () => {
    setStatus(AnalysisStatus.IDLE);
    setResult(null);
    setInputText('');
    setShowOptions(false);
    setErrorMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-chic-bg transition-colors duration-1000 pb-20 selection:bg-chic-primary selection:text-white">
      <HistoryDrawer isOpen={showHistory} onClose={() => setShowHistory(false)} history={history} onSelect={(item) => { setResult(item.result); setStatus(AnalysisStatus.COMPLETED); setShowHistory(false); }} onDelete={() => {}} onClear={() => setHistory([])} />
      <AuraSettings currentAura={currentAura} onAuraChange={handleAuraChange} isOpen={showAura} onClose={() => setShowAura(false)} />
      
      <nav className="glass-nav flex items-center justify-between px-6 md:px-12">
        <div onClick={reset} className="cursor-pointer"><Logo /></div>
        <div className="flex gap-6 opacity-40 hover:opacity-100 transition-opacity">
          <button onClick={() => setShowAura(true)} className="text-lg">🎨</button>
          <button onClick={() => setShowHistory(true)} className="text-lg">🕒</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32">
        {status === AnalysisStatus.IDLE && (
          <div className="space-y-16 animate-reveal text-center">
            <div className="space-y-4">
              <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                className="zen-input scrollbar-hide h-64 md:h-80"
                placeholder="İlişkin hakkında bir şeyler fısılda..."
              />
              <div className="flex flex-wrap justify-center gap-4 opacity-30">
                {QUICK_EMOTIONS.map(e => (
                  <button key={e} onClick={() => setInputText(p => `${p} ${e}`)} className="text-[10px] font-bold uppercase tracking-widest hover:text-chic-primary transition-colors">
                    # {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <button onClick={() => setShowOptions(!showOptions)} className="btn-minimal-toggle">
                {showOptions ? "Seçenekleri Daralt —" : "Kozmik Bilgiler Ekle +"}
              </button>

              {showOptions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-reveal">
                  <select value={relStatus} onChange={e => setRelStatus(e.target.value)} className="minimal-select">
                    <option value="">Durum</option>
                    {RELATIONSHIP_TYPES.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}
                  </select>
                  <select value={userZodiac} onChange={e => setUserZodiac(e.target.value)} className="minimal-select">
                    <option value="">Senin Burcun</option>
                    {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                  <select value={partnerZodiac} onChange={e => setPartnerZodiac(e.target.value)} className="minimal-select">
                    <option value="">Onun Burcu</option>
                    {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              )}

              <div className="pt-8">
                <button 
                  onClick={handleSubmit}
                  disabled={inputText.trim().length < 5}
                  className="w-full max-w-sm py-6 bg-chic-deep text-white rounded-full font-serif italic text-2xl shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95 disabled:opacity-10"
                >
                  Analizi Başlat →
                </button>
              </div>
              {errorMsg && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">{errorMsg}</p>}
            </div>
          </div>
        )}

        {status === AnalysisStatus.ANALYZING && <SoulLoading />}

        {status === AnalysisStatus.COMPLETED && result && (
          <div className="space-y-32 animate-reveal">
            <header className="text-center space-y-12">
              <div className="scale-110 md:scale-150 py-10">
                <VibrioGauge score={result.vibrio_score} />
              </div>
              <h2 className="revelation-comment">"{result.free_comment}"</h2>
            </header>

            {!isUnlocked && <Paywall onUnlock={() => setIsUnlocked(true)} />}

            <div className={`space-y-32 transition-all duration-[1500ms] ${!isUnlocked ? 'blur-[60px] opacity-20 pointer-events-none scale-95' : 'scale-100 opacity-100'}`}>
              <div className="max-w-xs mx-auto"><RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} /></div>
              <PremiumReport content={result.premium_report_content} />
              <VisualProjection isUnlocked={isUnlocked} generatedImage={result.futureImageUrl} description="Gelecekteki olası bir anınızın yapay zeka tarafından işlenmiş hali." />
              <MetricInsights metrics={result.metrics} />
            </div>

            <div className="pt-20 border-t border-chic-deep/5 flex flex-col items-center gap-10">
              <button onClick={reset} className="btn-minimal-toggle !text-chic-deep !opacity-100">Yeni Analiz</button>
              <p className="text-[9px] uppercase tracking-widest text-chic-deep/10 font-bold">Vibrio Intelligence Engine • Tüm Hakları Saklıdır</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
