
export const sampleReportContent = `
<div class="space-y-8 font-sans">
  
  <!-- HEADER: CLINICAL SUMMARY -->
  <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex-1 bg-chic-deep/5 p-4 rounded-xl border border-chic-deep/10">
          <span class="text-[9px] uppercase tracking-widest text-chic-accent font-bold">Analiz Kimliği</span>
          <div class="text-lg font-serif text-chic-deep">#VIB-2025-X92</div>
          <div class="text-xs text-chic-text mt-1">Selin (Yengeç) & Mert (Oğlak)</div>
      </div>
      <div class="flex-1 bg-green-50 p-4 rounded-xl border border-green-100">
          <span class="text-[9px] uppercase tracking-widest text-green-600 font-bold">İlişki Sağlığı</span>
          <div class="text-lg font-serif text-green-800">%82 - Yüksek Potansiyel</div>
          <div class="w-full h-1.5 bg-green-200 rounded-full mt-2"><div class="w-[82%] h-full bg-green-500 rounded-full"></div></div>
      </div>
  </div>

  <!-- SECTION 1: TIME TRAVEL & GENETICS (THE VISUALS) -->
  <div class="bg-white p-5 rounded-2xl border border-chic-primary/20 shadow-sm relative overflow-hidden">
     <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chic-primary via-chic-secondary to-chic-primary"></div>
     
     <h3 class="font-serif text-xl text-chic-deep mb-4 flex items-center gap-2">
        <span class="text-2xl">🧬</span> 
        <span class="italic">Vibrio AI Vision: Zaman Yolculuğu & Genetik</span>
     </h3>
     
     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- CARD 1: TODAY -->
        <div class="group relative rounded-xl overflow-hidden aspect-[4/5] border border-gray-100 shadow-inner">
            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" alt="Couple Today">
            <div class="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-2 text-center">
                <span class="text-[10px] text-white uppercase tracking-widest font-bold">2025 (Güncel)</span>
            </div>
        </div>

        <!-- CARD 2: +20 YEARS -->
        <div class="group relative rounded-xl overflow-hidden aspect-[4/5] border-2 border-chic-primary/30 shadow-md">
            <div class="absolute top-2 right-2 bg-chic-primary text-white text-[8px] px-2 py-0.5 rounded-full z-10 font-bold tracking-widest">AI SIMULATION</div>
            <img src="https://images.unsplash.com/photo-1526662097394-84aeeb13a302?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover sepia-[.10]" alt="Couple Aged">
            <div class="absolute bottom-0 w-full bg-chic-deep/90 backdrop-blur-sm p-2 text-center">
                <span class="text-[10px] text-white uppercase tracking-widest font-bold">2045 (20 Yıl Sonra)</span>
            </div>
        </div>

        <!-- CARD 3: FUTURE BABY -->
        <div class="group relative rounded-xl overflow-hidden aspect-[4/5] border border-blue-100 shadow-inner">
             <div class="absolute top-2 right-2 bg-blue-400 text-white text-[8px] px-2 py-0.5 rounded-full z-10 font-bold tracking-widest">GENETİK TAHMİN</div>
            <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" alt="Future Baby">
            <div class="absolute bottom-0 w-full bg-blue-900/80 backdrop-blur-sm p-2 text-center">
                <span class="text-[10px] text-white uppercase tracking-widest font-bold">Muhtemel Çocuk</span>
            </div>
        </div>
     </div>
     
     <p class="text-[10px] text-center text-gray-400 mt-3 italic">
        *Simülasyonlar; yüz hatlarınız, ten renginiz ve baskın genleriniz analiz edilerek oluşturulmuştur.
     </p>
  </div>

  <!-- SECTION 2: CLINICAL METRICS -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <!-- SWOT ANALYSIS -->
      <div class="bg-chic-bg/30 p-5 rounded-xl border border-chic-primary/10">
          <h4 class="text-sm font-bold text-chic-deep uppercase tracking-widest mb-4 border-b border-chic-primary/20 pb-2">İlişki SWOT Analizi</h4>
          <div class="grid grid-cols-2 gap-3">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-[9px] text-green-600 font-bold block mb-1">GÜÇLÜ YÖNLER</span>
                  <p class="text-xs text-chic-text">Yüksek cinsel çekim, ortak mizah anlayışı.</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-[9px] text-red-500 font-bold block mb-1">ZAYIF YÖNLER</span>
                  <p class="text-xs text-chic-text">Kriz anında iletişimi kesme (Stonewalling).</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-[9px] text-blue-500 font-bold block mb-1">FIRSATLAR</span>
                  <p class="text-xs text-chic-text">Finansal güç birliği ve ortak hedefler.</p>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-[9px] text-orange-500 font-bold block mb-1">TEHDİTLER</span>
                  <p class="text-xs text-chic-text">Ailelerin ilişkiye aşırı müdahalesi.</p>
              </div>
          </div>
      </div>

      <!-- COMPATIBILITY BARS -->
      <div class="bg-white p-5 rounded-xl border border-chic-primary/10 flex flex-col justify-center">
         <h4 class="text-sm font-bold text-chic-deep uppercase tracking-widest mb-4 border-b border-chic-primary/20 pb-2">Uyum Göstergeleri</h4>
         
         <div class="space-y-4">
            <div>
                <div class="flex justify-between text-xs font-medium mb-1"><span>Tensel Uyum (Libido)</span><span>94%</span></div>
                <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-red-400 h-2 rounded-full" style="width: 94%"></div></div>
            </div>
            <div>
                <div class="flex justify-between text-xs font-medium mb-1"><span>Zihinsel Bağ</span><span>68%</span></div>
                <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-blue-400 h-2 rounded-full" style="width: 68%"></div></div>
            </div>
            <div>
                <div class="flex justify-between text-xs font-medium mb-1"><span>Duygusal Güven</span><span>75%</span></div>
                <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-green-400 h-2 rounded-full" style="width: 75%"></div></div>
            </div>
         </div>
      </div>
  </div>

  <!-- SECTION 3: TEXT ANALYSIS -->
  <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-6 italic">Klinik Değerlendirme</h3>
  <div class="prose prose-sm max-w-none text-chic-text/80 text-justify">
    <p>
      Bu ilişki, klasik bir <strong>"Zıt Kutuplar"</strong> vakasıdır. Selin'in su grubu (Yengeç) hassasiyeti, Mert'in toprak grubu (Oğlak) katılığını yumuşatmak için orada. Mert'in zaman zaman gösterdiği mesafeli tavır (Soğukluk), aslında bir savunma mekanizmasıdır.
    </p>
    <p>
      Gelecek simülasyonunda, özellikle 2027 yılı civarında ciddi bir "Kökleşme" (Evlilik/Çocuk) döngüsü görünüyor. Ancak o tarihe kadar Mert'in "eleştirilme korkusunu", Selin'in ise "terk edilme şemasını" iyileştirmesi şart. Aksi takdirde, yukarıdaki fotoğrafta gördüğünüz o mutlu yaşlı çift olmak yerine, birbirine yabancılaşmış iki ev arkadaşına dönüşme riskiniz var.
    </p>
  </div>
</div>
`;
