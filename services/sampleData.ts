
export const sampleReportContent = `
<div class="space-y-8 font-sans text-chic-deep">
  
  <!-- HEADER -->
  <div class="flex flex-col md:flex-row gap-4 mb-6 border-b border-chic-primary/20 pb-6">
      <div class="flex-1">
          <div class="text-[10px] uppercase tracking-[0.2em] text-chic-accent font-bold mb-1">Analiz Dosyası</div>
          <div class="text-2xl font-serif text-chic-deep">#VIB-2025-X92</div>
          <div class="text-xs text-chic-text mt-1 font-medium">Selin (Yengeç) & Mert (Oğlak)</div>
      </div>
      <div class="flex-1 flex flex-col items-end justify-center">
          <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1">
            Yüksek Uyum (%82)
          </div>
          <div class="text-[9px] text-gray-400">Rapor Tarihi: 06.12.2025</div>
      </div>
  </div>

  <!-- VISUAL SIMULATION SECTION (The Hook) -->
  <div class="bg-white p-6 rounded-2xl border border-chic-primary/20 shadow-sm relative overflow-hidden">
     <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chic-primary via-chic-secondary to-chic-primary"></div>
     
     <h3 class="font-serif text-xl text-chic-deep mb-6 flex items-center gap-2">
        <span class="text-2xl">🧬</span> 
        <span class="italic">Vibrio AI Vision: Zaman Yolculuğu</span>
     </h3>
     
     <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        
        <!-- 1. GÜNCEL HAL -->
        <div class="space-y-2">
            <div class="aspect-[3/4] rounded-xl overflow-hidden relative shadow-inner border border-gray-100">
                <img src="https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" alt="Genç Çift">
                <div class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[8px] font-bold tracking-widest uppercase">
                    2025 (Bugün)
                </div>
            </div>
        </div>

        <!-- 2. YAŞLANDIRILMIŞ HAL (AI Simulation) -->
        <div class="space-y-2">
            <div class="aspect-[3/4] rounded-xl overflow-hidden relative shadow-md border-2 border-chic-primary/30">
                <div class="absolute top-2 right-2 bg-chic-primary text-white text-[8px] px-2 py-0.5 rounded-full z-10 font-bold tracking-widest shadow-sm">AI SİMÜLASYON</div>
                <!-- VERIFIED ELDERLY COUPLE IMAGE - NO CATS -->
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover sepia-[0.15] contrast-110" alt="Yaşlı Çift">
                <div class="absolute bottom-2 left-2 bg-chic-deep/90 backdrop-blur-md px-2 py-1 rounded text-white text-[8px] font-bold tracking-widest uppercase">
                    2045 (Gelecek)
                </div>
            </div>
        </div>

        <!-- 3. BEBEK TAHMİNİ (Genetic) -->
        <div class="col-span-2 md:col-span-1 space-y-2">
            <div class="aspect-[3/4] md:aspect-[3/4] h-full rounded-xl overflow-hidden relative shadow-inner border border-blue-100 bg-blue-50/50">
                <div class="absolute top-2 right-2 bg-blue-400 text-white text-[8px] px-2 py-0.5 rounded-full z-10 font-bold tracking-widest shadow-sm">GENETİK TAHMİN</div>
                <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" alt="Bebek">
                <div class="absolute bottom-2 left-2 bg-blue-900/80 backdrop-blur-md px-2 py-1 rounded text-white text-[8px] font-bold tracking-widest uppercase">
                    Muhtemel Çocuk
                </div>
            </div>
        </div>

     </div>
     <p class="text-[9px] text-gray-400 mt-3 text-center italic">*Bu görseller yapay zeka tarafından biyometrik veri analizi ile oluşturulmuştur.</p>
  </div>

  <!-- CLINICAL METRICS GRID -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- KUTU 1: İLİŞKİ DİNAMİĞİ -->
      <div class="bg-chic-bg p-5 rounded-xl border border-chic-primary/10">
          <h4 class="text-xs font-bold text-chic-deep uppercase tracking-widest mb-4 flex items-center gap-2">
            <span class="text-lg">⚖️</span> İlişki Dengesi
          </h4>
          <div class="space-y-4">
            <div>
                <div class="flex justify-between text-[10px] uppercase font-bold text-chic-text mb-1">
                    <span>Tutku & Çekim</span> <span>94% (Çok Yüksek)</span>
                </div>
                <div class="w-full bg-white h-2 rounded-full overflow-hidden border border-chic-primary/10">
                    <div class="h-full bg-gradient-to-r from-red-300 to-red-500 w-[94%]"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-[10px] uppercase font-bold text-chic-text mb-1">
                    <span>İletişim Kalitesi</span> <span>68% (Riskli)</span>
                </div>
                <div class="w-full bg-white h-2 rounded-full overflow-hidden border border-chic-primary/10">
                    <div class="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 w-[68%]"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-[10px] uppercase font-bold text-chic-text mb-1">
                    <span>Gelecek Hedefleri</span> <span>88% (Uyumlu)</span>
                </div>
                <div class="w-full bg-white h-2 rounded-full overflow-hidden border border-chic-primary/10">
                    <div class="h-full bg-gradient-to-r from-green-300 to-green-500 w-[88%]"></div>
                </div>
            </div>
          </div>
      </div>

      <!-- KUTU 2: TEŞHİS KARTI -->
      <div class="bg-white p-5 rounded-xl border-l-4 border-chic-accent shadow-sm">
          <h4 class="text-xs font-bold text-chic-accent uppercase tracking-widest mb-3">Klinik Teşhis</h4>
          <div class="space-y-3">
              <div class="flex gap-2 items-start">
                  <span class="text-lg leading-none">🚩</span>
                  <div>
                      <span class="text-[10px] font-bold text-chic-deep block">RİSK FAKTÖRÜ</span>
                      <p class="text-xs text-chic-text leading-snug">Partnerin (Oğlak) iş odaklı yapısı, senin (Yengeç) duygusal ihtiyaçlarını "gereksiz drama" olarak etiketleyebilir.</p>
                  </div>
              </div>
              <div class="flex gap-2 items-start">
                  <span class="text-lg leading-none">💊</span>
                  <div>
                      <span class="text-[10px] font-bold text-chic-deep block">TEDAVİ ÖNERİSİ</span>
                      <p class="text-xs text-chic-text leading-snug">Haftada 1 kez "sorun konuşmama" randevusu. Sadece eğlence odaklı aktivite şart.</p>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- TEXT CONTENT -->
  <div class="prose prose-sm max-w-none text-chic-text text-justify leading-relaxed">
      <h4 class="font-serif text-lg text-chic-deep italic border-b border-chic-primary/20 pb-2 mb-3">Psikolojik Derinlik Analizi</h4>
      <p>
        Bu ilişkinin temel dinamiği <strong>"Tamamlayıcı Zıtlıklar"</strong> üzerine kurulu. Oğlak erkeğinin sağladığı güvenli ve stabil yapı (baba figürü arketipi), Yengeç kadınının aradığı "köklenme" ihtiyacını %100 karşılıyor. 
      </p>
      <p>
        Ancak tehlike çanları <strong>"Sessiz Beklentiler"</strong> konusunda çalıyor. Mert, sevgisini "hizmet ederek" (senin için bir şeyler yaparak) gösterirken, sen "duymak ve dokunulmak" istiyorsun. Bu dil uyuşmazlığı çözülmezse, 3. yılın sonunda ciddi bir duygusal soğuma riski mevcut.
      </p>
  </div>

</div>
`;
