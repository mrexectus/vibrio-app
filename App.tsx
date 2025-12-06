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
      desc: "Adeta ruhsal bir ayna. Birbirinizi kelimelere ihtiyaç duymadan anlıyorsunuz ancak bu benzerlik, inatlaşma ve ego savaşlarını körükleyebilir. Yoğun bir empati ve telepatik bağ var." 
    },
    { 
      name: "Yarı Sekstil (30°): Öğretici Farklılık", 
      desc: "Farklı duygusal dilleri konuşuyorsunuz. Bu ilişki bir konfor alanı değil, bir büyüme yolculuğu. Birbirinizden öğrenecek çok şeyiniz var, ancak sabır anahtar kelime." 
    },
    { 
      name: "Sekstil (60°): Suç Ortaklığı", 
      desc: "İletişim su gibi akıyor. Sadece sevgili değil, aynı zamanda birbirinizin en iyi arkadaşısınız. Destekleyici, eğlenceli ve zihinsel olarak besleyici bir bağ." 
    },
    { 
      name: "Kare (90°): Yüksek Voltaj", 
      desc: "Muazzam bir cinsel çekim ve tutku, ancak aynı oranda çatışma riski. Bu ilişki sizi ya dönüştürür ya da yorar. Aradaki elektrik asla bitmez, durağanlık yok." 
    },
    { 
      name: "Üçgen (120°): İlahi Akış", 
      desc: "Kozmik bir hediye gibi. Birbirinizin yaralarını sarıyor, yanında huzur buluyorsunuz. İlişki kendiliğinden, çabasız ve doğal bir şekilde ilerliyor. Güven tam." 
    },
    { 
      name: "Karmik (150°): Kadersel Borç", 
      desc: "Mantıkla açıklanamayan, tuhaf ve derin bir çekim. Sanki geçmiş hayatlardan gelen bir tanışıklık var. Birbirinizi hem çok merak ediyor hem de bazen yabancı hissediyorsunuz." 
    },
    { 
      name: "Zıt (180°): Mıknatıs Etkisi", 
      desc: "Zıt kutupların karşı konulmaz çekimi. O sende olmayanı tamamlıyor, sen onda eksik olanı. Tutkulu, yoğun ama denge kurması ustalık gerektiren güçlü bir bağ." 
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
      const msgs = ["Bilinçaltı Kodları Taranıyor...", "Emoji ve Beden Dili Çözülüyor...", "Gottman Analizi Yapılıyor...", "Gelecek Simülasyonu Oluşturuluyor...", "Karmik Bağlar Hesaplanıyor..."];
      let i=0; setLoadingMsg(msgs[0]);
      const t = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 2500);
      return () => clearInterval(t);
    }
    if(status === AnalysisStatus.COMPLETED) setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
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
        { icon: "👶", title: "Gelecek Simülasyonu", desc: "20 yıl sonraki haliniz veya çocuğunuz." },
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
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-chic-bg/95 backdrop-blur-md border-b border-chic-primary/10 h-20 items-center transition-all">
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <div onClick={reset} className="cursor-pointer scale-90"><Logo /></div>
          {status === AnalysisStatus.COMPLETED && (
            <button 
              onClick={reset} 
              className="bg-chic-deep text-white hover:bg-chic-primary transition-all px-6 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 border-2 border-white/20"
            >
              <span className="text-xl leading-none">+</span> YENİ ANALİZ
            </button>
          )}
        </div>
      </nav>

      <main className="md:pt-28 w-full max-w-6xl mx-auto md:pb-12">
        {status === AnalysisStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center animate-fadeIn min-h-[75vh]">
            <div className="hidden md:flex flex-col space-y-6 pt-2 sticky top-24 self-center">
               <h1 className="text-6xl font-serif font-medium text-chic-deep leading-tight">Onun Zihnini & <br/><span className="italic text-chic-primary">Kalbini Oku.</span></h1>
               <p className="text-chic-text/80 leading-relaxed font-light text-lg">Vibrio; Jungiyen psikoloji ve astrolojinin gücüyle, ilişkinin görünmeyen yüzünü ortaya çıkaran profesyonel bir analiz aracıdır.</p>
               <PremiumBenefits />
            </div>

            <div className="w-full flex flex-col justify-center min-h-dvh md:min-h-0 md:justify-center py-4 md:py-0">
               <div className="md:hidden text-center mb-4 scale-90"><Logo /><p className="text-[10px] text-chic-text/60 mt-1 uppercase tracking-widest">Yapay Zeka Destekli İlişki Analizi</p></div>

               <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-chic-primary/20 relative overflow-hidden">
                 {/* Decorative background */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-chic-secondary/20 rounded-full blur-3xl -z-10"></div>
                 
                 <div className="space-y-6">
                    <div>
                      <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onFocus={() => setIsTextareaFocused(true)}
                        onBlur={() => setIsTextareaFocused(false)}
                        className="w-full h-32 md:h-40 bg-transparent text-lg text-chic-deep placeholder:text-chic-deep/30 resize-none focus:outline-none font-medium leading-relaxed"
                        placeholder="İlişkinizden bahsedin... (Örn: 'Bana karşı ilgisizleşti, mesajlarıma geç dönüyor ama buluşunca her şey harika. Burcu kova...')"
                      />
                      <div className="flex justify-between items-center mt-2">
                         <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                            {PROMPTS.map((p, i) => (
                              <button key={i} onClick={() => setInputText(p)} className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full bg-chic-bg border border-chic-primary/20 text-chic-deep/70 hover:bg-chic-primary hover:text-white transition-all whitespace-nowrap">{p}</button>
                            ))}
                         </div>
                         <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-xl opacity-50 hover:opacity-100 transition-opacity">😊</button>
                      </div>
                      
                      {showEmojiPicker && (
                        <div className="mt-3 p-3 bg-chic-bg rounded-xl border border-chic-primary/20 animate-slideUp">
                          {EMOJI_CATEGORIES.map((cat, i) => (
                            <div key={i} className="mb-2 last:mb-0">
                              <p className="text-[9px] uppercase tracking-widest text-chic-accent mb-1">{cat.title}</p>
                              <div className="flex flex-wrap gap-2">
                                {cat.emojis.map(emoji => (
                                  <button key={emoji} onClick={() => addEmoji(emoji)} className="text-lg hover:scale-125 transition-transform">{emoji}</button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Senin Burcun</label>
                        <select value={userZodiac} onChange={(e) => setUserZodiac(e.target.value)} className="w-full bg-chic-bg p-3 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer">
                          <option value="">Seçiniz</option>
                          {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Partnerin Burcu</label>
                        <select value={partnerZodiac} onChange={(e) => setPartnerZodiac(e.target.value)} className="w-full bg-chic-bg p-3 rounded-lg border border-chic-primary/20 text-chic-deep text-sm focus:border-chic-primary outline-none appearance-none cursor-pointer">
                          <option value="">Seçiniz</option>
                          {ZODIACS.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                      </div>
                    </div>

                    {astroInsight && (
                       <div className="p-3 bg-chic-primary/5 rounded-lg border border-chic-primary/20 flex gap-3 items-start animate-fadeIn">
                          <span className="text-xl pt-0.5">✨</span>
                          <div>
                            <h4 className="font-serif font-bold text-chic-deep text-sm">{astroInsight.name}</h4>
                            <p className="text-[10px] text-chic-deep/70 leading-relaxed mt-0.5">{astroInsight.desc}</p>
                          </div>
                       </div>
                    )}

                    <div className="space-y-1">
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
                      <div className="flex gap-3">
                         <button 
                           onClick={() => fileInputRef.current?.click()} 
                           className={`flex-1 py-3 rounded-xl border border-dashed flex items-center justify-center gap-2 transition-colors ${imageFile ? 'border-chic-success text-chic-success bg-chic-success/5' : 'border-chic-primary/40 text-chic-deep/50 hover:bg-chic-bg'}`}
                         >
                           <span>{imageFile ? '📷 Fotoğraf Eklendi' : '📷 Ekran Görüntüsü / Fotoğraf Ekle'}</span>
                         </button>
                         <button 
                           onClick={handleSubmit} 
                           disabled={(!inputText && !imageFile)}
                           className="flex-[2] bg-chic-deep text-white font-serif italic text-lg rounded-xl shadow-lg hover:bg-chic-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                         >
                           <span>Analiz Et</span>
                           <span className="text-xs no-italic font-sans opacity-70">→</span>
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
          <div ref={resultRef} className="animate-slideUp pt-6 px-4 md:px-0">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                
                {/* Sol Panel: Metrikler (Ücretsiz Kısım) */}
                <div className="md:col-span-4 space-y-6">
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-chic-primary/10 flex flex-col items-center">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-chic-accent mb-6">Uyum Skoru</h3>
                      <VibrioGauge score={result.vibrio_score} />
                      <p className="text-center text-xs text-chic-deep/60 mt-4 px-4 leading-relaxed">"{result.free_comment}"</p>
                   </div>
                   
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-chic-primary/10">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-chic-accent mb-4 text-center">İlişki Dengesi</h3>
                      <div className="h-48 w-full">
                         <RadarChart trust={result.metrics.trust} passion={result.metrics.passion} communication={result.metrics.communication} />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                         <div className="p-3 bg-chic-bg rounded-xl">
                            <span className="block text-[9px] uppercase tracking-widest text-chic-accent mb-1">Bağlanma</span>
                            <span className="text-chic-deep font-serif font-bold">{result.metrics.attachment_style}</span>
                         </div>
                         <div className="p-3 bg-chic-bg rounded-xl">
                            <span className="block text-[9px] uppercase tracking-widest text-chic-accent mb-1">Çatışma</span>
                            <span className="text-chic-deep font-serif font-bold">{result.metrics.conflict_style}</span>
                         </div>
                      </div>
                   </div>

                   {/* Görsel Projeksiyon (Sneak Peek) */}
                   <VisualProjection description={result.future_visual_description} isUnlocked={isUnlocked} />

                   {/* Mobilde burada görünsün, kilidi açınca kaybolur */}
                   {isUnlocked && (
                     <button onClick={handleShare} className="w-full py-3 border border-chic-primary/30 rounded-xl text-chic-deep uppercase text-[10px] tracking-[0.2em] hover:bg-chic-primary hover:text-white transition-all">
                        Sonucu Paylaş
                     </button>
                   )}
                   
                   {/* Mobile New Analysis Button */}
                   <button 
                      onClick={reset}
                      className="md:hidden w-full py-4 bg-chic-deep text-white font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-chic-deep/90 shadow-lg mt-4"
                    >
                      + Yeni Analiz
                    </button>
                </div>

                {/* Sağ Panel: Premium Rapor & Paywall */}
                <div className="md:col-span-8 relative min-h-[600px] flex flex-col">
                   
                   {/* Paywall Container - MOVED UP TO BE THE FIRST THING */}
                   {!isUnlocked && (
                     <div className="z-20 mb-8 w-full">
                       <Paywall onUnlock={() => setIsUnlocked(true)} />
                     </div>
                   )}
                   
                   {/* Rapor İçeriği - Kilitliyse blur var, kilit açılınca netleşiyor */}
                   <div className={`${!isUnlocked ? 'h-[150px] overflow-hidden blur-md opacity-40 select-none pointer-events-none' : 'opacity-100 transition-opacity duration-700'}`}>
                      <PremiumReport content={result.premium_report_content} />
                   </div>
                   
                   {/* Fake Content for Locked State to show text flow underneath */}
                   {!isUnlocked && (
                      <div className="h-[400px] w-full bg-gradient-to-b from-transparent to-chic-bg absolute top-[400px] pointer-events-none"></div>
                   )}
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
    </div>
  );
};

export default App;