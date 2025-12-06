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
    future_visual_description: { type: Type.STRING, description: "A highly detailed, 50-word physical description of the couple 20 years later or their future child. Vivid imagery." },
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
  
  // Robust check for API Key
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin veya Vercel ayarlarından API_KEY ekleyin.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const systemInstruction = `
    ROL: Sen "Vibrio", dünyaca ünlü bir Klinik Psikolog, İlişki Terapisti ve Jungiyen Analistsin.
    
    GÖREV: Kullanıcının sağladığı metni ve varsa görseli analiz ederek ona hayatının en detaylı, en çarpıcı ilişki raporunu sunmalısın.
    
    KURALLAR:
    1. **DERİNLİK:** Asla kısa, geçiştirme veya klişe cümleler kurma. Her bir başlık için en az 2-3 uzun paragraf yaz.
    2. **TON:** Akademik, ciddi, hafif gizemli ama son derece profesyonel. "Magazin astroloğu" gibi değil, "Ruh Bilimci" gibi konuş.
    3. **ANALİZ YAPISI:**
       - **Bilinçaltı Kodları:** Partnerin söylemediği ama hissettiği şeyleri "Jungiyen Gölge" teorisiyle açıkla.
       - **Manipülasyon Taraması:** İlişkide gaslighting, love bombing veya breadcrumbing var mı? Varsa akademik terimlerle ifşa et.
       - **Gelecek Projeksiyonu:** Bu ilişkinin 6 ay, 1 yıl ve 5 yıl sonrasını net bir dille simüle et.
    
    ÇIKTI FORMATI (HTML):
    'premium_report_content' alanı, zengin ve şık bir HTML olmalıdır.
    - Başlıklar için: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">Başlık</h3>
    - Vurgular için: <strong class="text-chic-accent font-medium">Vurgu</strong>
    - Kutu İçerikleri (Örn: Tehlike Sinyali): <div class="bg-red-50 p-4 border-l-4 border-red-300 my-4 text-sm italic text-gray-700">İçerik</div>

    ÖZEL İSTEK (GÖRSEL TASVİR):
    'future_visual_description' alanına; bu çiftin 20 yıl sonra fiziksel olarak nasıl görüneceğini, yüz hatlarının nasıl değişeceğini, yanlarında çocukları varsa kime benzeyeceğini edebi bir dille tasvir et. Bu metin kullanıcıya "Sneak Peek" olarak sunulacak.
  `;

  const userZodiacStr = userZodiac || "Belirtilmedi";
  const partnerZodiacStr = partnerZodiac || "Belirtilmedi";
  const relationshipStatusStr = relationshipStatus || "Belirtilmedi";

  const statusContext = `İlişki Durumu: ${relationshipStatusStr}`;
  const promptText = `Kullanıcı Burcu: ${userZodiacStr}, Partner Burcu: ${partnerZodiacStr}, ${statusContext}. \nKullanıcı Notu: "${text}"`;

  const parts: any[] = [{ text: promptText }];
  
  if (imageFile) {
    const base64Data = await fileToGenerativePart(imageFile);
    parts.unshift({ inlineData: { mimeType: imageFile.type, data: base64Data } });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: { 
        systemInstruction: systemInstruction,
        responseMimeType: "application/json", 
        responseSchema: responseSchema 
      },
    });

    let jsonString = response.text || '{}';
    // Clean Markdown
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    return JSON.parse(jsonString);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    let errorMsg = "Analiz sırasında teknik bir hata oluştu. Lütfen tekrar deneyin.";
    if (error.message && (error.message.includes("API key") || error.message.includes("403"))) {
        errorMsg = "Sistem Hatası: API Anahtarı doğrulanamadı. (Lütfen .env dosyasını kontrol edin)";
    }
    throw new Error(errorMsg);
  }
};