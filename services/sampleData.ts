

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
          <div class="bg-chic-deep text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-1 shadow-md">
            Ruh Eşi Uyumu (%98)
          </div>
          <div class="text-[9px] text-gray-400">Rapor Tarihi: 08.12.2025</div>
      </div>
  </div>

  <!-- VISUAL SIMULATION SECTION (The Hook - HANDS CONCEPT) -->
  <div class="bg-white p-6 rounded-2xl border border-chic-primary/20 shadow-sm relative overflow-hidden">
     <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
     
     <h3 class="font-serif text-xl text-chic-deep mb-6 flex items-center gap-2">
        <span class="text-2xl">⏳</span> 
        <span class="italic">Vibrio Vision: Bağlılık Testi</span>
     </h3>
     
     <div class="grid grid-cols-2 gap-6">
        
        <!-- 1. GÜNCEL HAL (Young Hands BW) -->
        <div class="space-y-3">
            <div class="aspect-square rounded-full overflow-hidden relative shadow-xl border-4 border-white ring-1 ring-gray-100 group mx-auto w-3/4">
                <img src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Genç Eller">
            </div>
            <div class="text-center">
                <div class="text-xs font-serif font-bold text-chic-deep">2025 (Bugün)</div>
                <div class="text-[9px] text-gray-400 uppercase tracking-widest">Gençlik Enerjisi</div>
            </div>
        </div>

        <!-- 2. YAŞLANDIRILMIŞ HAL (Old Hands BW) -->
        <div class="space-y-3">
            <div class="aspect-square rounded-full overflow-hidden relative shadow-xl border-4 border-chic-primary/30 ring-1 ring-chic-primary/20 group mx-auto w-3/4 grayscale">
                <div class="absolute top-0 right-0 bg-chic-deep text-white text-[8px] px-2 py-1 rounded-bl-xl z-10 font-bold tracking-widest">SİMÜLASYON</div>
                <img src="https://images.unsplash.com/photo-1526496690184-c5a894564c48?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Yaşlı Eller">
            </div>
             <div class="text-center">
                <div class="text-xs font-serif font-bold text-chic-deep">2065 (Gelecek)</div>
                <div class="text-[9px] text-gray-400 uppercase tracking-widest">Sarsılmaz Bağ</div>
            </div>
        </div>

     </div>
     
     <div class="mt-6 bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
        <p class="font-serif italic text-sm text-gray-600">"Tenler değişir, yüzler yaşlanır ama ellerin birbirini tutuş biçimi asla yalan söylemez. Vibrio, bu çiftin yaşlılıkta bile ellerini bırakmayacağını öngörüyor."</p>
     </div>
  </div>

  <!-- CLINICAL METRICS GRID -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- KUTU 1 -->
      <div class="bg-chic-bg p-5 rounded-xl border border-chic-primary/10">
          <h4 class="text-xs font-bold text-chic-deep uppercase tracking-widest mb-4 flex items-center gap-2">
            <span class="text-lg">⚖️</span> İlişki Dengesi
          </h4>
          <div class="space-y-4">
            <div>
                <div class="flex justify-between text-[10px] uppercase font-bold text-chic-text mb-1">
                    <span>Güven</span> <span>98%</span>
                </div>
                <div class="w-full bg-white h-2 rounded-full overflow-hidden border border-chic-primary/10">
                    <div class="h-full bg-chic-deep w-[98%]"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-[10px] uppercase font-bold text-chic-text mb-1">
                    <span>İletişim</span> <span>75%</span>
                </div>
                <div class="w-full bg-white h-2 rounded-full overflow-hidden border border-chic-primary/10">
                    <div class="h-full bg-chic-primary w-[75%]"></div>
                </div>
            </div>
          </div>
      </div>

      <!-- KUTU 2 -->
      <div class="bg-white p-5 rounded-xl border-l-4 border-chic-deep shadow-sm">
          <h4 class="text-xs font-bold text-chic-deep uppercase tracking-widest mb-3">Analist Notu</h4>
          <div class="flex gap-3">
             <div class="text-2xl">✒️</div>
             <p class="text-xs text-chic-text leading-relaxed">
                Bu ilişki "karmik" bir derinliğe sahip. Yüzeysel tartışmalar yaşasanız da, bilinçaltı düzeyde birbirinize "ev" hissi veriyorsunuz. Ayrılmak isteseniz bile görünmez bir ip sizi geri çekecek.
             </p>
          </div>
      </div>
  </div>

  <!-- TEXT CONTENT -->
  <div class="prose prose-sm max-w-none text-chic-text text-justify leading-relaxed">
      <h4 class="font-serif text-lg text-chic-deep italic border-b border-chic-primary/20 pb-2 mb-3">Gelecek Projeksiyonu</h4>
      <p>
        Vibrio algoritmaları, 20 yıl sonrasında sizi sessizce anlaşan, birbirinin cümlelerini tamamlayan ve kalabalık ortamlarda bile sadece göz temasıyla iletişim kurabilen bir çift olarak modelliyor. 
      </p>
      <p>
        <strong>Kritik Uyarı:</strong> Mert'in (Oğlak) işkolik yapısı, 40'lı yaşlarda bir krize yol açabilir. Ancak Selin'in (Yengeç) kapsayıcı şefkati bu fırtınayı dindirecek tek liman olacak.
      </p>
  </div>

</div>
`;
