
import { GoogleGenAI, Type } from "@google/genai";
import { VibrioResponse } from "../types";
import { sampleReportContent } from "./sampleData";

export const analyzeRelationship = async (
  text: string,
  userZodiac?: string,
  partnerZodiac?: string,
  relationshipStatus?: string,
  imageFile?: File | null
): Promise<VibrioResponse & { futureImageUrl?: string }> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const systemInstruction = `
    ROL: Sen 'Vibrio' isimli, dünyanın en gelişmiş İlişki ve Karakter Analiz Motorusun. 
    KİŞİLİK: Analitik, elit bir dille konuşan, direkt, Jungiyen psikoloji ve Gottman metodu uzmanı.
    
    ANALİZ HEDEFİ: Kullanıcıya 49 TL ödediğine "değdiğini" hissettirecek kadar derin, sarsıcı ve nokta atışı bir rapor sunmak.
    
    RAPOR İÇERİĞİ (premium_report_content) İÇİN KURALLAR:
    1. HTML/Tailwind CSS kullanarak lüks bir "Klinik Dosya" (Confidential Dossier) tasarımı oluştur.
    2. BÖLÜMLER: 
       - 'Bilinçaltı Dinamikleri': Kullanıcının yazdığı metinden alıntılar yaparak (Örn: "Cümlendeki '...' ifadesi aslında senin falan korkunu yansıtıyor") analiz et.
       - 'Gölge Karakterler': İlişkinin karanlıkta kalan, konuşulmayan kısımlarını (Manipülasyon, pasif-agresiflik vb.) cesurca yaz.
       - 'Kozmik Matris': Burçların sadece güneş burcu değil, element ve nitelik uyumlarını felsefi bir dille anlat.
       - 'Eylem Planı': İlişkiyi dönüştürecek 3 adet elit ve pratik "İletişim Ritüeli" öner.
    3. DİL: Asla "falcı" gibi konuşma. "Veriler şunu gösteriyor", "Psikolojik projeksiyonun sonucu olarak" gibi bilimsel/entelektüel bir ton kullan.
    4. GÖRSEL YAPI: Tablolar, vurgulu bloklar (blockquote) ve grid yapılar kullan.
  `;

  const prompt = `
    KULLANICI METNİ: "${text}"
    ASTROLOJİ: ${userZodiac} (Sen) - ${partnerZodiac} (Partner)
    İLİŞKİ DURUMU: ${relationshipStatus}
    
    ANALİZ BAŞLASIN. Unutma, kullanıcıyı sarsacak kadar gerçekçi ve her kelimesi ona özel olmalı.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 1.0,
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
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
        }
      }
    });

    const data = JSON.parse(response.text || '{}');

    // Görsel Üretimi (Vibrio Style)
    let futureImageUrl = "";
    try {
      const imgRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `A cinematic high-end vertical photography of a couple from a future timeline, soft ambient lighting, emotional depth, 4k resolution. Based on: ${data.free_comment}` }] }],
        config: { imageConfig: { aspectRatio: "9:16" } }
      });
      const part = imgRes.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (part?.inlineData) futureImageUrl = `data:image/png;base64,${part.inlineData.data}`;
    } catch (e) {
      console.warn("Visual generation skipped.");
    }

    return { ...data, futureImageUrl };

  } catch (error) {
    console.error("Critical Engine Failure:", error);
    return {
      vibrio_score: 50,
      free_comment: "Evrensel bir senkronizasyon hatası... Ruhun derinliklerine şu an ulaşılamıyor.",
      metrics: { trust: 50, passion: 50, communication: 50, attachment_style: "Analiz Ediliyor", conflict_style: "Stabilize Ediliyor" },
      premium_report_content: sampleReportContent,
      futureImageUrl: "https://images.unsplash.com/photo-1518199266791-7399a9a3ec58?q=80&w=800"
    };
  }
};
