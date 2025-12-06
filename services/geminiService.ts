import { GoogleGenAI, Schema, Type } from "@google/genai";
import { VibrioResponse } from "../types";

const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    vibrio_score: { type: Type.INTEGER },
    free_comment: { type: Type.STRING },
    metrics: {
      type: Type.OBJECT,
      properties: {
        trust: { type: Type.INTEGER },
        passion: { type: Type.INTEGER },
        communication: { type: Type.INTEGER },
        attachment_style: { type: Type.STRING },
        conflict_style: { type: Type.STRING },
      },
      required: ["trust", "passion", "communication", "attachment_style", "conflict_style"],
    },
    future_visual_description: { type: Type.STRING, description: "A detailed physical description of the couple in 20 years or their potential child, for image generation context." },
    premium_report_content: { type: Type.STRING },
  },
  required: ["vibrio_score", "free_comment", "metrics", "premium_report_content"],
};

export const analyzeRelationship = async (
  text: string,
  userZodiac?: string,
  partnerZodiac?: string,
  relationshipStatus?: string, 
  imageFile?: File | null
): Promise<VibrioResponse> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    ROL: Sen "Vibrio", dünyaca ünlü bir Klinik Psikolog, İlişki Terapisti ve Jungiyen Analistsin.
    DİL: Akademik derinliği olan ancak anlaşılır, akıcı ve empatik Türkçe.
    TON: Ciddi, otoriter ama şefkatli. Asla yüzeysel veya "magazin ağzı" ile konuşma. Derin analiz yap.

    HEDEF:
    Kullanıcının verilerini analiz et ve ona hayatını değiştirecek derinlikte bir "Psikolojik İlişki Dosyası" sun.
    Cevapların UZUN, DETAYLI ve DOYURUCU olmalı. Kısa cümlelerden kaçın. Her başlık altına en az 2-3 dolu paragraf yaz.

    ÖZEL YETENEK (DİJİTAL SEMİYOTİK & PSİKOLOJİ):
    1. **Jungiyen Gölge Analizi:** Partnerin rahatsız edici davranışlarını, kullanıcının bastırılmış bilinçaltı (Shadow Self) ile ilişkilendir.
    2. **Gottman Metodu:** İletişimdeki "Mahşerin 4 Atlısı"nı (Aşağılama, Eleştiri, Savunma, Duvar Örme) tespit et ve akademik çözüm öner.
    3. **Gelecek Projeksiyonu:** Eğer görsel varsa, çiftin fiziksel ve enerjetik olarak 20 yıl sonra nasıl görüneceğini veya çocuklarının kime benzeyeceğini hayal et (future_visual_description alanına yaz).

    HTML ÇIKTI FORMATI (PREMIUM REPORT):
    'premium_report_content' alanı, zengin bir HTML olmalıdır. Sadece metin değil, stil sahibi bir dergi sayfası gibi görünmelidir.

    YAPI VE İÇERİK KURALLARI:

    1. **GİRİŞ KARTI (KOZMİK SİNERJİ):**
       - Burçların element uyumunu ve ilişkinin "Ruhsal Teması"nı detaylıca anlat.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-8 italic border-b border-chic-primary/30 pb-2">Kozmik Sinerji</h3>...

    2. **BİLİNÇALTI KATMANLAR (JUNGİYEN GÖLGE ÇALIŞMASI):**
       - Jungiyen analiz yap. Kullanıcının partnerinde gördüğü "kusur" aslında kendi içinde neyi temsil ediyor?
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Bilinçaltı & Gölge Benlik</h3>...
       - **Gölge Kartı:** <div class="bg-gray-50 p-6 rounded-xl border-l-4 border-chic-deep shadow-sm mb-6 mt-4"><h4 class="font-serif font-bold text-chic-deep mb-1 text-sm uppercase tracking-widest">🌑 Gölge Yansıması</h4><p class="text-sm text-gray-700 leading-relaxed italic">"[Buraya çok çarpıcı ve derin bir psikolojik tespit yaz]"</p></div>

    3. **İLETİŞİM RÖNTGENİ (GOTTMAN ANALİZİ):**
       - İlişkideki toksik döngüyü açıkla.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Mahşerin Dört Atlısı & Panzehir</h3>...
       - **Panzehir Kutusu:** <div class="bg-white p-6 rounded-lg border border-chic-primary/30 mt-4 shadow-sm"><span class="text-chic-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2">🧪 Klinik Reçete</span><p class="text-chic-deep text-sm mt-2 leading-relaxed font-medium">[Buraya Gottman terapisinden somut, uygulanabilir bir ödev ver.]</p></div>

    4. **GELECEK ZAMAN ÇİZELGESİ (6-12 AY):**
       - Önümüzdeki 6 ay içinde yaşanacak muhtemel krizleri ve dönüm noktalarını ay ay anlat.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Gelecek Zaman Çizelgesi</h3>...

    LÜTFEN DİKKAT: Üstünkörü, kısa veya genel geçer cümleler kurma. Kullanıcı bu rapora para ödediğini hissetmeli. Cümlelerin vurucu ve bilgece olsun.
  `;

  const userZodiacStr = userZodiac || "Belirtilmedi";
  const partnerZodiacStr = partnerZodiac || "Belirtilmedi";
  const relationshipStatusStr = relationshipStatus || "Belirtilmedi";

  const statusContext = `İlişki Durumu: ${relationshipStatusStr}`;
  const parts: any[] = [{ text: `Kullanıcı: ${userZodiacStr}, Partner: ${partnerZodiacStr}, ${statusContext}, Metin: "${text}" \n ${systemInstruction}` }];
  
  if (imageFile) {
    const base64Data = await fileToGenerativePart(imageFile);
    parts.unshift({ inlineData: { mimeType: imageFile.type, data: base64Data } });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: { responseMimeType: "application/json", responseSchema: responseSchema },
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error(error);
    throw new Error("Analiz sırasında kozmik bir parazit oluştu. Lütfen tekrar deneyin.");
  }
};