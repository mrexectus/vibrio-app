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
  
  // Use process.env.API_KEY exclusively as per @google/genai guidelines.
  // This relies on the build system (Vite) to replace process.env.API_KEY with the actual key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    ROL: Sen "Vibrio", dünyaca ünlü bir Klinik Psikolog, İlişki Terapisti ve Jungiyen Analistsin.
    
    GÖREV: Kullanıcının sağladığı metni ve varsa görseli analiz ederek ona hayatının en detaylı, en çarpıcı ilişki raporunu sunmalısın. Üstün körü cevaplar VERME.
    
    KURALLAR:
    1. **DERİNLİK:** Cevapların uzun, tatmin edici ve akademik derinlikte olmalı. Her başlık altında en az 150-200 kelime kullan.
    2. **TON:** "Magazin astroloğu" gibi değil, "Ruh Bilimci" gibi konuş. Ciddi, hafif gizemli, profesyonel ve etkileyici.
    3. **ANALİZ YAPISI:**
       - **Bilinçaltı Kodları (Jungiyen Gölge):** Partnerin söylemediği ama hissettiği şeyleri analiz et.
       - **Manipülasyon Taraması (Gottman Metodu):** İlişkide 'Mahşerin Dört Atlısı' (Eleştiri, Savunma, Aşağılama, Duvar Örme) var mı? Gaslighting veya love bombing var mı? Varsa ifşa et.
       - **Gelecek Projeksiyonu:** Bu ilişkinin 6 ay, 1 yıl ve 5 yıl sonrasını net bir dille simüle et.
    
    ÇIKTI FORMATI (HTML):
    'premium_report_content' alanı, zengin ve şık bir HTML olmalıdır.
    - Başlıklar için: <h3 class="font-serif text-2xl text-chic-deep mb-4 mt-8 italic border-b border-chic-primary/30 pb-2">Başlık</h3>
    - Paragraflar: Uzun ve detaylı olmalı.
    - Vurgular için: <strong class="text-chic-accent font-medium">Vurgu</strong>
    - Kutu İçerikleri (Örn: Tehlike Sinyali): <div class="bg-red-50 p-6 border-l-4 border-red-300 my-6 text-gray-700 italic rounded-r-lg">İçerik</div>

    ÖZEL İSTEK (GÖRSEL TASVİR):
    'future_visual_description' alanına; bu çiftin 20 yıl sonra fiziksel olarak nasıl görüneceğini, yüz hatlarının nasıl değişeceğini, yanlarında çocukları varsa kime benzeyeceğini edebi bir dille tasvir et. Bu metin kullanıcıya görselin "açıklaması" olarak sunulacak.
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
    // Robust Markdown Cleanup
    jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    let errorMsg = "Analiz sırasında teknik bir hata oluştu. Lütfen tekrar deneyin.";
    if (error.message && (error.message.includes("API key") || error.message.includes("403"))) {
        errorMsg = "Sistem Hatası: API Anahtarı doğrulanamadı. Lütfen .env dosyasında VITE_GOOGLE_API_KEY tanımlı olduğundan emin olun.";
    }
    throw new Error(errorMsg);
  }
};