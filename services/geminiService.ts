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
  
  // Ensure API Key exists
  if (!process.env.API_KEY) {
    throw new Error("API Anahtarı bulunamadı. Lütfen sistem yöneticisi ile iletişime geçin.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    ROL: Sen "Vibrio", dünyaca ünlü bir Klinik Psikolog, İlişki Terapisti ve Jungiyen Analistsin.
    DİL: Akademik derinliği olan ancak anlaşılır, akıcı ve empatik Türkçe.
    TON: Ciddi, otoriter ama şefkatli. Asla yüzeysel veya "magazin ağzı" ile konuşma. 
    
    ÇOK ÖNEMLİ: Cevapların "üstün körü" olmamalı. Kullanıcı bir uzman raporu okuduğunu hissetmeli.
    Her başlık altına EN AZ 200 KELİMELİK, derinlemesine analizler yaz.

    HEDEF:
    Kullanıcının verilerini analiz et ve ona hayatını değiştirecek derinlikte bir "Psikolojik İlişki Dosyası" sun.

    ÖZEL YETENEK (DİJİTAL SEMİYOTİK & PSİKOLOJİ):
    1. **Jungiyen Gölge Analizi:** Partnerin davranışlarını, "Gölge Benlik" (Shadow Self) teorisi üzerinden açıkla.
    2. **Gottman Metodu:** İletişimdeki "Mahşerin 4 Atlısı"nı tespit et ve akademik çözüm öner.
    3. **Gelecek Projeksiyonu:** Çiftin 20 yıl sonraki fiziksel hallerini ve auralarını veya çocuklarının kime benzeyeceğini 'future_visual_description' alanında detaylıca tasvir et (bu alan görsel oluşturma prompt'u olacak).

    HTML ÇIKTI FORMATI (PREMIUM REPORT):
    'premium_report_content' alanı, zengin bir HTML olmalıdır. Stil sahibi bir dergi sayfası gibi görünmelidir.

    YAPI VE İÇERİK KURALLARI:

    1. **GİRİŞ KARTI (KOZMİK SİNERJİ):**
       - Burçların element uyumunu ve ilişkinin "Ruhsal Teması"nı detaylıca anlat.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">Kozmik Sinerji & Ruhsal Tema</h3>...

    2. **BİLİNÇALTI KATMANLAR (DERİN PSİKOLOJİ):**
       - Yüzeysel davranışların altındaki kök nedenleri (çocukluk travmaları, bağlanma stilleri) analiz et.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-12 italic border-b border-chic-primary/30 pb-2">Bilinçaltı & Gölge Benlik</h3>...
       - **Gölge Kartı:** <div class="bg-gray-50 p-6 rounded-xl border-l-4 border-chic-deep shadow-sm mb-6 mt-4"><h4 class="font-serif font-bold text-chic-deep mb-2 text-sm uppercase tracking-widest">🌑 Gölge Yansıması</h4><p class="text-sm text-gray-700 leading-relaxed italic">"[Buraya çok çarpıcı ve derin bir psikolojik tespit yaz]"</p></div>

    3. **KLİNİK ÇÖZÜMLEME (GOTTMAN & FREUD):**
       - Toksik döngüyü kırmak için reçete ver.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-12 italic border-b border-chic-primary/30 pb-2">Klinik Teşhis & Reçete</h3>...

    4. **GELECEK SİMÜLASYONU (6-12 AY):**
       - Önümüzdeki 6-12 ay içinde yaşanacak muhtemel krizleri ve dönüm noktalarını ay ay anlat.
       - HTML: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-12 italic border-b border-chic-primary/30 pb-2">Gelecek Zaman Çizelgesi</h3>...

    LÜTFEN DİKKAT: Cümlelerin vurucu ve bilgece olsun. Kullanıcıya "Bunu nasıl bildi?" dedirtmelisin.
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

    let jsonString = response.text || '{}';
    // Clean Markdown if present (fixes the crashing issue)
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return JSON.parse(jsonString);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    let errorMsg = "Analiz sırasında teknik bir hata oluştu.";
    if (error.message && error.message.includes("API key")) {
        errorMsg = "API Anahtarı hatası. Lütfen sistem yapılandırmasını kontrol edin.";
    }
    throw new Error(errorMsg);
  }
};