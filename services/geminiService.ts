
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
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        const base64Data = dataUrl.split(',')[1];
        resolve(base64Data);
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
    future_visual_description: { type: Type.STRING, description: "Detailed physical visual prompt description of the couple 20 years later for image generation. Include atmosphere, lighting, and physical aging details. If no image provided, describe a metaphorical representation." },
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
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Rol: "Vibrio" İlişki Analisti.
    Görev: Metin/Görsel analizi.
    
    Kurallar:
    1. DERİNLİK: Jungiyen ve Gottman terimleriyle akademik derinlikte yaz.
    2. HTML: 'premium_report_content' şık HTML olmalı (<h3 class="text-xl font-serif text-chic-deep mt-4 mb-2"></h3>, <p></p>).
    3. İÇERİK: Bilinçaltı, Manipülasyon, 20 Yıl Sonraki Gelecek.
    4. GÖRSEL PROMPT: 'future_visual_description' alanına, çiftin 20 yıl sonraki halini çizecek bir yapay zeka (midjourney/dall-e tarzı) için İngilizce prompt yaz.
    4. NETLİK: Gereksiz uzatma, yoğun ve çarpıcı ol.
  `;

  const statusContext = relationshipStatus ? `İlişki: ${relationshipStatus}` : "";
  const promptText = `Ben: ${userZodiac || "?"}, O: ${partnerZodiac || "?"}. ${statusContext}. Not: "${text}"`;

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
    jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    let errorMsg = "Analiz hatası.";
    if (error.message && (error.message.includes("API key") || error.message.includes("403"))) {
        errorMsg = "API Anahtarı hatası.";
    }
    throw new Error(errorMsg);
  }
};

export const generateImageProjection = async (
  description: string,
  imageFile?: File | null
): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const parts: any[] = [];

  // Gelişmiş prompt mühendisliği
  const prompt = `Create a photorealistic, cinematic shot of the couple described below, set 20 years in the future.
  The image should look like a high-end photograph taken with a Leica camera, 85mm lens, f/1.4 aperture.
  Style: Realistic, slightly nostalgic but sharp 8K details, cinematic lighting.
  Subject Description: ${description}
  Mood: Emotional, deep connection, mature love.`;

  if (imageFile) {
    try {
      const base64Data = await compressImage(imageFile);
      // Image-to-Image: Kaynak resmi kullan
      parts.push({ inlineData: { mimeType: 'image/jpeg', data: base64Data } });
      // Yüz koruma komutunu güçlendirdik
      parts.push({ text: prompt + " CRITICAL INSTRUCTION: You MUST use the people in the provided image as the source. Preserve their facial identity, ethnicity, and unique features strictly, but age them naturally by 20 years. Keep the composition similar but update the environment to be more mature." });
    } catch (e) {
      parts.push({ text: prompt });
    }
  } else {
    // Text-to-Image
    parts.push({ text: prompt });
  }

  try {
    // Görsel üretimi için Gemini 2.5 Flash Image kullanımı
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        // En-boy oranını UI'daki çerçeveye (4:3) uyacak şekilde ayarlıyoruz.
        imageConfig: { aspectRatio: '4:3' }
      }
    });

    // Yanıtın içinde resim verisi arama
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null; 
  }
};
