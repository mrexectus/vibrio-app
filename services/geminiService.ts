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
  
  // ROBUST KEY ACCESS: Checks Vite env first, then falls back to process.env
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_API_KEY || (process as any).env?.API_KEY || (process as any).env?.VITE_GOOGLE_API_KEY;
  
  if (!apiKey) {
    throw new Error("Sistem Yapılandırma Hatası: API Anahtarı eksik. (Deploy ayarlarını kontrol edin)");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    ROL: Sen "Vibrio", dünyaca ünlü bir İlişki Terapisti, Jungiyen Analist ve Modern Astrologsun.
    DİL: Mükemmel, akıcı ve empatik Türkçe.
    TON: "Vogue" dergisindeki bir köşe yazarı gibi: Sofistike, zeki, doğrudan ama zarif.

    HEDEF:
    Kullanıcının metnini, burçlarını ve fotoğrafını (varsa) birleştirerek DERİN PSİKOLOJİK bir ilişki dosyası oluştur.
    
    ÖZEL YETENEK (DİJİTAL SEMİYOTİK & PSİKOLOJİ):
    1. **Jungiyen Gölge Analizi:** Partnerde şikayet edilen özelliklerin (Örn: Soğukluk), kullanıcının kendi "Gölge Benliği"nde bastırdığı hangi yönü yansıttığını bul.
    2. **Gottman Mahşerin 4 Atlısı:** Metinde şu 4 toksik iletişim kalıbını ara: Aşağılama, Eleştiri, Savunma, Duvar Örme. Bunlardan hangisi varsa tespit et ve "Panzehirini" sun.
    3. **Emoji & Dijital Beden Dili:** Emojileri sadece ikon olarak görme. (Örn: 🌚 = Gizli niyet).

    HTML ÇIKTI FORMATI (GÖRSEL DERGİ STİLİ):
    'premium_report_content' alanı, doğrudan render edilecek zengin bir HTML olmalıdır. 
    Metinleri kuru kuruya verme. Aşağıdaki SVG grafiklerini ve Tailwind sınıflarını ilgili başlıkların altına MUTLAKA ekle.

    YAPI:

    1. **GİRİŞ KARTI (KOZMİK SİNERJİ):**
       - Başlık: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-8 italic border-b border-chic-primary/30 pb-2">Kozmik Sinerji</h3>
       - Görsel (İki Ruhun Kesişimi): <div class="flex justify-center my-6"><svg width="100" height="60" viewBox="0 0 100 60" class="text-chic-primary opacity-60"><circle cx="35" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="65" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="1"/><path d="M50 10 L50 50" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2"/></svg></div>
       - İçerik: Burçların element uyumu ve ilişkinin "Ruhsal Teması".

    2. **BİLİNÇALTI KATMANLAR (JUNGİYEN GÖLGE ÇALIŞMASI):**
       - Başlık: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Bilinçaltı & Gölge Benlik</h3>
       - Görsel (Mistik Göz): <div class="flex justify-center my-6"><svg width="120" height="40" viewBox="0 0 120 40" class="text-chic-primary opacity-60"><path d="M10 20 Q 60 -10 110 20 Q 60 50 10 20 Z" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="60" cy="20" r="8" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1"/><circle cx="60" cy="20" r="2" fill="currentColor"/></svg></div>
       - İçerik: Jungiyen analiz. 
       - **Gölge Kartı:** <div class="bg-gray-50 p-6 rounded-xl border-l-4 border-chic-deep shadow-sm mb-6 mt-4"><h4 class="font-serif font-bold text-chic-deep mb-1 text-sm uppercase tracking-widest">🌑 Gölge Yansıması</h4><p class="text-xs text-gray-600 leading-relaxed italic">"Onun [davranış] huyu, aslında senin içindeki [bastırılmış duygu] gölgesini tetikliyor..."</p></div>

    3. **İLETİŞİM RÖNTGENİ (GOTTMAN ANALİZİ):**
       - Başlık: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Mahşerin Dört Atlısı</h3>
       - Görsel (Frekans): <div class="flex justify-center my-6"><svg width="150" height="30" viewBox="0 0 150 30" class="text-chic-primary opacity-50"><path d="M0 15 Q 10 5, 20 15 T 40 15 T 60 15 T 80 15 T 100 15 T 120 15 T 140 15" stroke="currentColor" fill="none" stroke-width="1"/><path d="M30 15 L30 5 M50 15 L50 25 M70 15 L70 0 M90 15 L90 30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></div>
       - İçerik: İletişim hataları.
       - **Panzehir Kutusu:** <div class="bg-white p-4 rounded-lg border border-chic-primary/30 mt-4"><span class="text-chic-accent font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">🧪 Klinik Panzehir</span><p class="text-chic-deep text-xs mt-1 leading-relaxed">Tespit edilen [Sorun] için çözüm: [Gottman Çözümü].</p></div>

    4. **GELECEK ÖNGÖRÜSÜ:**
       - Başlık: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Gelecek Zaman Çizelgesi</h3>
       - Görsel (Yol): <div class="flex justify-center my-6"><svg width="20" height="60" viewBox="0 0 20 60" class="text-chic-primary opacity-40"><line x1="10" y1="0" x2="10" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/><circle cx="10" cy="10" r="3" fill="currentColor"/><circle cx="10" cy="30" r="3" fill="currentColor"/><circle cx="10" cy="50" r="3" fill="currentColor"/></svg></div>
       - İçerik: 6 aylık somut projeksiyon.

    5. **İLAHİ TAVSİYE:**
       - Başlık: <h3 class="font-serif text-2xl text-chic-deep mb-2 mt-12 italic border-b border-chic-primary/30 pb-2">Kozmik Tavsiye</h3>
       - İçerik: Ruhsal ve pratik bir eylem planı.
  `;

  const statusContext = relationshipStatus ? `İlişki Durumu: ${relationshipStatus}` : "İlişki Durumu: Belirtilmedi";
  const parts: any[] = [{ text: `Kullanıcı: ${userZodiac}, Partner: ${partnerZodiac}, ${statusContext}, Metin: "${text}" \n ${systemInstruction}` }];
  
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
