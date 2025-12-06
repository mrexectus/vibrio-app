import React, { useState, useRef, useEffect, useMemo } from 'react';
import { analyzeRelationship } from './services/geminiService';
import { AnalysisStatus, VibrioResponse } from './types';
import VibrioGauge from './components/VibrioGauge';
import PremiumReport from './components/PremiumReport';
import RadarChart from './components/RadarChart'; 
import Paywall from './components/Paywall'; 
import Logo from './components/Logo';
import Footer from './components/Footer';

const ZODIACS = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
const RELATIONSHIP_TYPES = [{ id: 'flirt', label: 'Flört' }, { id: 'partner', label: 'Sevgili' }, { id: 'ex', label: 'Eski Sevgili' }, { id: 'complicated', label: 'Karışık' }, { id: 'platonik', label: 'Platonik' }];
const PROMPTS = ["Neden soğuk davranıyor?", "Benimle gelecek düşünüyor mu?", "Benden ne saklıyor?", "Bu ilişki bitti mi?", "Beni gerçekten seviyor mu?"];

const EMOJI_CATEGORIES = [
  { title: "🚩 Toksik", desc: "Öfke ve saygısızlık sinyalleri.", emojis: ["🚩", "🤬", "🚮", "🖕", "💣", "☠️", "🚫", "😤", "🤮", "💥"] },
  { title: "🌪️ Manipülasyon", desc: "Gaslighting ve kafa karıştırma.", emojis: ["🌀", "😵‍💫", "🫥", "🎭", "🤥", "🤡", "😶", "🤫", "🫣"] },
  { title: "🍞 Breadcrumbing", desc: "Sizi elde tutmak için verilen kırıntılar.", emojis: ["👀", "👋", "🦴", "🎣", "🕰️", "🤔", "🤷‍♂️", "📱", "🐌"] },
  { title: "🙂 Pasif Agresif", desc: "Gizli öfke ve iğneleme.", emojis: ["🙂", "🙃", "🫠", "👍", "🆗", "🫡", "☕", "💅", "🙄"] },
  { title: "✅ Güvenli", desc: "Gerçek sevgi işaretleri.", emojis: ["🏡", "🌳", "🤝", "🫂", "🍵", "✨", "🕊️", "🧿", "💙"] }
];

const getAstroInsight = (z1: string, z2: string) => {
  if (!z1 || !z2) return null;
  const i1 = ZODIACS.indexOf(z1);
  const i2 = ZODIACS.indexOf(z2);
  let diff = Math.abs(i1 - i2);
  if (diff > 6) diff = 12 - diff;
  const aspects = [
    { name: "Kavuşum (0°)", desc: "Ayna Etkisi: Aynı ruhun iki yarısı." },
    { name: "Yarı Sekstil (30°)", desc: "Öğretici: Farklı dünyalar." },
    { name: "Sekstil (60°)", desc: "Suç Ortağı: Hem sevgili hem dost." },
    { name: "Kare (90°)", desc: "Yüksek Voltaj: Tutku ve ego savaşı." },
    { name: "Üçgen (120°)", desc: "İlahi Uyum: Huzurlu akış." },
    { name: "Karmik (150°)", desc: "Kadersel Bağ: Geçmişten gelen borç." },
    { name: "Zıt (180°)", desc: "Mıknatıs: Zıt kutuplar çeker." }
  ];
  return aspects[diff];
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [userZodiac, setUserZodiac] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState('');
  const [relStatus, setRelStatus] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [result, setResult] = useState<VibrioResponse | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [socialProof, setSocialProof] = useState<{name: string, location: string} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const url = new URLSearchParams(window.location.search);
      if (url.get('payment') === 'success' || localStorage.getItem('vibrio_unlocked') === 'true') {
        setIsUnlocked(true);
        if (url.get('payment') === 'success') window.history.replaceState({}, document.title, window.location.pathname);
      }
      const savedRes = localStorage.getItem('vibrio_result');
      if(savedRes) { setResult(JSON.parse(savedRes)); setStatus(AnalysisStatus.COMPLETED); }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { if(isUnlocked) localStorage.setItem('vibrio_unlocked', 'true'); }, [isUnlocked]);

  useEffect(() => {
    const names = ["Selin", "Ayşe", "Merve", "Elif", "Deniz"];
    const locs = ["İstanbul, Kadıköy", "İzmir, Karşıyaka", "Ankara, Çankaya", "Muğla, Bodrum"];
    const int = setInterval(() => { 
      if (Math.random() > 0.7) {
        setSocialProof({ name: names[Math.floor(Math.random()*names.length)], location: locs[Math.floor(Math.random()*locs.length)] });
        setTimeout(() => setSocialProof(null), 4000);
      }
    }, 12000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if(status === AnalysisStatus.ANALYZING) {
      const msgs = ["Bilinçaltı Kodları Taranıyor...", "Emoji ve Beden Dili Çözülüyor...", "Gottman Analizi Yapılıyor...", "Karmik Bağlar Hesaplanıyor..."];
      let i=0; setLoadingMsg(msgs[0]);
      const t = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 2500);
      return () => clearInterval(t);
    }
    if(status === AnalysisStatus.COMPLETED) setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [status]);

  const handleSubmit = async () => {
    // ZORUNLULUK KALDIRILDI: Sadece metin veya resim varsa analiz başlar.
    if(!inputText && !imageFile) { setErrorMsg("Lütfen analiz için bir metin yazın veya fotoğraf yükleyin."); return; }
    
    const apiKey = (import.meta as any).env?.VITE_GOOGLE_API_KEY || (process as any).env?.API_KEY || (process as any).env?.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      setErrorMsg("Sistem Hatası: API Anahtarı bulunamadı. Lütfen kurulumu kontrol edin.");
      return;
    }

    setErrorMsg(null); setStatus(AnalysisStatus.ANALYZING);
    try {
      const data = await analyzeRelationship(inputText, userZodiac, partnerZodiac, relStatus, imageFile);
      setResult(data); setStatus(AnalysisStatus.COMPLETED); localStorage.setItem('vibrio_result', JSON.stringify(data));
    } catch(e: any) { setErrorMsg(e.message); setStatus(AnalysisStatus.IDLE); }
  };

  const reset = () => { localStorage.removeItem('vibrio_result'); setResult(null); setStatus(AnalysisStatus.IDLE); setInputText(''); setIsUnlocked(false); };
  const astroInsight = useMemo(() => getAstroInsight(userZodiac, partnerZodiac), [userZodiac, partnerZodiac]);
  const addEmoji = (emoji: string) => { setInputText(prev => prev + emoji); textareaRef.current?.focus(); };

  const handleShare = async () => {
     if (result) {
        const text = `Vibrio İlişki Analizi Sonucum: ${result.vibrio_score} Puan! "${result.free_comment}" Sen de dene: https://vibrio.info`;
        if (navigator.share) try { await navigator.share({ title: 'Vibrio Analizi', text, url: 'https://vibrio.info' }); } catch(e) {}
        else { navigator.clipboard.writeText(text); alert("Sonuç kopyalandı!"); }
     }
  };

  const PremiumBenefits = () => (
    <div className="space-y-4 pt-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-chic-accent mb-4 border-b border-chic-primary/20 pb-2">Premium Analiz Kapsamı</h3>
      {[
        { icon: "🧠", title: "Bilinçaltı Okuma", desc: "Size söyleyemediği gizli düşünceleri." },
        { icon: "🚩", title: "Beni Manipüle Ediyor mu?", desc: "Gaslighting ve toksik sinyaller." },
        { icon: "⏳", title: "Bu İlişki Nereye Gidiyor?", desc: "6-12 aylık somut gelecek tahmini." },
        { icon: "🔑", title: "Onu Nasıl Etkilerim?", desc: "Burcuna özel iletişim anahtarı." }
      ].map((feat, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-chic-primary/10 hover:bg-white/90 transition-colors">
            <span className="text-xl pt-1">{feat.icon}</span>
            <div><h4 className="font-serif font-bold text-chic-deep text-sm">{feat.title}</h4><p className="text-[11px] text-gray-500 leading-tight mt-0.5">{feat.desc}</p></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-dvh font-sans text-chic-text selection:bg-chic-primary selection:text-white pb-safe relative overflow-x-hidden">
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-chic-bg/95 backdrop-blur-md border-b border-chic-primary/10 h-16 items-center transition-all">
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <div onClick={reset} className="cursor-pointer"><Logo /></div>
          {status === AnalysisStatus.COMPLETED && <button onClick={reset} className="text-[10px] uppercase font-bold text-chic-deep/50 border border-chic-primary/20 px-3 py-1 rounded-full">Yeni Analiz</button>}
        </div>
      </nav>

      <main className="md:pt-24 w-full max-w-6xl mx-auto md:pb-12">
        {status === AnalysisStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center animate-fadeIn min-h-[75vh]">
            <div className="hidden md:flex flex-col space-y-6 pt-2 sticky top-24 self-center">
               <h1 className="text-5xl font-serif font-medium text-chic-deep leading-tight">Onun Zihnini & <br/><span className="italic text-chic-primary">Kalbini Oku.</span></h1>
               <p className="text-chic-text/80 leading-relaxed font-light text-lg">Vibrio; Jungiyen psikoloji ve astrolojinin gücüyle, ilişkinin görünmeyen yüzünü ortaya çıkaran profesyonel bir analiz aracıdır.</p>
               <PremiumBenefits />
            </div>

            <div className="w-full flex flex-col justify-center min-h-dvh md:min-h-0 md:justify-center py-4 md:py-0">
               <div className="md:hidden text-center mb-4 scale-90"><Logo /><p className="text-[10px] text-chic-text/60 mt-1 uppercase tracking-widest">Yapay Zeka Destekli İlişki Analisti</p></div>

               <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-xl shadow-chic-deep/5 border border-white p-5 md:p-8 relative overflow-hidden mx-3 md:mx-0">
                  <div className="relative z-10 space-y-5 md:space-y-6">
                     <div className="flex flex-wrap justify-center gap-2 px-1">
                        {RELATIONSHIP_TYPES.map(type => (
                           <button key={type.id} onClick={() => setRelStatus(type.label)} className={`px-5 py-3 rounded-xl text-xs font-bold transition-all border shadow-sm ${relStatus === type.label ? 'bg-chic-deep text-white border-chic-deep shadow-md scale-105' : 'bg-white text-gray-500 border-gray-100 hover:border-chic-primary/30'}`}>{type.label}</button>
                        ))}
                     </div>

                     <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-chic-accent tracking-widest pl-1 flex items-center gap-1"><span>👤</span> Senin Burcun</label>
                            <div className="relative">
                              <select value={userZodiac} onChange={(e) => setUserZodiac(e.target.value)} className="w-full bg-chic-bg border-none rounded-xl py-3 px-3 text-xs font-serif text-chic-deep font-medium focus:ring-1 focus:ring-chic-primary appearance-none cursor-pointer shadow-sm">
                                  <option value="">Seçiniz</option>{ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                              </select>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-chic-primary pointer-events-none">▼</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-chic-accent tracking-widest pl-1 flex items-center gap-1"><span>🤍</span> Partnerin Burcu</label>
                            <div className="relative">
                              <select value={partnerZodiac} onChange={(e) => setPartnerZodiac(e.target.value)} className="w-full bg-chic-bg border-none rounded-xl py-3 px-3 text-xs font-serif text-chic-deep font-medium focus:ring-1 focus:ring-chic-primary appearance-none cursor-pointer shadow-sm">
                                  <option value="">Seçiniz</option>{ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                              </select>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-chic-primary pointer-events-none">▼</span>
                            </div>
                        </div>
                     </div>

                     {astroInsight && (
                        <div className="animate-slideUp bg-chic-bg/50 border border-chic-primary/10 rounded-lg p-3 flex gap-3 items-center">
                           <span className="text-xl">✨</span>
                           <div><h5 className="font-serif font-bold text-chic-deep text-[10px] uppercase tracking-wide">{astroInsight.name}</h5><p className="text-[10px] text-chic-text/70 leading-tight mt-0.5 italic">{astroInsight.desc}</p></div>
                        </div>
                     )}

                     <div className="relative group pt-1">
                        <textarea ref={textareaRef} onFocus={() => setIsTextareaFocused(true)} onBlur={() => !inputText && setIsTextareaFocused(false)} value={inputText} onChange={e=>setInputText(e.target.value)}
                           className={`w-full transition-all duration-300 bg-chic-bg rounded-xl border-none p-4 pb-8 text-xs md:text-sm text-chic-deep placeholder:text-gray-400 focus:ring-1 focus:ring-chic-primary resize-none leading-relaxed shadow-inner ${isTextareaFocused || inputText ? 'h-36' : 'h-24'}`}
                           placeholder="Aklındaki soruyu sor, mesajını yapıştır veya durumu anlat..." autoComplete="off"
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2">
                            <span className={`text-[9px] text-chic-primary/70 font-medium italic pointer-events-none hidden md:block ${isTextareaFocused ? 'opacity-100' : 'opacity-0'} transition-opacity`}>Psikolojik Emoji Analizi</span>
                            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border shadow-sm z-20 ${showEmojiPicker ? 'bg-chic-deep text-white border-chic-deep' : 'bg-white text-chic-deep border-gray-200 hover:border-chic-primary'}`}>
                                <span className="text-sm leading-none">☺︎</span><span className="uppercase tracking-wider">Emoji</span>
                            </button>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-2 justify-center pb-2">
                        {PROMPTS.map((p,i) => (
                           <button key={i} onClick={()=>{setInputText(p); setIsTextareaFocused(true);}} className="text-[10px] bg-white border border-gray-100 px-4 py-2 rounded-full text-gray-500 hover:border-chic-primary hover:text-chic-primary transition-colors shadow-sm whitespace-nowrap">{p}</button>
                        ))}
                     </div>

                     <div onClick={()=>fileInputRef.current?.click()} className={`w-full py-5 px-4 border border-dashed rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 group ${imageFile ? 'border-green-300 bg-green-50/50' : 'border-chic-primary/30 bg-chic-primary/5 hover:bg-chic-primary/10'}`}>
                        <input type="file" ref={fileInputRef} onChange={e => e.target.files && setImageFile(e.target.files[0])} className="hidden" accept="image/*"/>
                        <div className="flex items-center gap-4"><span className="text-2xl">📸</span><div className="text-left"><span className="text-xs font-bold text-chic-deep uppercase tracking-widest block">{imageFile ? 'Görsel Yüklendi' : 'Ekran Görüntüsü Yükle'}</span>{!imageFile && <span className="text-[10px] text-chic-deep/60 leading-none">Gizli sinyalleri ve mesajları çözer.</span>}</div></div>
                        {imageFile ? <span className="text-[9px] text-red-400 font-bold uppercase" onClick={(e)=>{e.stopPropagation(); setImageFile(null)}}>Kaldır</span> : <span className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity text-chic-primary font-light">+</span>}
                     </div>

                     {showEmojiPicker && (
                       <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-chic-deep/20 backdrop-blur-sm animate-fadeIn" onClick={() => setShowEmojiPicker(false)}>
                         <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slideUp border border-chic-primary/10" onClick={e => e.stopPropagation()}>
                           <div className="bg-chic-bg p-3 border-b border-gray-100 flex justify-between items-center"><h4 className="text-xs font-bold text-chic-deep uppercase tracking-widest">Dijital Beden Dili</h4><button onClick={() => setShowEmojiPicker(false)} className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">×</button></div>
                           <div className="max-h-[40vh] overflow-y-auto p-4 scrollbar-hide bg-white">
                              {EMOJI_CATEGORIES.map((category, idx) => (
                                <div key={idx} className="mb-4 last:mb-0">
                                  <div className="sticky top-0 bg-white py-1.5 z-10 border-b border-gray-50 mb-2"><h5 className="text-[10px] font-bold text-chic-deep uppercase tracking-widest">{category.title}</h5><p className="text-[9px] text-gray-500 leading-tight mt-0.5">{category.desc}</p></div>
                                  <div className="grid grid-cols-6 gap-2">{category.emojis.map(e => (<button key={e} onClick={() => addEmoji(e)} className="aspect-square flex items-center justify-center text-xl hover:bg-chic-bg rounded-lg hover:scale-110 transition-transform active:scale-95 cursor-pointer border border-transparent hover:border-gray-100">{e}</button>))}</div>
                                </div>
                              ))}
                           </div>
                         </div>
                       </div>
                     )}

                     {errorMsg && <p className="text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg">{errorMsg}</p>}
                     
                     <button 
                        onClick={handleSubmit} 
                        disabled={(!inputText && !imageFile)} 
                        className="w-full py-4 bg-chic-deep text-white font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-xl shadow-lg hover:shadow-xl hover:bg-chic-deep/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                     >
                        Analizi Başlat
                     </button>
                  </div>
               </div>
               <div className="md:hidden mt-6 px-4 animate-fadeIn pb-24"><PremiumBenefits /></div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.ANALYZING && (
           <div className="min-h-[60dvh] flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
              <div className="w-32 h-32 relative mb-8">
                 <div className="absolute inset-0 rounded-full border-2 border-chic-primary/20 animate-spin-slow"></div>
                 <div className="absolute inset-0 flex items-center justify-center"><span className="text-4xl animate-pulse">🔮</span></div>
              </div>
              <h3 className="text-2xl font-serif text-chic-deep mb-3 italic">{loadingMsg}</h3>
              <p className="text-xs text-chic-deep/50 max-w-xs mx-auto">Verileriniz işleniyor, lütfen bekleyin...</p>
           </div>
        )}

        {status === AnalysisStatus.COMPLETED && result && (
           <div ref={resultRef} className="animate-fadeIn max-w-4xl mx-auto space-y-8 pb-12 pt-4 px-4 md:px-0">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center shadow-xl shadow-chic-deep/5 border border-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-floral-pattern opacity-[0.03]"></div>
                 <div className="relative z-10">
                    <h2 className="text-xl md:text-3xl font-serif text-chic-deep italic leading-relaxed mb-8">"{result.free_comment}"</h2>
                    <div className="flex justify-center mb-6"><VibrioGauge score={result.vibrio_score} /></div>
                    <button onClick={handleShare} className="text-[10px] uppercase font-bold tracking-widest text-chic-primary hover:text-chic-deep transition-colors flex items-center gap-2 mx-auto border border-chic-primary/20 px-4 py-2 rounded-full"><span>📤</span> Sonucu Paylaş</button>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-chic-primary/10 flex flex-col items-center justify-center relative min-h-[300px]">
                    <div className="absolute top-6 left-6 text-[10px] uppercase tracking-widest font-bold text-chic-primary">Enerji Dengesi</div>
                    <div className={!isUnlocked ? "filter blur-sm select-none transition-all duration-700" : ""}><RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} /></div>
                    {!isUnlocked && <div className="absolute inset-0 flex items-center justify-center z-10"><span className="text-3xl">🔒</span></div>}
                 </div>
                 <div className="space-y-4">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-chic-primary/10 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-widest text-chic-deep/40 font-bold mb-1">Bağlanma Stili</p><p className={`font-serif text-lg text-chic-deep ${!isUnlocked && 'blur-sm'}`}>{isUnlocked ? result.metrics.attachment_style : 'Güvensiz Kaçınan'}</p></div><span className="text-xl opacity-50">🌙</span></div>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-chic-primary/10 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-widest text-chic-deep/40 font-bold mb-1">Çatışma Dili</p><p className={`font-serif text-lg text-chic-deep ${!isUnlocked && 'blur-sm'}`}>{isUnlocked ? result.metrics.conflict_style : 'Pasif Agresif'}</p></div><span className="text-xl opacity-50">🌩️</span></div>
                 </div>
              </div>

              <div className="relative mt-8">
                 {!isUnlocked && <Paywall onUnlock={() => setIsUnlocked(true)} />}
                 <div className={!isUnlocked ? 'h-[500px] overflow-hidden opacity-50 blur-[2px] pointer-events-none' : ''}><PremiumReport content={result.premium_report_content} /></div>
              </div>
           </div>
        )}
      </main>

      <Footer />
      
      {socialProof && (
        <div className="fixed bottom-6 left-6 z-40 animate-slideUp hidden md:block">
           <div className="bg-white/95 backdrop-blur shadow-lg border border-chic-primary/20 rounded-xl p-3 flex items-center gap-3 pr-6">
              <span className="text-lg">🛍️</span><div><p className="text-xs text-chic-deep font-bold">{socialProof.name}, {socialProof.location}</p><p className="text-[9px] text-gray-500">Az önce Premium Raporu açtı.</p></div>
           </div>
        </div>
      )}
    </div>
  );
};
export default App;
