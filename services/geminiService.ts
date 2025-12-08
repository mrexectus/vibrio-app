
import { GoogleGenAI, Schema, Type } from "@google/genai";
import { VibrioResponse } from "../types";

// Optimize Image: Resize large images to max 800px width before sending to API
const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        
        const width = scaleSize < 1 ? MAX_WIDTH : img.width;
        const height = scaleSize < 1 ? img.height * scaleSize : img.height;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            const base64Data = dataUrl.split(',')[1];
            resolve(base64Data);
        } else {
            reject(new Error("Canvas context failed"));
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
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
    future_visual_description: { type: Type.STRING, description: "Detailed physical visual prompt description of the couple 20 years later." },
    premium_report_content: { type: Type.STRING },
  },
  required: ["vibrio_score", "free_comment", "metrics", "premium_report_content", "future_visual_description"],
};

export const analyzeRelationship = async (
  text: string,
  userZodiac?: string,
  partnerZodiac?: string,
  relationshipStatus?: string, 
  imageFile?: File | null
): Promise<VibrioResponse> => {
  
  // 1. API Key Check
  if (!process.env.API_KEY) {
    throw new Error("API Anahtarı eksik. Lütfen .env dosyasını kontrol edin.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Rol: "Vibrio" İlişki Analisti.
    Görev: Metin/Görsel analizi.
    Dil: Türkçe.
    
    Kurallar:
    1. DERİNLİK: Jungiyen ve Gottman terimleriyle akademik derinlikte yaz.
    2. HTML FORMATI: 'premium_report_content' alanı SADECE HTML string içermelidir. Başlıklar için <h3 class="text-xl font-serif text-chic-deep mt-4 mb-2"></h3>, paragraflar için <p class="mb-2"></p> kullan.
    3. İÇERİK: Bilinçaltı, Manipülasyon, 20 Yıl Sonraki Gelecek başlıklarını kesinlikle içermeli.
    4. JSON: Yanıt SADECE geçerli bir JSON objesi olmalıdır. Markdown (json \`\`\`) kullanma.
  `;

  const statusContext = relationshipStatus ? `İlişki: ${relationshipStatus}` : "";
  const promptText = `Ben: ${userZodiac || "?"}, O: ${partnerZodiac || "?"}. ${statusContext}. Kullanıcı Notu: "${text}"`;

  const parts: any[] = [{ text: promptText }];
  
  if (imageFile) {
    try {
        const base64Data = await compressImage(imageFile);
        parts.unshift({ inlineData: { mimeType: 'image/jpeg', data: base64Data } });
    } catch (e) {
        console.error("Image compression failed", e);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: { 
        systemInstruction: systemInstruction,
        responseMimeType: "application/json", 
        responseSchema: responseSchema,
      },
    });

    let jsonString = response.text || '{}';
    
    // Robust cleanup
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Sometimes models add text before/after the JSON
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
        jsonString = jsonString.substring(firstBrace, lastBrace + 1);
    }

    try {
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError, "Raw String:", jsonString);
        throw new Error("Veri formatı işlenemedi. Lütfen tekrar deneyin.");
    }

  } catch (error: any) {
    console.error("Gemini Critical Error:", error);
    let errorMsg = "Analiz sırasında bir hata oluştu.";
    
    if (error.message) {
        if (error.message.includes("API key")) errorMsg = "API Anahtarı geçersiz.";
        else if (error.message.includes("403")) errorMsg = "Erişim izni yok (403). Location ayarlarını kontrol edin.";
        else if (error.message.includes("503")) errorMsg = "Servis şu an yoğun, lütfen tekrar deneyin.";
        else errorMsg = `Hata: ${error.message}`;
    }
    
    throw new Error(errorMsg);
  }
};

export const generateImageProjection = async (
  description: string,
  imageFile?: File | null
): Promise<string | null> => {
  if (!process.env.API_KEY) return null;
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const parts: any[] = [];

  const prompt = `Cinematic portrait, 20 years later envisioning: ${description}. Photorealistic, 8k, highly detailed.`;

  if (imageFile) {
    try {
      const base64Data = await compressImage(imageFile);
      parts.push({ inlineData: { mimeType: 'image/jpeg', data: base64Data } });
      parts.push({ text: prompt + " Preserve facial identity strictly but age them 20 years." });
    } catch (e) {
      parts.push({ text: prompt });
    }
  } else {
    parts.push({ text: prompt });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Fallback to flash-image as it is more stable for general users without paid plans setup
      contents: { parts },
      config: {
        imageConfig: { aspectRatio: '4:3' }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.warn("Image Gen Error (Ignorable):", error);
    return null; 
  }
};
