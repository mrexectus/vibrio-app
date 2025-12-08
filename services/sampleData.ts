
export const sampleReportContent = `
<div class="font-sans text-chic-deep">
  
  <!-- HEADER SECTION -->
  <div class="flex flex-col md:flex-row justify-between items-end border-b border-chic-primary/20 pb-6 mb-8 gap-4">
      <div>
          <div class="flex items-center gap-2 mb-1">
             <span class="px-2 py-0.5 bg-chic-deep text-white text-[9px] font-bold tracking-widest uppercase rounded">Premium Rapor</span>
             <span class="text-[9px] text-chic-accent tracking-widest uppercase">Dosya No: #VIB-8821</span>
          </div>
          <h2 class="text-3xl font-serif text-chic-deep leading-none">Selin & Mert</h2>
          <div class="flex items-center gap-2 mt-2 text-xs text-chic-text font-medium">
             <span>♋ Yengeç (Su)</span>
             <span class="text-chic-primary">•</span>
             <span>♑ Oğlak (Toprak)</span>
          </div>
      </div>
      <div class="text-right">
          <div class="text-[40px] font-serif font-bold text-chic-primary leading-none">98<span class="text-lg text-chic-deep/40">%</span></div>
          <div class="text-[9px] uppercase tracking-[0.3em] text-chic-deep/60">Ruh Eşi Uyumu</div>
      </div>
  </div>

  <!-- SECTION 1: VISUAL PROJECTION (FACES VISIBLE) -->
  <div class="bg-gradient-to-br from-[#FDFBF7] to-white p-1 rounded-3xl shadow-sm border border-chic-primary/10 mb-8">
     <div class="bg-white rounded-[20px] p-6 relative overflow-hidden">
         <!-- Watermark -->
         <div class="absolute top-0 right-0 opacity-[0.03] text-9xl font-serif pointer-events-none">V</div>
         
         <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-chic-primary/10 flex items-center justify-center text-chic-primary">⏳</div>
            <div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-chic-deep">Vibrio Vision™</h3>
                <p class="text-[10px] text-gray-400">Yapay Zeka Destekli Yaşlandırma Simülasyonu</p>
            </div>
         </div>

         <div class="grid grid-cols-2 gap-4 md:gap-8">
            <!-- YOUNG COUPLE - FACE VISIBLE -->
            <div class="group cursor-pointer">
                <div class="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-lg border border-chic-primary/10">
                    <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Genç Çift">
                    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span class="text-white text-xs font-serif italic">2025 (Şimdi)</span>
                    </div>
                </div>
                <div class="mt-2 text-center">
                    <span class="text-[9px] uppercase tracking-widest text-chic-accent">Tutkunun Zirvesi</span>
                </div>
            </div>

            <!-- OLD COUPLE - FACE VISIBLE (HAPPY) -->
            <div class="group cursor-pointer">
                <div class="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-lg border border-chic-primary/10 grayscale-[0.2]">
                    <div class="absolute top-2 right-2 bg-white/90 backdrop-blur text-chic-deep text-[8px] px-2 py-1 rounded font-bold tracking-widest z-10 shadow-sm">AI PROJECTION</div>
                    <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Yaşlı Çift">
                    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span class="text-white text-xs font-serif italic">2065 (Gelecek)</span>
                    </div>
                </div>
                <div class="mt-2 text-center">
                    <span class="text-[9px] uppercase tracking-widest text-chic-accent">Sarsılmaz Yol Arkadaşlığı</span>
                </div>
            </div>
         </div>
         
         <div class="mt-6 p-4 bg-chic-bg rounded-xl border border-chic-primary/5 text-center">
            <p class="font-serif italic text-sm text-chic-deep/80">"Yüzlerindeki kırışıklıklar, birlikte ne kadar çok güldüklerinin haritası gibi. Vibrio algoritmaları, bu çiftin yaşlılıkta bile göz temasını asla kaybetmeyeceğini öngörüyor."</p>
         </div>
     </div>
  </div>

  <!-- SECTION 2: ASTRO & NUMEROLOGY DASHBOARD -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      
      <!-- LEFT: STAR CHART VISUALIZATION -->
      <div class="bg-chic-deep text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
          <div class="absolute top-0 right-0 w-32 h-32 bg-chic-primary/20 rounded-full blur-3xl"></div>
          
          <h4 class="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
             <span>✨</span> Sinastri Haritası
          </h4>
          
          <div class="relative w-full aspect-square max-w-[200px] mx-auto mb-4">
              <!-- Simple CSS Orbit Chart -->
              <div class="absolute inset-0 rounded-full border border-white/10 flex items-center justify-center">
                  <div class="w-[70%] h-[70%] rounded-full border border-white/20 flex items-center justify-center">
                      <div class="w-[50%] h-[50%] rounded-full border border-white/30 flex items-center justify-center bg-white/5">
                           <span class="text-2xl">❤️</span>
                      </div>
                  </div>
              </div>
              
              <!-- Planets -->
              <div class="absolute top-[10%] left-[50%] w-3 h-3 bg-chic-primary rounded-full shadow-[0_0_10px_rgba(212,163,115,0.8)]"></div>
              <div class="absolute bottom-[20%] right-[20%] w-2 h-2 bg-blue-300 rounded-full"></div>
              <div class="absolute top-[40%] left-[10%] w-4 h-4 bg-red-400 rounded-full opacity-80"></div>
              
              <!-- Lines -->
              <svg class="absolute inset-0 w-full h-full opacity-30">
                 <line x1="50%" y1="10%" x2="20%" y2="60%" stroke="white" stroke-width="1" />
                 <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="white" stroke-width="1" />
              </svg>
          </div>

          <div class="space-y-2 text-center">
             <div class="text-[10px] text-white/60 uppercase tracking-widest">Başat Açı</div>
             <div class="font-serif text-lg">Güneş (Yengeç) ☍ Satürn (Oğlak)</div>
             <p class="text-[9px] text-white/50 leading-relaxed px-4">Zıt burçların efsanevi çekimi. Biri evin sıcaklığı, diğeri dış dünyanın kalesi.</p>
          </div>
      </div>

      <!-- RIGHT: BIOCHEMICAL & METRICS -->
      <div class="flex flex-col gap-4">
          
          <!-- Biochemical -->
          <div class="bg-white p-5 rounded-2xl border border-chic-primary/10 shadow-sm flex-1">
             <h4 class="text-[10px] font-bold text-chic-deep uppercase tracking-widest mb-4">Biyokimyasal Analiz</h4>
             <div class="space-y-3">
                 <div>
                    <div class="flex justify-between text-[9px] uppercase font-bold text-gray-400 mb-1">
                        <span>Dopamin (Heyecan)</span> <span>Yüksek</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-pink-400 w-[90%]"></div>
                    </div>
                 </div>
                 <div>
                    <div class="flex justify-between text-[9px] uppercase font-bold text-gray-400 mb-1">
                        <span>Oksitosin (Bağlılık)</span> <span>Artıyor</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 w-[65%]"></div>
                    </div>
                 </div>
                 <div>
                    <div class="flex justify-between text-[9px] uppercase font-bold text-gray-400 mb-1">
                        <span>Kortizol (Stres)</span> <span>Düşük</span>
                    </div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-400 w-[20%]"></div>
                    </div>
                 </div>
             </div>
          </div>

          <!-- Karma Counter -->
          <div class="bg-chic-bg p-5 rounded-2xl border border-chic-primary/10 flex items-center justify-between">
              <div>
                  <h4 class="text-[10px] font-bold text-chic-deep uppercase tracking-widest">Karmik Borç</h4>
                  <p class="text-[9px] text-gray-500 mt-1">Önceki hayatlardan gelen bağ.</p>
              </div>
              <div class="text-2xl font-serif font-bold text-chic-primary">7/9</div>
          </div>

      </div>
  </div>

  <!-- SECTION 3: TEXT ANALYSIS -->
  <div class="prose prose-sm max-w-none text-chic-text text-justify leading-relaxed font-sans">
      <h4 class="font-serif text-lg text-chic-deep italic border-b border-chic-primary/20 pb-2 mb-4">Detaylı Psikolojik Profil</h4>
      
      <div class="mb-4">
          <strong class="text-chic-deep text-xs uppercase tracking-wide">🔗 Jungiyen Arketip:</strong>
          <span class="ml-1">"Büyücü ve Koruyucu". Selin duygusal derinliğiyle ilişkiyi beslerken, Mert mantıksal çerçeveyi çiziyor. Bu, klasik ama sarsılmaz bir tamamlayıcılık örneğidir.</span>
      </div>

      <p>
        İlişkinizdeki temel dinamik <strong>"Güvenli Liman"</strong> modelidir. Dış dünyada ne yaşanırsa yaşansın, günün sonunda birbirinizin yanında huzur buluyorsunuz. Mert'in (Oğlak) bazen soğuk görünen yapısı, Selin'in (Yengeç) şefkatiyle eriyor. Ancak dikkat: Mert'in işkolikliği, Selin'in "ihmal ediliyorum" hissini tetikleyebilir.
      </p>

      <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100 my-4">
         <strong class="block text-yellow-800 text-xs uppercase tracking-widest mb-1">⚠️ Kritik Uyarı</strong>
         <p class="text-yellow-700 text-xs m-0">
            2026 yılındaki Satürn döngüsü, ilişkinizi "sorumluluklar" üzerinden test edecek. Bu dönemde maddi konuları romantizme karıştırmamaya özen gösterin.
         </p>
      </div>

      <p>
        20 yıl sonrasına baktığımızda; sözlere gerek duymadan anlaşan, çocuklarını büyütmüş ve artık kendi bireysel zevklerine (muhtemelen doğa ile iç içe bir yaşam) dönmüş bir çift görüyoruz. Bağınız biyolojik değil, ruhsal bir sözleşme niteliğinde.
      </p>
  </div>
</div>
`;
