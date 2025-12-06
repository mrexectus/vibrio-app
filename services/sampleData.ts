
export const sampleReportContent = `
<div class="space-y-8">
  
  <!-- VISUAL PROJECTION SHOWCASE -->
  <div class="bg-white p-4 rounded-2xl border border-chic-primary/20 shadow-sm">
     <h3 class="font-serif text-lg text-chic-deep mb-4 flex items-center gap-2">
        <span>📸</span> <span class="italic">Gelecek Simülasyonu (Vibrio AI Vision)</span>
     </h3>
     
     <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Current -->
        <div class="space-y-2">
            <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover opacity-80" alt="Current Couple">
                <span class="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">Bugün</span>
            </div>
        </div>

        <!-- 20 Years Later -->
        <div class="space-y-2">
            <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 relative border-2 border-chic-primary/50">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover sepia-[.3]" alt="Older Couple">
                <span class="absolute bottom-2 left-2 bg-chic-primary text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">20 Yıl Sonra</span>
            </div>
            <p class="text-[9px] text-chic-text/70 leading-tight">Yüz hatlarındaki çizgiler ve gülümseme simetrisi korunarak yaşlandırıldı.</p>
        </div>

        <!-- Future Child -->
        <div class="hidden md:block space-y-2">
            <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover grayscale-[0.2]" alt="Future Child">
                <span class="absolute bottom-2 left-2 bg-chic-secondary text-chic-deep text-[9px] px-2 py-1 rounded-full uppercase tracking-widest font-bold">Tahmini Çocuk</span>
            </div>
            <p class="text-[9px] text-chic-text/70 leading-tight">Genetik baskınlık analizine göre muhtemel çocuk profili.</p>
        </div>
     </div>
  </div>

  <div class="bg-chic-bg/50 p-6 rounded-xl border border-chic-primary/20">
    <h3 class="font-serif text-xl text-chic-deep mb-2">Analiz Özeti: Selin (Yengeç) & Mert (Oğlak)</h3>
    <p class="text-sm italic text-chic-text/80">"Zıt kutupların klasik çekimi. Biri evin sıcaklığı, diğeri dağın zirvesi. Birbirinizi tamamlamak için dizayn edilmişsiniz, ancak aynı dili konuşmayı öğrenmeniz şart."</p>
  </div>

  <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">1. Bilinçaltı & Gölge Benlik</h3>
  <p class="mb-4">
    Selin, senin Yengeç doğan "güvende hissetme" ihtiyacını haykırırken, Mert'in Oğlak yapısı "saygı görme ve başarma" odaklı. Bilinçaltı seviyesinde, Selin olarak Mert'in iş kolik ya da mesafeli hallerini <strong class="text-chic-accent font-medium">"beni sevmiyor"</strong> olarak kodluyorsun. Oysa Mert için bu mesafe, ilişkiyi (kaleyi) korumak için surları sağlamlaştırma çabası.
  </p>
  <p class="mb-4">
    Gölge tarafınızda ise tehlikeli bir dans var: Mert duygularını bastırdıkça (Repression), sen daha fazla duygusal talepkarlıkla (Clinginess) üzerine gidiyorsun. Bu durum Mert'i "boğulma" hissine, seni ise "terk edilme" anksiyetesine sürüklüyor.
  </p>

  <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">2. Mahşerin Dört Atlısı (Gottman Analizi)</h3>
  <div class="bg-red-50 p-6 border-l-4 border-red-300 my-6 text-gray-700 italic rounded-r-lg">
    <strong>Tespit Edilen Risk: Duvar Örme (Stonewalling)</strong><br/>
    Mert, çatışma anlarında fiziksel veya zihinsel olarak ortamdan kopuyor. Sen bunu ilgisizlik sanıyorsun ama aslında biyolojik bir "taşma" (flooding) yaşıyor. Nabzı 100'ün üzerine çıkıyor ve sakinleşmek için kabuğuna çekiliyor.
  </div>
  
  <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">3. Gelecek Simülasyonu</h3>
  
  <h4 class="font-bold text-chic-deep mt-4">6 Ay Sonra</h4>
  <p class="mb-2">İlişki bir "güç savaşı" dönemine girebilir. Eğer iletişim dilini değiştirmezseniz, soğuk savaş (sessiz günler) artacak.</p>
  
  <h4 class="font-bold text-chic-deep mt-4">1 Yıl Sonra</h4>
  <p class="mb-2">Kritik viraj. Eğer Mert duygusal açılım yapmayı öğrenirse, bu zıtlık muazzam bir "İnşa Dönemine" dönüşecek. Birlikte ev alma, iş kurma veya statü atlama potansiyeliniz çok yüksek.</p>

  <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">4. Klinik Panzehir</h3>
  <p>
    Selin, tartışma başlarken "Yumuşak Başlangıç" yapmalısın. "Sen" yerine "Ben hissediyorum" dilini kullan. Mert, senin görevin ise "Onarma Girişimi". Tartışma kilitlendiğinde "Şu an bunaldım, 20 dakika mola verelim ama geri döneceğim" demen, Selin'in anksiyetesini bitirecektir.
  </p>
</div>
`;
