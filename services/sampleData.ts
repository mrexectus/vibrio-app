
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

  <!-- GRAPHICAL DASHBOARD SECTION -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
      
      <!-- 1. SYNASTRY CHART (Visual) -->
      <div class="md:col-span-5 bg-chic-deep text-white p-8 rounded-[2rem] relative overflow-hidden shadow-2xl group">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-chic-primary/20 rounded-full blur-[80px] group-hover:bg-chic-primary/30 transition-colors duration-1000"></div>
          
          <h4 class="text-xs font-bold uppercase tracking-[0.25em] mb-8 flex items-center gap-2 opacity-80">
             <span>✨</span> Sinastri Haritası
          </h4>
          
          <div class="relative w-full aspect-square max-w-[220px] mx-auto mb-6">
              <!-- Orbit Rings -->
              <div class="absolute inset-0 rounded-full border border-white/10 flex items-center justify-center animate-[spin-slow_60s_linear_infinite]">
                  <div class="w-[4px] h-[4px] bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_white]"></div>
              </div>
              <div class="absolute inset-4 rounded-full border border-white/20 flex items-center justify-center animate-[spin-slow_45s_linear_infinite_reverse]"></div>
              <div class="absolute inset-12 rounded-full border border-white/10 flex items-center justify-center">
                  <div class="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md flex items-center justify-center border border-white/10 shadow-inner">
                       <span class="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">❤️</span>
                  </div>
              </div>
              
              <!-- Aspects Lines (SVG) -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none">
                 <line x1="50%" y1="10%" x2="80%" y2="70%" stroke="rgba(212,163,115,0.6)" stroke-width="1" />
                 <line x1="20%" y1="40%" x2="80%" y2="70%" stroke="rgba(157,129,137,0.6)" stroke-width="1" />
                 <line x1="50%" y1="50%" x2="20%" y2="40%" stroke="rgba(255,255,255,0.3)" stroke-width="1" stroke-dasharray="4 4" />
              </svg>
              
              <!-- Planet Markers -->
              <div class="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div class="w-3 h-3 bg-chic-primary rounded-full shadow-[0_0_15px_rgba(212,163,115,1)]"></div>
                  <span class="text-[8px] mt-1 opacity-60">Güneş</span>
              </div>
              <div class="absolute bottom-[30%] right-[20%] w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_10px_rgba(147,197,253,0.8)]"></div>
              <div class="absolute top-[40%] left-[20%] w-2.5 h-2.5 bg-red-400 rounded-full opacity-80"></div>
          </div>

          <div class="text-center space-y-1 relative z-10">
             <div class="font-serif text-xl">Güneş ☍ Satürn</div>
             <p class="text-[10px] text-white/50 uppercase tracking-widest">Zıt Kutupların Dengesi</p>
          </div>
      </div>

      <!-- 2. ANALYTICS (Bars & Stats) -->
      <div class="md:col-span-7 flex flex-col gap-6">
          
          <!-- BIOCHEMISTRY -->
          <div class="bg-white p-6 rounded-[2rem] border border-chic-primary/10 shadow-sm flex-1 relative overflow-hidden">
             <div class="absolute top-0 right-0 w-20 h-20 bg-chic-bg rounded-bl-[4rem]"></div>
             <h4 class="text-[10px] font-bold text-chic-deep uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-chic-success"></span> Hormonal Analiz
             </h4>
             
             <div class="space-y-5">
                 <div class="group">
                    <div class="flex justify-between text-[10px] uppercase font-bold text-chic-deep/60 mb-1.5">
                        <span>Dopamin (Heyecan)</span> <span class="text-chic-deep">Yüksek</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-pink-300 to-pink-500 w-[90%] rounded-full shadow-[0_0_10px_rgba(236,72,153,0.3)] group-hover:w-[95%] transition-all duration-1000"></div>
                    </div>
                 </div>
                 <div class="group">
                    <div class="flex justify-between text-[10px] uppercase font-bold text-chic-deep/60 mb-1.5">
                        <span>Oksitosin (Güven)</span> <span class="text-chic-deep">Yükseliyor</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-green-300 to-green-500 w-[70%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] group-hover:w-[75%] transition-all duration-1000"></div>
                    </div>
                 </div>
                 <div class="group">
                    <div class="flex justify-between text-[10px] uppercase font-bold text-chic-deep/60 mb-1.5">
                        <span>Adrenalin (Çatışma)</span> <span class="text-chic-deep">Düşük</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-300 to-blue-500 w-[20%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                    </div>
                 </div>
             </div>
          </div>

          <!-- KARMIC COUNTER & TIMELINE PREVIEW -->
          <div class="grid grid-cols-2 gap-4">
              <div class="bg-chic-bg p-5 rounded-[1.5rem] border border-chic-primary/10 flex flex-col justify-between">
                  <div>
                      <h4 class="text-[9px] font-bold text-chic-deep uppercase tracking-widest opacity-60">Karmik Borç</h4>
                  </div>
                  <div class="text-3xl font-serif font-bold text-chic-primary mt-2">7<span class="text-lg text-chic-deep/30 font-sans">/9</span></div>
                  <div class="text-[9px] text-chic-deep/50 mt-1">Ruhsal Sözleşme</div>
              </div>
              <div class="bg-chic-bg p-5 rounded-[1.5rem] border border-chic-primary/10 flex flex-col justify-between">
                  <div>
                      <h4 class="text-[9px] font-bold text-chic-deep uppercase tracking-widest opacity-60">Kritik Yıl</h4>
                  </div>
                  <div class="text-3xl font-serif font-bold text-chic-accent mt-2">2026</div>
                  <div class="text-[9px] text-chic-deep/50 mt-1">Satürn Dönüşü</div>
              </div>
          </div>

      </div>
  </div>

  <!-- SECTION 3: DEEP TEXT ANALYSIS (Magazine Style) -->
  <div class="max-w-4xl mx-auto">
      
      <!-- Intro Quote -->
      <div class="text-center mb-10 px-8">
          <p class="font-serif text-2xl italic text-chic-deep leading-relaxed">
            "Siz birbirinizin yaralarını kanatan değil, o yaraların içindeki ışığı gören iki ruhsunuz. Bu ilişki bir tesadüf değil, bir <span class="text-chic-primary underline decoration-1 underline-offset-4">uylamadır.</span>"
          </p>
      </div>

      <div class="prose prose-stone max-w-none text-chic-text text-justify leading-loose font-sans space-y-6">
          
          <div class="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-chic-deep">
              <h3 class="text-xl font-serif font-bold text-chic-deep mb-3">1. Arketip Analizi: "Mimar ve İlham Perisi"</h3>
              <p>
                Selin (Yengeç), bu ilişkinin duygusal hafızasını ve manevi çatısını oluşturuyor. Mert (Oğlak) ise o çatıyı ayakta tutan kolonları inşa ediyor. Jungiyen psikolojide buna <strong>"Tamamlayıcı Zıtlık"</strong> denir. Mert'in zaman zaman hissiz gibi görünen mantığı, aslında Selin'in aşırı dalgalanan duygularına bir çapa olmak içindir. Selin'in "Beni anlamıyorsun" dediği anlarda Mert aslında "Seni korumaya çalışıyorum" demektedir.
              </p>
          </div>

          <h3 class="text-xl font-serif font-bold text-chic-deep mt-8 pt-8 border-t border-chic-primary/20">2. Bilinçaltı Haritası & Kırmızı Bayraklar</h3>
          <p>
            İkinizin de haritasında "Güven" teması hasarlı. Selin geçmişte duygusal olarak terk edilmiş, Mert ise başarısızlık korkusuyla büyütülmüş. Bu yüzden kavgalarınızın asıl sebebi "bulaşıklar" veya "geç kalma" değil; asıl sebep <strong>"Benim için orada mısın?"</strong> sorusudur.
          </p>
          
          <!-- Warning Box -->
          <div class="my-6 bg-red-50 border border-red-100 p-5 rounded-xl flex gap-4 items-start">
              <span class="text-2xl">🚩</span>
              <div>
                  <h4 class="font-bold text-xs uppercase tracking-widest text-red-800 mb-1">Toksik Alarm</h4>
                  <p class="text-sm text-red-700 m-0">
                    Mert stres altındayken "Duvar Örme" (Stonewalling) savunmasına geçiyor. Selin ise buna "Söylenme" ile karşılık veriyor. Bu döngü kırılmazsa, 2 yıl içinde duygusal boşanma yaşanabilir.
                  </p>
              </div>
          </div>

          <h3 class="text-xl font-serif font-bold text-chic-deep mt-8 pt-8 border-t border-chic-primary/20">3. Gelecek Simülasyonu (2025 - 2045)</h3>
          
          <!-- Timeline Visualization -->
          <div class="relative py-8 pl-4 border-l-2 border-chic-primary/20 space-y-8 my-8">
              <div class="relative">
                  <div class="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-chic-deep border-4 border-white shadow-md"></div>
                  <h5 class="font-bold text-sm uppercase tracking-widest text-chic-deep">2025: Derinleşme</h5>
                  <p class="text-sm mt-1">Maddi ortaklıklar ve evle ilgili büyük bir karar (taşınma veya tadilat) sizi birbirinize kenetleyecek.</p>
              </div>
              <div class="relative">
                  <div class="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-chic-primary border-4 border-white shadow-md"></div>
                  <h5 class="font-bold text-sm uppercase tracking-widest text-chic-deep">2028: Kırılma Noktası</h5>
                  <p class="text-sm mt-1">Kariyer değişikliği sebebiyle bir kriz yaşanabilir. Bu kriz, ilişkinin "bağımlılık" seviyesinden "ortaklık" seviyesine geçmesini sağlayacak.</p>
              </div>
              <div class="relative">
                  <div class="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-chic-accent border-4 border-white shadow-md"></div>
                  <h5 class="font-bold text-sm uppercase tracking-widest text-chic-deep">2045: Altın Çağ</h5>
                  <p class="text-sm mt-1">Çocukların evden ayrılmasıyla "ikinci balayı" dönemi başlayacak. Birlikte bir sahil kasabasında veya doğada yaşam kuracaksınız.</p>
              </div>
          </div>

          <div class="bg-chic-deep text-white p-6 rounded-2xl mt-8 text-center">
              <h4 class="font-serif italic text-lg opacity-90 mb-2">Vibrio Tavsiyesi</h4>
              <p class="text-sm font-light opacity-80 max-w-lg mx-auto">
                 "Mert, Selin'e mantıkla değil, temasla cevap ver. Selin, Mert'e duygularını suçlama olmadan anlat. Haftada bir akşam 'Teknoloji Detoksu' yapın."
              </p>
          </div>

      </div>
  </div>
</div>
`;
