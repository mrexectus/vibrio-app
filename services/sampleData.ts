
export const sampleReportContent = `
<div class="font-sans text-chic-deep selection:bg-chic-primary selection:text-white">
  
  <!-- HERO SUMMARY -->
  <div class="relative overflow-hidden bg-gradient-to-br from-white via-[#FCFBF9] to-[#F4F1EA] p-8 md:p-12 rounded-[2.5rem] border border-white/40 shadow-xl mb-12">
      <div class="absolute top-0 right-0 w-64 h-64 bg-chic-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div class="space-y-4 max-w-lg">
             <div className="flex items-center gap-3">
                 <span class="px-3 py-1 bg-chic-deep text-white text-[10px] font-bold tracking-[0.25em] uppercase rounded-full shadow-lg shadow-chic-deep/20">Vibrio Premium</span>
                 <span class="text-[10px] text-chic-accent tracking-widest uppercase opacity-70">#REF-2024-X92</span>
             </div>
             
             <h2 class="text-5xl md:text-7xl font-serif font-medium text-chic-deep leading-[0.9] tracking-tight">
                Karmik <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-chic-primary via-amber-400 to-chic-accent italic pr-2">Düğüm.</span>
             </h2>
             
             <p class="text-sm md:text-base text-chic-text/80 leading-relaxed border-l-2 border-chic-primary/30 pl-5 py-1">
                Bu ilişki sıradan bir flört değil; birbirinizin bilinçaltındaki "tamamlanmamış işleri" bitirmek için bir araya gelmiş iki ruhun sözleşmesi. Tutku yüksek, ancak bedeli de ağır.
             </p>
          </div>
          
          <!-- SCORE CARD -->
          <div class="relative group">
              <div class="absolute inset-0 bg-chic-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div class="w-32 h-32 md:w-40 md:h-40 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-2xl flex flex-col items-center justify-center relative z-10">
                 <span class="text-5xl md:text-6xl font-serif font-bold text-chic-deep tracking-tighter">89</span>
                 <span class="text-[9px] uppercase tracking-[0.2em] text-chic-deep/50 mt-1">Vibrio Skoru</span>
                 
                 <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#E5E0D8" stroke-width="2" />
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#D4A373" stroke-width="4" stroke-dasharray="300" stroke-dashoffset="30" stroke-linecap="round" class="drop-shadow-lg" />
                 </svg>
              </div>
          </div>
      </div>
  </div>

  <!-- GRID 1: ASTRO MATRIX & NUMEROLOGY -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      
      <!-- ASTRO SYNASTRY MATRIX -->
      <div class="bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-lg shadow-chic-deep/5 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-transparent rounded-full blur-2xl opacity-50"></div>
          
          <h3 class="text-xs font-bold text-chic-deep/60 uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
             <span class="w-2 h-2 rounded-full bg-chic-deep"></span> Astro-Sinastri Matrisi
          </h3>
          
          <div class="grid grid-cols-2 gap-4">
             <!-- Card 1 -->
             <div class="bg-white p-5 rounded-2xl border border-chic-deep/5 shadow-sm hover:shadow-md hover:border-chic-primary/30 transition-all duration-300 group/card relative overflow-hidden">
                 <div class="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-[50px] -mr-8 -mt-8 transition-transform group-hover/card:scale-150"></div>
                 <div class="relative z-10">
                     <div class="text-2xl mb-2">☀️🌙</div>
                     <h4 class="font-serif font-bold text-chic-deep text-sm mb-1">Güneş & Ay</h4>
                     <span class="text-[9px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mb-2">Üçgen (120°)</span>
                     <p class="text-[10px] text-chic-text/70 leading-snug">Ruhsal konfor. Yanında evinde gibi hissediyorsun.</p>
                 </div>
             </div>
             
             <!-- Card 2 -->
             <div class="bg-white p-5 rounded-2xl border border-chic-deep/5 shadow-sm hover:shadow-md hover:border-chic-primary/30 transition-all duration-300 group/card relative overflow-hidden">
                 <div class="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-[50px] -mr-8 -mt-8 transition-transform group-hover/card:scale-150"></div>
                 <div class="relative z-10">
                     <div class="text-2xl mb-2">♀️♂️</div>
                     <h4 class="font-serif font-bold text-chic-deep text-sm mb-1">Venüs & Mars</h4>
                     <span class="text-[9px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full inline-block mb-2">Kare (90°)</span>
                     <p class="text-[10px] text-chic-text/70 leading-snug">Patlayıcı cinsel çekim ama ego savaşları.</p>
                 </div>
             </div>

             <!-- Card 3 -->
             <div class="bg-white p-5 rounded-2xl border border-chic-deep/5 shadow-sm hover:shadow-md hover:border-chic-primary/30 transition-all duration-300 group/card relative overflow-hidden">
                 <div class="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-[50px] -mr-8 -mt-8 transition-transform group-hover/card:scale-150"></div>
                 <div class="relative z-10">
                     <div class="text-2xl mb-2">🪐</div>
                     <h4 class="font-serif font-bold text-chic-deep text-sm mb-1">Satürn Bağı</h4>
                     <span class="text-[9px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-2">Kavuşum</span>
                     <p class="text-[10px] text-chic-text/70 leading-snug">Karmik sorumluluk ve ağır dersler.</p>
                 </div>
             </div>

              <!-- Card 4 -->
             <div class="bg-white p-5 rounded-2xl border border-chic-deep/5 shadow-sm hover:shadow-md hover:border-chic-primary/30 transition-all duration-300 group/card relative overflow-hidden">
                 <div class="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-[50px] -mr-8 -mt-8 transition-transform group-hover/card:scale-150"></div>
                 <div class="relative z-10">
                     <div class="text-2xl mb-2">⚡</div>
                     <h4 class="font-serif font-bold text-chic-deep text-sm mb-1">Uranüs</h4>
                     <span class="text-[9px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full inline-block mb-2">Zıt Açı</span>
                     <p class="text-[10px] text-chic-text/70 leading-snug">Ani kopuşlar ve sürpriz barışmalar.</p>
                 </div>
             </div>
          </div>
      </div>

      <!-- NUMEROLOGY VISUAL -->
      <div class="bg-gradient-to-br from-[#2a2522] to-chic-deep text-white p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-chic-primary/20 rounded-full blur-[80px]"></div>

          <h3 class="text-xs font-bold text-white/60 uppercase tracking-[0.25em] mb-10 relative z-10 flex items-center gap-3">
             <span class="w-2 h-2 rounded-full bg-chic-primary animate-pulse"></span> Numeroloji Simyası
          </h3>

          <div class="flex items-center justify-between relative z-10 px-2">
              <div class="flex flex-col items-center gap-3 group">
                  <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-3xl md:text-4xl font-serif font-bold shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:bg-white/10 transition-colors">
                      7
                  </div>
                  <span class="text-[9px] uppercase tracking-widest text-white/50 text-center">Sen (Münzevi)</span>
              </div>

              <div class="text-2xl text-chic-primary font-thin opacity-50">+</div>

              <div class="flex flex-col items-center gap-3 group">
                  <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-3xl md:text-4xl font-serif font-bold shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:bg-white/10 transition-colors">
                      9
                  </div>
                  <span class="text-[9px] uppercase tracking-widest text-white/50 text-center">O (Şifacı)</span>
              </div>

               <div class="text-2xl text-chic-primary font-thin opacity-50">=</div>

              <div class="flex flex-col items-center gap-3">
                  <div class="relative">
                      <div class="absolute inset-0 bg-chic-primary blur-2xl opacity-40 animate-pulse-slow"></div>
                      <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-chic-primary to-amber-600 flex items-center justify-center text-4xl md:text-5xl font-serif font-bold text-white shadow-2xl relative z-10 border-4 border-[#2a2522]">
                          7
                      </div>
                  </div>
                  <span class="text-[9px] uppercase tracking-widest text-chic-primary font-bold text-center">Mistik Birlik</span>
              </div>
          </div>
          
          <div class="mt-8 relative z-10 bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-md">
             <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">📜</span>
                <span class="text-[10px] font-bold uppercase tracking-widest text-chic-primary">Karmik Ders</span>
             </div>
             <p class="text-xs md:text-sm text-white/80 leading-relaxed font-light">
                Bu 7-9-7 kombinasyonu, <strong>"Ruhsal İzolasyon ve Birlik"</strong> paradoksunu temsil eder. Karmik göreviniz, yalnız kalma korkusu olmadan birbirinize alan tanımayı öğrenmektir. İlişki sizi dış dünyadan koparıp kendi balonunuzu yaratmaya zorlayabilir; bu tuzağa düşmeyin.
             </p>
          </div>
      </div>
  </div>

  <!-- GRID 2: LOVE DNA & EQUALIZER -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      
      <!-- LOVE LANGUAGE DNA -->
      <div class="bg-white p-8 rounded-[2.5rem] border border-chic-deep/5 shadow-xl relative overflow-visible">
          <h3 class="text-xs font-bold text-chic-deep/60 uppercase tracking-[0.25em] mb-10 flex items-center gap-3">
             <span class="w-2 h-2 rounded-full bg-chic-primary"></span> Sevgi Dili DNA'sı
          </h3>
          
          <div class="space-y-8">
              <!-- DNA Strand 1 -->
              <div class="relative group cursor-help">
                  <div class="flex justify-between items-end mb-2">
                      <span class="text-xs font-bold text-chic-deep uppercase tracking-wider group-hover:text-chic-primary transition-colors">Fiziksel Temas</span>
                      <div class="flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                          <span class="text-[9px] font-bold text-chic-text/50 uppercase tracking-widest">Uyumsuz</span>
                      </div>
                  </div>
                  
                  <!-- Capsule Container -->
                  <div class="h-12 w-full bg-gray-100 rounded-full relative overflow-visible shadow-inner">
                      <!-- Tooltip (New Interactive Style) -->
                      <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-chic-deep text-white px-4 py-2 rounded-lg text-[10px] w-64 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 z-50 shadow-2xl pointer-events-none">
                          <span class="font-bold text-chic-primary">Detay:</span> Mert (%80) temasla sakinleşirken, Selin (%20) bunu boğucu buluyor.
                          <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-chic-deep rotate-45"></div>
                      </div>

                      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 rounded-full overflow-hidden"></div>
                      
                      <!-- Bar 1 (Mert) -->
                      <div class="absolute top-1 bottom-1 left-1 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 flex items-center pl-4 shadow-sm z-10 transition-all duration-500 w-[80%] overflow-hidden">
                          <span class="text-[9px] font-bold text-white tracking-widest">MERT %80</span>
                      </div>
                      
                      <!-- Bar 2 (Selin) Overlay -->
                      <div class="absolute top-2 bottom-2 left-1 rounded-full bg-white/90 backdrop-blur-sm border border-chic-primary flex items-center pl-3 shadow-lg z-20 transition-all duration-700 w-[20%] group-hover:w-[25%] overflow-hidden">
                          <span class="text-[9px] font-bold text-chic-deep tracking-widest">SELİN</span>
                      </div>
                  </div>
              </div>

              <!-- DNA Strand 2 -->
              <div class="relative group cursor-help">
                  <div class="flex justify-between items-end mb-2">
                      <span class="text-xs font-bold text-chic-deep uppercase tracking-wider group-hover:text-chic-primary transition-colors">Onay Sözleri</span>
                      <div class="flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span class="text-[9px] font-bold text-chic-text/50 uppercase tracking-widest">Kritik</span>
                      </div>
                  </div>

                  <div class="h-12 w-full bg-gray-100 rounded-full relative overflow-visible shadow-inner">
                      <!-- Tooltip -->
                      <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-chic-deep text-white px-4 py-2 rounded-lg text-[10px] w-64 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 z-50 shadow-2xl pointer-events-none">
                          <span class="font-bold text-chic-primary">Detay:</span> Mert (%20) sessiz sevgiyi tercih ederken, Selin (%95) duymak istiyor.
                          <div class="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-chic-deep rotate-45"></div>
                      </div>

                      <div class="absolute top-1 bottom-1 left-1 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 flex items-center pl-4 shadow-sm z-10 w-[20%] overflow-hidden">
                          <span class="text-[9px] font-bold text-white tracking-widest">M</span>
                      </div>
                      <div class="absolute top-2 bottom-2 left-1 rounded-full bg-gradient-to-r from-chic-primary to-amber-300 flex items-center justify-end pr-4 shadow-lg z-20 w-[95%] overflow-hidden">
                          <span class="text-[9px] font-bold text-white tracking-widest">SELİN %95</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- DIGITAL EQUALIZER (INTERACTIVE) -->
      <div class="bg-[#2A2522] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
           <!-- Glows -->
           <div class="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]"></div>
           <div class="absolute bottom-0 right-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-[60px]"></div>

           <h3 class="text-xs font-bold text-white/60 uppercase tracking-[0.25em] mb-4 flex items-center gap-3 relative z-10">
             <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Duygu Biyoritmi
           </h3>

           <div class="flex items-end justify-between h-48 w-full gap-1.5 z-10 px-2 pb-4">
               
               <!-- Interactive Bar 1 -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-white/5 rounded-t-sm h-[30%] group-hover/bar:h-[40%] group-hover/bar:bg-emerald-400 transition-all duration-300"></div>
                   <!-- Tooltip -->
                   <div class="absolute bottom-[45%] left-1/2 -translate-x-1/2 bg-chic-deep text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                       Huzur %30
                       <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-chic-deep"></div>
                   </div>
               </div>

               <!-- Interactive Bar 2 -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-white/10 rounded-t-sm h-[40%] group-hover/bar:h-[50%] group-hover/bar:bg-emerald-500 transition-all duration-300"></div>
                   <div class="absolute bottom-[55%] left-1/2 -translate-x-1/2 bg-chic-deep text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                       Güven %40
                       <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-chic-deep"></div>
                   </div>
               </div>

               <!-- Interactive Bar 3 -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-gradient-to-t from-emerald-900 to-emerald-500 rounded-t-sm h-[50%] opacity-80 group-hover/bar:opacity-100 group-hover/bar:h-[60%] transition-all"></div>
                   <div class="absolute bottom-[65%] left-1/2 -translate-x-1/2 bg-chic-deep text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                       Empati %50
                       <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-chic-deep"></div>
                   </div>
               </div>

               <!-- Interactive Bar 4 -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-gradient-to-t from-amber-900 to-amber-500 rounded-t-sm h-[70%] group-hover/bar:h-[80%] transition-all"></div>
                   <div class="absolute bottom-[85%] left-1/2 -translate-x-1/2 bg-chic-deep text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                       Kaygı %70
                       <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-chic-deep"></div>
                   </div>
               </div>
               
               <!-- Peak Warning Bar -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-gradient-to-t from-red-900 via-red-600 to-red-500 rounded-t-sm h-[95%] shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse group-hover/bar:animate-none group-hover/bar:scale-105 transition-transform origin-bottom"></div>
                   <div class="absolute bottom-[100%] left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-all whitespace-nowrap shadow-lg z-50">
                      ⚠️ ÖFKE PATLAMASI
                      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600"></div>
                   </div>
               </div>

               <!-- Interactive Bar 6 -->
               <div class="relative group/bar w-full h-full flex items-end">
                   <div class="w-full bg-gradient-to-t from-blue-900 to-blue-400 rounded-t-sm h-[60%] group-hover/bar:h-[70%] transition-all"></div>
                   <div class="absolute bottom-[75%] left-1/2 -translate-x-1/2 bg-chic-deep text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                       Soğuma %60
                       <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-chic-deep"></div>
                   </div>
               </div>
               
               <div class="w-full bg-white/10 rounded-t-sm h-[40%]"></div>
               <div class="w-full bg-white/5 rounded-t-sm h-[20%]"></div>
           </div>

           <div class="bg-white/5 rounded-xl p-4 z-10 backdrop-blur-md border border-white/5 flex items-start gap-3">
               <span class="text-xl">📉</span>
               <p class="text-[10px] leading-relaxed text-white/80">
                   <strong>Döngü Analizi:</strong> Kırmızı (Öfke) ve Mavi (Soğuma) arasındaki geçiş çok sert. "Gri alan" yani sağlıklı tartışma zemini neredeyse yok.
               </p>
           </div>
      </div>
  </div>

  <!-- TABLE SECTION: CONFLICT MATRIX -->
  <div class="mb-16">
      <h4 class="text-xl font-serif font-bold text-chic-deep mb-6 flex items-center gap-3">
          <span class="text-2xl">⚔️</span> Çatışma Çözüm Matrisi
      </h4>
      <div class="overflow-x-auto rounded-2xl border border-chic-deep/5 shadow-sm">
          <table class="w-full text-left text-sm border-collapse">
              <thead>
                  <tr class="bg-chic-deep text-white uppercase text-[10px] tracking-widest">
                      <th class="p-4 font-bold border-b border-white/10">Sorun Tipi</th>
                      <th class="p-4 font-bold border-b border-white/10">Senin Tepkin</th>
                      <th class="p-4 font-bold border-b border-white/10">Onun Tepkin</th>
                      <th class="p-4 font-bold border-b border-white/10">Önerilen Strateji</th>
                  </tr>
              </thead>
              <tbody class="bg-white">
                  <tr class="hover:bg-chic-primary/5 transition-colors border-b border-chic-primary/10">
                      <td class="p-4 font-bold text-chic-deep">Kıskançlık</td>
                      <td class="p-4 text-chic-text/80">İçe Kapanma (Pasif)</td>
                      <td class="p-4 text-chic-text/80">Sorgulama (Aktif)</td>
                      <td class="p-4 text-green-700 font-medium">Açık iletişim, güvence verme.</td>
                  </tr>
                  <tr class="hover:bg-chic-primary/5 transition-colors border-b border-chic-primary/10 bg-[#FCFBF9]">
                      <td class="p-4 font-bold text-chic-deep">Para Yönetimi</td>
                      <td class="p-4 text-chic-text/80">Risk Alıcı</td>
                      <td class="p-4 text-chic-text/80">Garantici</td>
                      <td class="p-4 text-amber-700 font-medium">Ortak bütçe havuzu oluşturma.</td>
                  </tr>
                  <tr class="hover:bg-chic-primary/5 transition-colors">
                      <td class="p-4 font-bold text-chic-deep">İletişim Kopukluğu</td>
                      <td class="p-4 text-chic-text/80">Mesaj bombardımanı</td>
                      <td class="p-4 text-chic-text/80">Ghosting / Sessizlik</td>
                      <td class="p-4 text-red-700 font-medium">"24 Saat Kuralı" uygulama.</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>

  <!-- TIMELINE SECTION (INTERACTIVE) -->
  <div class="relative py-8 pl-4 md:pl-0 max-w-4xl mx-auto">
      <div class="hidden md:block absolute -left-16 top-0 text-8xl opacity-5 font-serif font-bold text-chic-deep">III</div>
      
      <h4 class="text-2xl font-serif font-bold text-chic-deep mb-12 flex items-center gap-4">
          <span class="p-3 bg-chic-bg rounded-full border border-chic-primary/20 shadow-sm text-2xl">⏳</span>
          20 Yıllık Projeksiyon
      </h4>
      
      <div class="space-y-12 relative border-l-2 border-dashed border-chic-deep/10 ml-4 md:ml-6 pb-4">
          
          <!-- Event 1 -->
          <div class="relative pl-10 group">
              <!-- Interactive Dot with Tooltip -->
              <div class="absolute -left-[9px] top-2 w-5 h-5 rounded-full bg-chic-primary ring-4 ring-white shadow-lg group-hover:scale-125 transition-transform duration-300 z-20 cursor-help">
                  <!-- Tooltip -->
                  <div class="absolute left-8 top-1/2 -translate-y-1/2 bg-chic-deep text-white p-3 rounded-xl text-[10px] w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                      <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">🪐</span>
                          <span className="font-bold uppercase tracking-widest text-chic-primary">Astro-Transit</span>
                      </div>
                      <p>Satürn 7. Ev (İlişkiler Evi) geçişi. Sorumluluk alma ve ciddiyet testi.</p>
                      <div class="absolute top-1/2 -left-2 -translate-y-1/2 border-4 border-transparent border-r-chic-deep"></div>
                  </div>
              </div>
              
              <div class="bg-white p-6 rounded-2xl border border-chic-primary/10 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                   <div class="absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform">🚧</div>
                   
                   <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                       <span class="text-4xl font-serif font-bold text-chic-deep group-hover:text-chic-primary transition-colors">2025</span>
                       <span class="text-[9px] font-bold uppercase tracking-widest text-white bg-chic-primary px-3 py-1 rounded-full">Kırılma Noktası</span>
                   </div>
                   <p class="text-sm text-chic-text/90 leading-relaxed">
                       Satürn döngüsü sertleşiyor. Maddi veya kariyer odaklı bir kriz, ilişkinin "konfor alanını" yıkacak. Sabır testinden geçiyorsunuz.
                   </p>
              </div>
          </div>

          <!-- Event 2 -->
          <div class="relative pl-10 group">
              <!-- Interactive Dot -->
              <div class="absolute -left-[9px] top-2 w-5 h-5 rounded-full bg-chic-accent ring-4 ring-white shadow-lg group-hover:scale-125 transition-transform duration-300 z-20 cursor-help">
                   <div class="absolute left-8 top-1/2 -translate-y-1/2 bg-chic-deep text-white p-3 rounded-xl text-[10px] w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                      <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">✨</span>
                          <span className="font-bold uppercase tracking-widest text-chic-primary">Astro-Transit</span>
                      </div>
                      <p>Jüpiter Kavuşumu. Bolluk, bereket ve genişleme enerjisi.</p>
                      <div class="absolute top-1/2 -left-2 -translate-y-1/2 border-4 border-transparent border-r-chic-deep"></div>
                  </div>
              </div>
              
              <div class="bg-white/60 p-6 rounded-2xl border border-chic-deep/5 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 hover:bg-white backdrop-blur-sm">
                   <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                       <span class="text-4xl font-serif font-bold text-chic-deep/60 group-hover:text-chic-accent transition-colors">2030</span>
                       <span class="text-[9px] font-bold uppercase tracking-widest text-chic-accent bg-chic-accent/10 px-3 py-1 rounded-full">Dönüşüm</span>
                   </div>
                   <p class="text-sm text-chic-text/80 leading-relaxed">
                       İlişki "imparatorluk kurma" evresine geçer. Tutku yerini derin bir ortaklığa bırakır. Birlikte mülk edinme potansiyeli %90.
                   </p>
              </div>
          </div>
      </div>
  </div>

</div>
`;