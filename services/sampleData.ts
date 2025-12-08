
export const sampleReportContent = `
<div class="font-sans text-chic-deep selection:bg-chic-primary selection:text-white">
  
  <!-- HEADER & SUMMARY -->
  <div class="flex flex-col md:flex-row justify-between items-start border-b-2 border-chic-deep/10 pb-8 mb-8 gap-6">
      <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
             <span class="px-3 py-1 bg-chic-deep text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded shadow-md">Premium Dosya</span>
             <span class="text-[10px] text-chic-accent tracking-widest uppercase font-medium">#VIB-8821-X9</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-chic-deep leading-tight mb-2">Selin & Mert</h2>
          <div class="flex items-center gap-3 text-xs font-bold text-chic-deep/60 uppercase tracking-widest">
             <span class="flex items-center gap-1">♋ Yengeç (Su)</span>
             <span class="w-1 h-1 rounded-full bg-chic-primary"></span>
             <span class="flex items-center gap-1">♑ Oğlak (Toprak)</span>
          </div>
      </div>
      <div class="text-right bg-chic-bg p-4 rounded-2xl border border-chic-primary/10 min-w-[140px]">
          <div class="text-5xl font-serif font-bold text-chic-primary leading-none">98<span class="text-2xl text-chic-deep/40">%</span></div>
          <div class="text-[9px] uppercase tracking-[0.3em] text-chic-deep/60 mt-1 font-bold">Ruh Eşi Uyumu</div>
      </div>
  </div>

  <!-- SECTION 1: VISUAL DASHBOARD -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
      
      <!-- SYNASTRY VISUAL -->
      <div class="md:col-span-5 bg-chic-deep text-white p-8 rounded-[2rem] relative overflow-hidden shadow-2xl group min-h-[300px] flex flex-col justify-between">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-chic-primary/20 rounded-full blur-[80px] group-hover:bg-chic-primary/30 transition-colors duration-1000"></div>
          
          <h4 class="text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-2 opacity-80 z-10">
             <span>✨</span> Sinastri Haritası
          </h4>
          
          <div class="relative w-full aspect-square max-w-[180px] mx-auto my-4">
              <!-- Animated Rings -->
              <div class="absolute inset-0 rounded-full border border-white/10 animate-[spin-slow_60s_linear_infinite]"></div>
              <div class="absolute inset-4 rounded-full border border-white/20 animate-[spin-slow_45s_linear_infinite_reverse]"></div>
              
              <!-- Core -->
              <div class="absolute inset-0 flex items-center justify-center">
                   <div class="text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">❤️</div>
              </div>

              <!-- Planets -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_orange]"></div>
              <div class="absolute bottom-4 right-4 w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_8px_cyan]"></div>
              
              <!-- Aspects (SVG Lines) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                 <line x1="50%" y1="0%" x2="85%" y2="85%" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
                 <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-dasharray="2 2" />
              </svg>
          </div>

          <div class="text-center space-y-1 relative z-10">
             <div class="font-serif text-lg">Güneş (Yengeç) <br/>☍ Satürn (Oğlak)</div>
             <p class="text-[9px] text-white/50 uppercase tracking-widest mt-2">Tamamlayıcı Zıtlık</p>
          </div>
      </div>

      <!-- ANALYTICS CARDS -->
      <div class="md:col-span-7 flex flex-col gap-6">
          
          <!-- LOVE LANGUAGE MATRIX -->
          <div class="bg-white p-6 rounded-[2rem] border border-chic-primary/10 shadow-sm flex-1 relative">
             <h4 class="text-[10px] font-bold text-chic-deep uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-chic-accent"></span> Sevgi Dili Matrisi
             </h4>
             
             <div class="space-y-4">
                 <!-- Metric 1 -->
                 <div>
                    <div class="flex justify-between text-[10px] uppercase font-bold text-chic-deep/60 mb-1">
                        <span>Fiziksel Temas</span> 
                        <span class="text-chic-deep">Mert: %90 / Selin: %40</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
                        <div class="h-full bg-chic-deep w-[40%]"></div>
                        <div class="h-full bg-chic-primary w-[50%]"></div> <!-- Difference -->
                    </div>
                 </div>
                 
                 <!-- Metric 2 -->
                 <div>
                    <div class="flex justify-between text-[10px] uppercase font-bold text-chic-deep/60 mb-1">
                        <span>Onay Sözleri</span> 
                        <span class="text-chic-deep">Mert: %30 / Selin: %95</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
                         <div class="h-full bg-chic-deep w-[30%]"></div>
                         <div class="h-full bg-chic-accent w-[65%]"></div> <!-- Difference -->
                    </div>
                 </div>
                 
                 <div class="bg-blue-50 p-3 rounded-lg mt-3 flex items-start gap-2">
                    <span class="text-lg">💡</span>
                    <p class="text-[10px] leading-tight text-blue-800">
                        <strong>Kritik Uyarı:</strong> Selin duymak istiyor, Mert ise dokunmak. Mert, Selin'e sarılmadan önce ona iltifat ederse bu kilit açılır.
                    </p>
                 </div>
             </div>
          </div>

          <!-- CHAKRA & KARMA -->
          <div class="grid grid-cols-2 gap-4">
              <div class="bg-chic-bg p-5 rounded-[1.5rem] border border-chic-primary/10">
                  <h4 class="text-[9px] font-bold text-chic-deep uppercase tracking-widest opacity-60">Karmik Ders</h4>
                  <div class="text-xl font-serif font-bold text-chic-deep mt-2 leading-tight">Sınırlar &<br/>Sorumluluk</div>
                  <div class="w-full bg-chic-primary/20 h-1 mt-3 rounded-full overflow-hidden">
                      <div class="h-full bg-chic-primary w-[70%]"></div>
                  </div>
                  <div class="text-[9px] text-right mt-1 opacity-50">%70 Tamamlandı</div>
              </div>
              
              <div class="bg-chic-bg p-5 rounded-[1.5rem] border border-chic-primary/10">
                  <h4 class="text-[9px] font-bold text-chic-deep uppercase tracking-widest opacity-60">Dominant Çakra</h4>
                  <div class="flex items-center gap-2 mt-2">
                      <div class="w-3 h-12 bg-red-400 rounded-full opacity-30"></div>
                      <div class="w-3 h-12 bg-green-400 rounded-full shadow-lg scale-110"></div>
                      <div class="w-3 h-12 bg-purple-400 rounded-full opacity-60"></div>
                  </div>
                  <div class="text-[10px] font-bold text-green-700 mt-2">Kalp Çakrası (Anahata)</div>
              </div>
          </div>

      </div>
  </div>

  <!-- SECTION 2: DEEP DIVE TEXT ANALYSIS -->
  <div class="max-w-4xl mx-auto space-y-10">
      
      <!-- INTRO -->
      <div class="relative pl-6 border-l-4 border-chic-primary">
          <p class="font-serif text-2xl italic text-chic-deep leading-relaxed">
            "Bu ilişki bir tesadüf değil, bir <span class="text-chic-primary font-bold">iyileşme projesi</span>. Birbirinizin en derin yaralarını biliyor, tam oradan öpüyorsunuz. Ancak dikkat: Şifacı bazen Cellat'a dönüşebilir."
          </p>
      </div>

      <!-- ANALYSIS BLOCKS -->
      <div class="prose prose-stone max-w-none text-chic-text text-justify leading-loose font-sans">
          
          <h3 class="text-xl font-serif font-bold text-chic-deep border-b border-chic-primary/20 pb-2 mb-4">1. Psiko-Dinamik Profil: "Ebeveyn ve Çocuk"</h3>
          <p>
            Jungiyen perspektifte, Mert (Oğlak) bu ilişkide "Kural Koyucu Baba" arketipini, Selin (Yengeç) ise "Besleyici Anne" arketipini üstlenmiş durumda. Bu ilk başta mükemmel bir ev düzeni yaratsa da, erotizmi öldüren bir zehirdir. Mert'in sürekli mantık araması, Selin'in sezgisel dünyasını "saçmalık" olarak etiketlemesine neden oluyor.
          </p>
          <ul class="list-disc pl-5 space-y-2 mt-4 text-sm bg-white p-6 rounded-2xl shadow-sm border border-chic-primary/5">
              <li><strong>Gölge Yansıtma:</strong> Selin kendi güçsüzlüğünü Mert'e yansıtıp onu "kalpsiz" olmakla suçluyor.</li>
              <li><strong>Animus Entegrasyonu:</strong> Mert, kendi içindeki duygusal tarafı bastırdığı için Selin'in ağlamalarına tahammül edemiyor.</li>
          </ul>

          <h3 class="text-xl font-serif font-bold text-chic-deep border-b border-chic-primary/20 pb-2 mb-4 mt-10">2. İletişim Frekans Analizi</h3>
          <p>
             Sözlü iletişiminizde ciddi bir "Kanal Uyuşmazlığı" var. Aşağıdaki grafik, tartışma anındaki enerji dalgalanmanızı gösteriyor:
          </p>
          
          <!-- CUSTOM HTML CHART: FREQUENCY -->
          <div class="bg-chic-deep/5 p-6 rounded-xl mt-4 mb-6">
              <div class="flex items-end gap-1 h-24 w-full">
                  <!-- Simulated Audio Waveform -->
                  <div class="w-1 bg-chic-deep/20 h-[40%]"></div><div class="w-1 bg-chic-deep/20 h-[60%]"></div>
                  <div class="w-1 bg-chic-deep/40 h-[80%]"></div><div class="w-1 bg-red-400 h-[100%]"></div> <!-- Mert Explodes -->
                  <div class="w-1 bg-chic-deep/40 h-[50%]"></div><div class="w-1 bg-chic-deep/20 h-[30%]"></div>
                  <div class="w-1 bg-chic-deep/10 h-[20%]"></div><div class="w-1 bg-chic-deep/10 h-[20%]"></div>
                  <div class="w-1 bg-chic-deep/10 h-[20%]"></div><div class="w-1 bg-blue-400 h-[90%]"></div> <!-- Selin Cries -->
                  <div class="w-1 bg-chic-deep/30 h-[40%]"></div><div class="w-1 bg-chic-deep/20 h-[20%]"></div>
              </div>
              <div class="flex justify-between text-[9px] uppercase tracking-widest mt-2 text-chic-deep/50">
                  <span>Başlangıç (Sakin)</span>
                  <span>Mert: Mantık Patlaması</span>
                  <span>Selin: Duygusal Sel</span>
              </div>
          </div>
          
          <h3 class="text-xl font-serif font-bold text-chic-deep border-b border-chic-primary/20 pb-2 mb-4 mt-10">3. Stratejik Gelecek Simülasyonu</h3>
          
          <div class="space-y-6 mt-6">
              <div class="flex gap-4">
                  <div class="w-16 text-right font-bold text-chic-primary pt-1">2025</div>
                  <div class="flex-1 pb-6 border-l-2 border-chic-primary/20 pl-6 relative">
                      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-chic-primary"></div>
                      <h5 class="font-bold text-chic-deep text-sm uppercase">Maddi Birleşme</h5>
                      <p class="text-sm mt-1">Ortak bir yatırım veya ev alımı gündeme gelecek. Bu borçlanma sizi birbirinize daha çok bağlayacak.</p>
                  </div>
              </div>
              <div class="flex gap-4">
                  <div class="w-16 text-right font-bold text-chic-accent pt-1">2027</div>
                  <div class="flex-1 pb-6 border-l-2 border-chic-primary/20 pl-6 relative">
                      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-chic-accent"></div>
                      <h5 class="font-bold text-chic-deep text-sm uppercase">Kırılma & Dönüşüm</h5>
                      <p class="text-sm mt-1">Dış kaynaklı bir kriz (aile veya iş) ilişkinin temellerini sarsacak. Eğer "biz" olmayı başarırsanız, bu sizi evliliğe götüren son viraj olacak.</p>
                  </div>
              </div>
              <div class="flex gap-4">
                  <div class="w-16 text-right font-bold text-chic-success pt-1">2040</div>
                  <div class="flex-1 pl-6 relative">
                      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-chic-success"></div>
                      <h5 class="font-bold text-chic-deep text-sm uppercase">Bilge Ortaklık</h5>
                      <p class="text-sm mt-1">Tutkunun yerini derin bir "yol arkadaşlığı" alacak. Birlikte bir şeyler ürettiğiniz, belki bir bahçe veya sanatla uğraştığınız huzurlu yıllar.</p>
                  </div>
              </div>
          </div>

      </div>
  </div>
</div>
`;