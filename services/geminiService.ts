
import { GoogleGenAI, Schema, Type } from "@google/genai";
import { VibrioResponse } from "../types";

// Optimize Image: Resize large images to max 800px width before sending to API
// This drastically reduces upload time and API processing time.
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
        
        // If image is small enough, use original dimensions
        const width = scaleSize < 1 ? MAX_WIDTH : img.width;
        const height = scaleSize < 1 ? img.height * scaleSize : img.height;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality
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
    future_visual_description: { type: Type.STRING, description: "Physical description of couple 20 years later." },
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

  // Optimized System Instruction for Speed + Depth
  const systemInstruction = `
    Rol: "Vibrio" İlişki Analisti.
    Görev: Metin/Görsel analizi.
    
    Kurallar:
    1. DERİNLİK: Jungiyen ve Gottman terimleriyle akademik derinlikte yaz.
    2. HTML: 'premium_report_content' şık HTML olmalı (<h3 class="text-xl font-serif text-chic-deep mt-4 mb-2"></h3>, <p></p>).
    3. İÇERİK: Bilinçaltı, Manipülasyon, 20 Yıl Sonraki Gelecek.
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
