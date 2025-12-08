
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { analyzeRelationship, generateImageProjection } from './services/geminiService';
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
      desc: "Siz birbirinizin ruh ikizisiniz. Kelimelere ihtiyaç duymadan anlaşabilen ender çiftlerdensiniz. Ancak bu benzerlik, ego savaşlarına dönüşebilir." 
    },
    { 
      name: "Yarı Sekstil (30°): Öğretici Farklılık", 
      desc: "Farklı dünyaların insanlarısınız. Bu ilişki, konfor alanınızdan çıkıp büyümeniz için tasarlandı. Sabır gösterirseniz birbirinize çok şey katarsınız." 
    },
    { 
      name: "Sekstil (60°): Suç Ortaklığı", 
      desc: "İlişkinin temeli sağlam bir dostluğa dayanıyor. İletişiminiz su gibi akıyor; hem sevgilisiniz hem de en iyi arkadaşsınız." 
    },
    { 
      name: "Kare (90°): Yüksek Voltaj", 
      desc: "Cinsel çekim ve tutku havai fişekler gibi; patlayıcı. Ancak bu enerji, inatlaşma ve çatışmayı da beraberinde getiriyor. Asla sıkıcı olmaz." 
    },
    { 
      name: "Üçgen (120°): İlahi Akış", 
      desc: "Kozmik bir hediye gibi, her şey kendiliğinden ilerliyor. Birbirinizin yaralarını sarıyor, yanında huzur buluyorsunuz. Güven tam." 
    },
    { 
      name: "Karmik (150°): Kadersel Borç", 
      desc: "Mantıkla açıklanamayan, manyetik bir çekim var. Sanki geçmiş hayatlardan tanışıyorsunuz. Ruhsal bir ders almak için bir aradasınız." 
    },
    { 
      name: "Zıt (180°): Mıknatıs Etkisi", 
      desc: "Zıt kutupların karşı konulmaz çekimi! O sende olmayanı tamamlıyor. Denge kurulduğunda kopmanız imkansız hale gelir." 
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
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  
  const [showAstroTooltip, setShowAstroTooltip] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null); 
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
      const msgs = ["Bilinçaltı Kodları Taranıyor...", "Emoji ve Beden Dili Çözülüyor...", "Gottman Analizi Yapılıyor...", "Gelecek Simülasyonu Hesaplanıyor...", "Karmik Bağlar Hesaplanıyor..."];
      let i=0; setLoadingMsg(msgs[0]);
      const t = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 2500);
      return () => clearInterval(t);
    }
    if(status === AnalysisStatus.COMPLETED) {
        setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
  }, [status]);

  const astroInsight = useMemo(() => getAstroInsight(userZodiac, partnerZodiac), [userZodiac, partnerZodiac]);

  useEffect(() => {
    if (astroInsight) {
        setShowAstroTooltip(true);
        const timer = setTimeout(() => setShowAstroTooltip(false), 8000);
        return () => clearTimeout(timer);
    }
  }, [astroInsight]);

  const toggleRelStatus = (id: string) => {
    setRelStatus(prev => prev === id ? '' : id);
  };

  const handleSubmit = async () => {
    if(!inputText && !imageFile) { setErrorMsg("Lütfen analiz için bir metin yazın veya fotoğraf yükleyin."); return; }
    
    setErrorMsg(null); setStatus(AnalysisStatus.ANALYZING);
    try {
      // 1. Metin Analizi Başlat
      const data = await analyzeRelationship(inputText, userZodiac, partnerZodiac, relStatus, imageFile);
      setResult(data); 
      setStatus(AnalysisStatus.COMPLETED); 
      localStorage.setItem('vibrio_result', JSON.stringify(data));

      // 2. Arka Planda Görsel Üretimi (Eğer betimleme varsa)
      if (data.future_visual_description) {
         setIsImageGenerating(true);
         // UI'ın metni render etmesi için kısa bir gecikme
         setTimeout(async () => {
            try {
                // Burada Image Gen çağrısı yapıyoruz
                const generatedImg = await generateImageProjection(data.future_visual_description!, imageFile);
                if (generatedImg) {
                    const updatedData = { ...data, generated_image_base64: generatedImg };
                    setResult(updatedData);
                    localStorage.setItem('vibrio_result', JSON.stringify(updatedData));
                }
            } catch (err) {
                console.error("BG Image gen error", err);
            } finally {
                setIsImageGenerating(false);
            }
         }, 500);
      }

    } catch(e: any) { setErrorMsg(e.message); setStatus(AnalysisStatus.IDLE); }
  };

  const reset = () => { localStorage.removeItem('vibrio_result'); setResult(null); setStatus(AnalysisStatus.IDLE); setInputText(''); setIsUnlocked(false); setImageFile(null); };
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

  return (
    <div className="min-h-dvh font-sans text-chic-text selection:bg-chic-primary selection:text-white pb-safe relative overflow-x-hidden">
      <nav ref={topRef} className="hidden md:flex fixed top-0 w-full z-50 bg-chic-bg/95 backdrop-blur-md border-b border-chic-primary/10 h-16 items-center transition-all shadow-sm">
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <div onClick={reset} className="cursor-pointer scale-75 origin-left"><Logo /></div>
          {status === AnalysisStatus.COMPLETED && (
            <button 
              onClick={reset} 
              className="bg-chic-deep text-white hover:bg-chic-deep/80 transition-all px-6 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 border border-white/10"
            >
              + YENİ ANALİZ
            </button>
          )}
        </div>
      </nav>

      <main className="md:pt-20 w-full max-w-6xl mx-auto md:pb-8">
        {status === AnalysisStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center animate-fadeIn min-h-[85vh]">
            <div className="hidden md:flex flex-col space-y-4 pt-2 sticky top-24 self-center pl-4">
               <h1 className="text-3xl font-serif font-light text-chic-deep leading-tight tracking-wide">
                 Onun Zihnini & <br/><span className="italic text-chic-primary font-normal">Kalbini Oku.</span>
               </h1>
               <p className="text-chic-text/70 leading-relaxed font-light text-sm max-w-sm">
                 Vibrio; Jungiyen psikoloji ve astrolojinin gücüyle, ilişkinin görünmeyen yüzünü ortaya çıkaran profesyonel bir analiz aracıdır.
               </p>
               
               <div className="grid grid-cols-1 gap-2 mt-4">
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">🧠</span><span className="text-xs text-chic-deep">Bilinçaltı Okuma</span></div>
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">🚩</span><span className="text-xs text-chic-deep">Manipülasyon Taraması</span></div>
                  <div className="flex items-center gap-3 opacity-80"><span className="text-lg">🎨</span><span className="text-xs text-chic-deep">Gerçek AI Görsel Üretimi (2045)</span></div>
               </div>
            </div>

            <div className="w-full flex flex-col justify-center min-h-dvh md:min-h-0 md:justify-center py-4 md:py-0 px-2 md:px-0">
               <div className="md:hidden text-center mb-4 scale-90"><Logo /></div>

               <div className="bg-white/90 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-xl border border-chic-primary/20 relative overflow-visible">
                 
                 <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onFocus={() => setIsTextareaFocused(true)}
                        onBlur={() => setIsTextareaFocused(false)}
                        className="w-full h-28 md:h-32 bg-transparent text-base text-chic-deep placeholder:text-chic-deep/30 resize-none focus:outline-none font-medium leading-relaxed pr-8"
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

                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Senin Burcun</label>
                            <select value={userZodiac} onChange={(e) => setUserZodiac(e.target.value)} className="w-full bg-chic-bg p-2.5 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer hover:bg-white transition-colors">
                            <option value="">Seçiniz</option>
                            {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Partnerin Burcu</label>
                            <select value={partnerZodiac} onChange={(e) => setPartnerZodiac(e.target.value)} className="w-full bg-chic-bg p-2.5 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer hover:bg-white transition-colors">
                            <option value="">Seçiniz</option>
                            {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                        </div>

                        {showAstroTooltip && astroInsight && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-chic-primary/20 z-50 animate-slideUp">
                                <button onClick={() => setShowAstroTooltip(false)} className="absolute top-1 right-2 text-chic-deep/50 hover:text-chic-deep text-lg font-bold">&times;</button>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-chic-primary/20"></div>
                                <div className="flex gap-3 items-start pr-4">
                                    <span className="text-xl">✨</span>
                                    <div>
                                        <h4 className="font-serif font-bold text-chic-deep text-sm">{astroInsight.name}</h4>
                                        <p className="text-[11px] text-chic-deep/80 leading-relaxed mt-1">{astroInsight.desc}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1 pt-1">
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
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
                
                <div className="md:col-span-4 space-y-4">
                   <div className="bg-white p-5 rounded-3xl shadow-sm border border-chic-primary/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-floral-pattern opacity-[0.03]"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                         <div className="text-center mb-4 px-2">
                             <p className="text-xl md:text-2xl font-hand text-chic-deep leading-snug">
                                {result.free_comment}
                             </p>
                         </div>
                         <div className="w-full h-[1px] bg-chic-primary/10 mb-4"></div>
                         
                         <div className="flex justify-around w-full items-center">
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] uppercase tracking-widest text-chic-accent mb-1">Skor</span>
                                <VibrioGauge score={result.vibrio_score} />
                            </div>
                            <div className="h-10 w-[1px] bg-chic-primary/10"></div>
                            <div className="flex flex-col gap-2">
                                <div className="text-center">
                                    <span className="block text-[8px] uppercase tracking-widest text-chic-accent">Bağlanma</span>
                                    <span className="text-chic-deep font-serif font-bold text-xs">{result.metrics.attachment_style}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[8px] uppercase tracking-widest text-chic-accent">Çatışma</span>
                                    <span className="text-chic-deep font-serif font-bold text-xs">{result.metrics.conflict_style}</span>
                                </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white p-4 rounded-3xl shadow-sm border border-chic-primary/10">
                      <div className="h-32 w-full">
                         <RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} />
                      </div>
                   </div>

                   <VisualProjection 
                      description={result.future_visual_description} 
                      isUnlocked={isUnlocked} 
                      userImage={imagePreviewUrl} 
                      generatedImage={result.generated_image_base64}
                      isGenerating={isImageGenerating}
                   />

                   {isUnlocked && (
                     <button onClick={handleShare} className="w-full py-3 border border-chic-primary/30 rounded-xl text-chic-deep uppercase text-[10px] tracking-[0.2em] hover:bg-chic-primary hover:text-white transition-all">
                        Sonucu Paylaş
                     </button>
                   )}
                   
                   <button 
                      onClick={reset}
                      className="md:hidden w-full py-4 bg-chic-deep text-white font-bold rounded-2xl uppercase text-sm tracking-widest hover:bg-chic-deep/90 shadow-xl mt-2 border border-white/10"
                    >
                      + YENİ ANALİZ
                    </button>
                </div>

                <div className="md:col-span-8 relative flex flex-col">
                   
                   {!isUnlocked && (
                     <div className="z-30 w-full mb-4">
                       <Paywall onUnlock={() => setIsUnlocked(true)} />
                       
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
                   
                   <div className={`relative transition-all duration-700 bg-white p-6 md:p-8 rounded-3xl border border-chic-primary/10 ${!isUnlocked ? 'h-[250px] overflow-hidden blur-sm opacity-60 select-none pointer-events-none' : 'opacity-100 min-h-[500px]'}`}>
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

      {showSample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-chic-deep/30 backdrop-blur-sm" onClick={() => setShowSample(false)}>
           <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl" onClick={e => e.stopPropagation()}>
               <button onClick={() => setShowSample(false)} className="absolute top-4 right-4 z-50 w-8 h-8 bg-chic-bg rounded-full flex items-center justify-center text-chic-deep font-bold hover:bg-chic-primary hover:text-white transition-colors">×</button>
               <div className="p-4 md:p-8">
                 {/* HARDCODED SAMPLE CONTENT INLINE - V10.0 MANUAL FIX */}
                 <div className="space-y-8 font-sans text-chic-deep">
                    
                    <div className="flex flex-col md:flex-row gap-4 mb-6 border-b border-chic-primary/20 pb-6">
                        <div className="flex-1">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-chic-accent font-bold mb-1">Analiz Dosyası</div>
                            <div className="text-2xl font-serif text-chic-deep">#VIB-2025-X92 <span className="text-xs opacity-50 text-red-500 font-bold">(v10.0 MANUAL FIX)</span></div>
                            <div className="text-xs text-chic-text mt-1 font-medium">Selin (Yengeç) & Mert (Oğlak)</div>
                        </div>
                        <div className="flex-1 flex flex-col items-end justify-center">
                            <div className="bg-chic-deep text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1 shadow-md">
                              Ruh Eşi Uyumu (%98)
                            </div>
                            <div className="text-[9px] text-gray-400">Rapor Tarihi: 08.12.2025</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-chic-primary/20 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
                       
                       <h3 className="font-serif text-xl text-chic-deep mb-6 flex items-center gap-2">
                          <span className="text-2xl">⏳</span> 
                          <span className="italic">Vibrio Vision: Bağlılık Testi</span>
                       </h3>
                       
                       <div className="grid grid-cols-2 gap-6">
                          
                          {/* 1. GÜNCEL HAL (Young Hands BW) */}
                          <div className="space-y-3">
                              <div className="aspect-square rounded-full overflow-hidden relative shadow-xl border-4 border-white ring-1 ring-gray-100 group mx-auto w-3/4">
                                  <img src="https://images.unsplash.com/photo-1621789098261-232619c72747?q=80&w=600&auto=format&fit=crop&sat=-100" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Genç Eller" />
                              </div>
                              <div className="text-center">
                                  <div className="text-xs font-serif font-bold text-chic-deep">2025 (Bugün)</div>
                                  <div className="text-[9px] text-gray-400 uppercase tracking-widest">Gençlik Enerjisi</div>
                              </div>
                          </div>

                          {/* 2. YAŞLANDIRILMIŞ HAL (Old Hands BW) */}
                          <div className="space-y-3">
                              <div className="aspect-square rounded-full overflow-hidden relative shadow-xl border-4 border-chic-primary/30 ring-1 ring-chic-primary/20 group mx-auto w-3/4 grayscale">
                                  <div className="absolute top-0 right-0 bg-chic-deep text-white text-[8px] px-2 py-1 rounded-bl-xl z-10 font-bold tracking-widest">SİMÜLASYON</div>
                                  <img src="https://images.unsplash.com/photo-1529123202150-13f5b5c907d8?q=80&w=600&auto=format&fit=crop&sat=-100" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Yaşlı Eller" />
                              </div>
                               <div className="text-center">
                                  <div className="text-xs font-serif font-bold text-chic-deep">2065 (Gelecek)</div>
                                  <div className="text-[9px] text-gray-400 uppercase tracking-widest">Sarsılmaz Bağ</div>
                              </div>
                          </div>

                       </div>
                       
                       <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                          <p className="font-serif italic text-sm text-gray-600">"Tenler değişir, yüzler yaşlanır ama ellerin birbirini tutuş biçimi asla yalan söylemez. Vibrio, bu çiftin yaşlılıkta bile ellerini bırakmayacağını öngörüyor."</p>
                       </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-chic-text text-justify leading-relaxed mt-8">
                       <h4 className="font-serif text-lg text-chic-deep italic border-b border-chic-primary/20 pb-2 mb-3">Gelecek Projeksiyonu</h4>
                       <p>
                         Vibrio algoritmaları, 20 yıl sonrasında sizi sessizce anlaşan, birbirinin cümlelerini tamamlayan ve kalabalık ortamlarda bile sadece göz temasıyla iletişim kurabilen bir çift olarak modelliyor. 
                       </p>
                       <p>
                         <strong>Kritik Uyarı:</strong> Mert'in (Oğlak) işkolik yapısı, 40'lı yaşlarda bir krize yol açabilir. Ancak Selin'in (Yengeç) kapsayıcı şefkati bu fırtınayı dindirecek tek liman olacak.
                       </p>
                    </div>
                 </div>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;

