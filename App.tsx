
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { analyzeRelationship } from './services/geminiService';
import { AnalysisStatus, VibrioResponse } from './types';
import VibrioGauge from './components/VibrioGauge';
import PremiumReport from './components/PremiumReport';
import RadarChart from './components/RadarChart'; 
import Paywall from './components/Paywall'; 
import Logo from './components/Logo';
import Footer from './components/Footer';
import VisualProjection from './components/VisualProjection';

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
    { 
      name: "Kavuşum (0°): Ayna Etkisi", 
      desc: "Siz birbirinizin ruh ikizisiniz. Kelimelere ihtiyaç duymadan anlaşabilen ender çiftlerdensiniz. Ancak bu benzerlik, zaman zaman ego savaşlarına ve 'kendinle kavga etme' hissine dönüşebilir. Empati yeteneğiniz muazzam yüksek." 
    },
    { 
      name: "Yarı Sekstil (30°): Öğretici Farklılık", 
      desc: "Birbirinizden tamamen farklı dünyaların insanlarısınız, ancak bu bir engel değil, bir fırsat. Bu ilişki, konfor alanınızdan çıkıp büyümeniz için tasarlandı. Sabır gösterirseniz, birbirinize bilmediğiniz yönleri öğreteceksiniz." 
    },
    { 
      name: "Sekstil (60°): Suç Ortaklığı", 
      desc: "İlişkinin temeli çok sağlam bir dostluğa dayanıyor. İletişiminiz su gibi akıyor; hem sevgilisiniz hem de en iyi arkadaşsınız. Birlikteyken zamanın nasıl geçtiğini anlamazsınız, zihinsel uyumunuz mükemmel." 
    },
    { 
      name: "Kare (90°): Yüksek Voltaj", 
      desc: "Aranızdaki cinsel çekim ve tutku havai fişekler gibi; patlayıcı ve göz alıcı. Ancak bu enerji, inatlaşma ve çatışmayı da beraberinde getiriyor. Bu ilişki sizi dönüştürecek, asla sıradan ve sıkıcı olmayacak." 
    },
    { 
      name: "Üçgen (120°): İlahi Akış", 
      desc: "Kozmik bir hediye gibi, her şey kendiliğinden ve çabasız ilerliyor. Birbirinizin yaralarını sarıyor, yanında huzur buluyorsunuz. Güven sorunu yaşanması en zor açılardan biri, aidiyet hissi çok yüksek." 
    },
    { 
      name: "Karmik (150°): Kadersel Borç", 
      desc: "Mantıkla açıklanamayan, tuhaf ve manyetik bir çekim var. Sanki geçmiş hayatlardan tanışıyorsunuz ama bir türlü tam olarak 'bir' olamıyorsunuz. Bu ilişki, ruhsal bir ders almak için hayatınıza girmiş olabilir." 
    },
    { 
      name: "Zıt (180°): Mıknatıs Etkisi", 
      desc: "Zıt kutupların karşı konulmaz çekimi! O sende olmayanı tamamlıyor, sen onda eksik olanı. Dengeyi kurmak zor olabilir ama kurulduğunda, birbirinizden kopmanız imkansız hale gelir. Tutku ve gerilim iç içe." 
    }
  ];
  return aspects[diff];
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [userZodiac, setUserZodiac] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState('');
  const [relStatus, setRelStatus] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [result, setResult] = useState<VibrioResponse | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [socialProof, setSocialProof] = useState<{name: string, location: string} | null>(null);
  const [showSample, setShowSample] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null); // Ref for top of main
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
    if (imageFile) {
        const url = URL.createObjectURL(imageFile);
        setImagePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }
    setImagePreviewUrl(null);
  }, [imageFile]);

  useEffect(() => {
    const names = ["Selin", "Ayşe", "Merve", "Elif", "Deniz"];
    const locs = ["İstanbul", "İzmir", "Ankara", "Bursa"];
    const int = setInterval(() => { 
      if (Math.random() > 0.8) {
        setSocialProof({ name: names[Math.floor(Math.random()*names.length)], location: locs[Math.floor(Math.random()*locs.length)] });
        setTimeout(() => setSocialProof(null), 3000);
      }
    }, 15000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if(status === AnalysisStatus.ANALYZING) {
      const msgs = ["Bilinçaltı Kodları Taranıyor...", "Emoji ve Beden Dili Çözülüyor...", "Gottman Analizi Yapılıyor...", "Gelecek Simülasyonu Oluşturuluyor...", "Karmik Bağlar Hesaplanıyor..."];
      let i=0; setLoadingMsg(msgs[0]);
      const t = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 2500);
      return () => clearInterval(t);
    }
    if(status === AnalysisStatus.COMPLETED) {
        // Immediate scroll to top with no offset issues
        setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
  }, [status]);

  const toggleRelStatus = (id: string) => {
    setRelStatus(prev => prev === id ? '' : id);
  };

  const handleSubmit = async () => {
    if(!inputText && !imageFile) { setErrorMsg("Lütfen analiz için bir metin yazın veya fotoğraf yükleyin."); return; }
    
    setErrorMsg(null); setStatus(AnalysisStatus.ANALYZING);
    try {
      const data = await analyzeRelationship(inputText, userZodiac, partnerZodiac, relStatus, imageFile);
      setResult(data); setStatus(AnalysisStatus.COMPLETED); localStorage.setItem('vibrio_result', JSON.stringify(data));
    } catch(e: any) { setErrorMsg(e.message); setStatus(AnalysisStatus.IDLE); }
  };

  const reset = () => { localStorage.removeItem('vibrio_result'); setResult(null); setStatus(AnalysisStatus.IDLE); setInputText(''); setIsUnlocked(false); setImageFile(null); };
  const astroInsight = useMemo(() => getAstroInsight(userZodiac, partnerZodiac), [userZodiac, partnerZodiac]);
  const addEmoji = (emoji: string) => { setInputText(prev => prev + emoji); textareaRef.current?.focus(); };

  const handleShare = async () => {
     if (result) {
        const text = `Vibrio İlişki Analizi Sonucum: ${result.vibrio_score} Puan! "${result.free_comment}" Sen de dene: https://vibrio.info`;
        if (navigator.share) try { await navigator.share({ title: 'Vibrio Analizi', text, url: 'https://vibrio.info' }); } catch(e) {}
        else { navigator.clipboard.writeText(text); alert("Sonuç kopyalandı!"); }
     }
  };

  const handleShowSample = async () => {
    if (!showSample) setShowSample(true);
  };

  const sampleContent = import('./services/sampleData').then(m => m.sampleReportContent);
  const [loadedSample, setLoadedSample] = useState<string>("");
  useEffect(() => { if(showSample) sampleContent.then(setLoadedSample); }, [showSample]);


  return (
    <div className="min-h-dvh font-sans text-chic-text selection:bg-chic-primary selection:text-white pb-safe relative overflow-x-hidden">
      <nav ref={topRef} className="hidden md:flex fixed top-0 w-full z-50 bg-chic-bg/95 backdrop-blur-md border-b border-chic-primary/10 h-20 items-center transition-all shadow-sm">
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <div onClick={reset} className="cursor-pointer scale-90"><Logo /></div>
          {status === AnalysisStatus.COMPLETED && (
            <button 
              onClick={reset} 
              className="bg-chic-deep text-white hover:bg-chic-deep/80 transition-all px-8 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 border border-white/10"
            >
              + YENİ ANALİZ
            </button>
          )}
        </div>
      </nav>

      <main className="md:pt-28 w-full max-w-6xl mx-auto md:pb-12">
        {status === AnalysisStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center animate-fadeIn min-h-[75vh]">
            <div className="hidden md:flex flex-col space-y-6 pt-2 sticky top-24 self-center pl-4">
               <h1 className="text-3xl font-serif font-light text-chic-deep leading-tight tracking-wide">
                 Onun Zihnini & <br/><span className="italic text-chic-primary font-normal">Kalbini Oku.</span>
               </h1>
               <p className="text-chic-text/70 leading-relaxed font-light text-sm max-w-sm">
                 Vibrio; Jungiyen psikoloji ve astrolojinin gücüyle, ilişkinin görünmeyen yüzünü ortaya çıkaran profesyonel bir analiz aracıdır.
               </p>
               
               <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">🧠</span><span className="text-xs text-chic-deep">Bilinçaltı Okuma</span></div>
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">🚩</span><span className="text-xs text-chic-deep">Manipülasyon Taraması</span></div>
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">👶</span><span className="text-xs text-chic-deep">Gelecek Simülasyonu</span></div>
               </div>
            </div>

            <div className="w-full flex flex-col justify-center min-h-dvh md:min-h-0 md:justify-center py-4 md:py-0 px-2 md:px-0">
               <div className="md:hidden text-center mb-4 scale-90"><Logo /></div>

               <div className="bg-white/90 backdrop-blur-xl p-5 md:p-8 rounded-3xl shadow-xl border border-chic-primary/20 relative overflow-visible">
                 
                 <div className="space-y-5">
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onFocus={() => setIsTextareaFocused(true)}
                        onBlur={() => setIsTextareaFocused(false)}
                        className="w-full h-32 md:h-36 bg-transparent text-base md:text-lg text-chic-deep placeholder:text-chic-deep/30 resize-none focus:outline-none font-medium leading-relaxed pr-8"
                        placeholder="İlişkinizden bahsedin... (Örn: 'Bana karşı ilgisizleşti, mesajlarıma geç dönüyor ama buluşunca her şey harika. Burcu kova...')"
                      />
                      {inputText && (
                          <button onClick={() => setInputText('')} className="absolute top-0 right-0 text-chic-deep/30 hover:text-red-400 p-1">✕</button>
                      )}
                      
                      <div className="flex justify-between items-center mt-2 border-t border-chic-primary/10 pt-2">
                         <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 mask-linear">
                            {PROMPTS.map((p, i) => (
                              <button key={i} onClick={() => setInputText(p)} className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full bg-chic-bg border border-chic-primary/20 text-chic-deep/70 hover:bg-chic-primary hover:text-white transition-all whitespace-nowrap">{p}</button>
                            ))}
                         </div>
                         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-xl opacity-50 hover:opacity-100 transition-opacity ml-2">😊</button>
                      </div>
                      
                      {showEmojiPicker && (
                        <div className="mt-2 p-2 bg-chic-bg rounded-xl border border-chic-primary/20 animate-slideUp absolute z-50 w-full left-0 shadow-lg">
                          <button onClick={() => setShowEmojiPicker(false)} className="absolute top-2 right-2 text-xs opacity-50">✕</button>
                          {EMOJI_CATEGORIES.map((cat, i) => (
                            <div key={i} className="mb-2 last:mb-0">
                              <p className="text-[9px] uppercase tracking-widest text-chic-accent mb-1">{cat.title}</p>
                              <div className="flex flex-wrap gap-2">
                                {cat.emojis.map(emoji => (
                                  <button key={emoji} onClick={() => { addEmoji(emoji); setShowEmojiPicker(false); }} className="text-lg hover:scale-125 transition-transform">{emoji}</button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fixed Height Layout Container to prevent shifts */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Senin Burcun</label>
                            <select value={userZodiac} onChange={(e) => setUserZodiac(e.target.value)} className="w-full bg-chic-bg p-3 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer hover:bg-white transition-colors">
                            <option value="">Seçiniz</option>
                            {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Partnerin Burcu</label>
                            <select value={partnerZodiac} onChange={(e) => setPartnerZodiac(e.target.value)} className="w-full bg-chic-bg p-3 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer hover:bg-white transition-colors">
                            <option value="">Seçiniz</option>
                            {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                        </div>

                        {/* Astro Insight Overlay - Positioned BELOW selects to avoid blocking */}
                        {astroInsight && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-chic-primary/20 z-40 animate-slideUp pointer-events-none">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-chic-primary/20"></div>
                                <div className="flex gap-3 items-start">
                                    <span className="text-xl">✨</span>
                                    <div>
                                        <h4 className="font-serif font-bold text-chic-deep text-sm">{astroInsight.name}</h4>
                                        <p className="text-[11px] text-chic-deep/80 leading-relaxed mt-1">{astroInsight.desc}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1 pt-2">
                      <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">İlişki Durumu</label>
                      <div className="flex flex-wrap gap-2">
                        {RELATIONSHIP_TYPES.map(type => (
                          <button 
                            key={type.id} 
                            onClick={() => toggleRelStatus(type.id)} 
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${relStatus === type.id ? 'bg-chic-deep text-white border-chic-deep' : 'bg-transparent text-chic-deep/60 border-chic-primary/20 hover:border-chic-primary'}`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                        className="hidden" 
                        accept="image/*"
                      />
                      <div className="flex gap-3 h-12">
                         <button 
                           onClick={() => fileInputRef.current?.click()} 
                           className={`w-1/3 rounded-xl border border-dashed flex items-center justify-center gap-2 transition-colors relative overflow-hidden ${imageFile ? 'border-chic-success text-chic-success bg-chic-success/5' : 'border-chic-primary/40 text-chic-deep/50 hover:bg-chic-bg'}`}
                         >
                            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                           <span className="relative z-10 text-xl">{imageFile ? '📸' : '📷'}</span>
                         </button>
                         <button 
                           onClick={handleSubmit} 
                           disabled={(!inputText && !imageFile)}
                           className="w-2/3 bg-chic-deep text-white font-serif italic text-lg rounded-xl shadow-lg hover:bg-chic-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                         >
                           <span>Analiz Et</span>
                           <span className="text-xs no-italic font-sans opacity-70 group-hover:translate-x-1 transition-transform">→</span>
                         </button>
                      </div>
                      {errorMsg && <div className="bg-red-50 p-3 mt-4 rounded-lg border border-red-100 text-center"><p className="text-red-500 text-xs font-bold">{errorMsg}</p></div>}
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.ANALYZING && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-chic-secondary/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-chic-primary/40 rounded-full animate-spin-slow border-t-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">🔮</div>
            </div>
            <h2 className="text-2xl font-serif text-chic-deep mb-2">{loadingMsg}</h2>
            <p className="text-xs text-chic-accent uppercase tracking-[0.2em] animate-pulse">Yapay Zeka & Astroloji Motoru Çalışıyor</p>
          </div>
        )}

        {status === AnalysisStatus.COMPLETED && result && (
          <div className="animate-slideUp pt-2 px-4 md:px-0">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                
                {/* Sol Panel: Metrikler (Ücretsiz Kısım) */}
                <div className="md:col-span-4 space-y-4">
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-chic-primary/10 flex flex-col items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-floral-pattern opacity-[0.03]"></div>
                      
                      <div className="relative z-10 w-full mb-6 text-center">
                        <span className="text-4xl text-chic-primary/20 absolute -top-4 left-0">"</span>
                        <p className="text-2xl md:text-3xl font-hand text-chic-deep leading-snug rotate-[-1deg] mx-4">
                           {result.free_comment}
                        </p>
                        <span className="text-4xl text-chic-primary/20 absolute -bottom-8 right-0 rotate-180">"</span>
                      </div>

                      <div className="mt-4 flex flex-col items-center opacity-80 scale-90">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-chic-accent mb-2">Genel Uyum Skoru</h3>
                        <VibrioGauge score={result.vibrio_score} />
                      </div>
                   </div>
                   
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-chic-primary/10">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-chic-accent mb-4 text-center">İlişki Dengesi</h3>
                      <div className="h-48 w-full">
                         <RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                         <div className="p-3 bg-chic-bg rounded-xl border border-chic-primary/10">
                            <span className="block text-[9px] uppercase tracking-widest text-chic-accent mb-1">Bağlanma</span>
                            <span className="text-chic-deep font-serif font-bold text-sm">{result.metrics.attachment_style}</span>
                         </div>
                         <div className="p-3 bg-chic-bg rounded-xl border border-chic-primary/10">
                            <span className="block text-[9px] uppercase tracking-widest text-chic-accent mb-1">Çatışma</span>
                            <span className="text-chic-deep font-serif font-bold text-sm">{result.metrics.conflict_style}</span>
                         </div>
                      </div>
                   </div>

                   {/* Görsel Projeksiyon (Sneak Peek) */}
                   <VisualProjection description={result.future_visual_description} isUnlocked={isUnlocked} userImage={imagePreviewUrl} />

                   {isUnlocked && (
                     <button onClick={handleShare} className="w-full py-3 border border-chic-primary/30 rounded-xl text-chic-deep uppercase text-[10px] tracking-[0.2em] hover:bg-chic-primary hover:text-white transition-all">
                        Sonucu Paylaş
                     </button>
                   )}
                   
                   <button 
                      onClick={reset}
                      className="md:hidden w-full py-4 bg-chic-deep text-white font-bold rounded-2xl uppercase text-sm tracking-widest hover:bg-chic-deep/90 shadow-xl mt-4 border border-white/10"
                    >
                      + YENİ ANALİZ
                    </button>
                </div>

                {/* Sağ Panel: Premium Rapor & Paywall */}
                <div className="md:col-span-8 relative min-h-[600px] flex flex-col">
                   
                   {/* PAYWALL - REFINED */}
                   {!isUnlocked && (
                     <div className="z-30 mb-8 w-full">
                       <Paywall onUnlock={() => setIsUnlocked(true)} />
                       
                       {/* Sample Report Trigger Button */}
                       <div className="text-center mt-3">
                          <button 
                             onClick={() => { handleShowSample(); setShowSample(true); }}
                             className="text-[10px] text-chic-accent/70 hover:text-chic-primary underline underline-offset-2 transition-colors uppercase tracking-widest"
                          >
                             📄 Örnek Raporu İncele
                          </button>
                       </div>
                     </div>
                   )}
                   
                   {/* Rapor İçeriği */}
                   <div className={`relative transition-all duration-700 bg-white p-8 rounded-3xl border border-chic-primary/10 ${!isUnlocked ? 'h-[300px] overflow-hidden blur-md opacity-60 select-none pointer-events-none mt-4' : 'opacity-100'}`}>
                      <PremiumReport content={result.premium_report_content} />
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
      <Footer />
      {socialProof && (
        <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur border border-chic-primary/20 p-3 rounded-lg shadow-lg z-50 animate-slideUp flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Az Önce Analiz Yaptı</p>
            <p className="text-xs text-chic-deep font-bold">{socialProof.name} <span className="font-normal opacity-60">({socialProof.location})</span></p>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showSample && loadedSample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-chic-deep/30 backdrop-blur-sm" onClick={() => setShowSample(false)}>
           <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl" onClick={e => e.stopPropagation()}>
               <button onClick={() => setShowSample(false)} className="absolute top-4 right-4 z-50 w-8 h-8 bg-chic-bg rounded-full flex items-center justify-center text-chic-deep font-bold hover:bg-chic-primary hover:text-white transition-colors">×</button>
               <div className="p-2">
                 <PremiumReport content={loadedSample} />
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
