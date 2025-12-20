
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { VibrioResponse } from "../types";
import { sampleReportContent } from "./sampleData";

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
          resolve(canvas.toDataURL('image/jpeg', 0.7).split(',')[1]);
        } else reject(new Error("Canvas context failed"));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const analyzeRelationship = async (
  text: string,
  userZodiac?: string,
  partnerZodiac?: string,
  relationshipStatus?: string,
  imageFile?: File | null
): Promise<VibrioResponse & { futureImageUrl?: string }> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  // 1. ANALYSIS STEP (Gemini 3 Pro with Thinking)
  const reportSystemInstruction = `
    ROL: Sen "Vibrio" isimli elit bir İlişki Analistisin. Jungiyen Psikoloji, Gottman Metodu ve Astroloji uzmanısın.
    GÖREV: Kullanıcının girdiği verileri analiz et ve JSON formatında bir rapor döndür. 
    İÇERİK: "premium_report_content" alanı, Tailwind CSS ile tasarlanmış, büyüleyici ve profesyonel bir HTML raporu olmalıdır.
    TOOL: Güncel ilişki trendleri ve toksisite belirtileri için googleSearch kullanabilirsin.
  `;

  const statusContext = relationshipStatus ? `İlişki Durumu: ${relationshipStatus}` : "";
  const analysisPrompt = `Danışan: (${userZodiac}), Partner: (${partnerZodiac}). ${statusContext}. Not: "${text}"`;

  try {
    const analysisResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: analysisPrompt }] }],
      config: {
        systemInstruction: reportSystemInstruction,
        thinkingConfig: { thinkingBudget: 4000 },
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
        },
        tools: [{ googleSearch: {} }]
      },
    });

    const reportData = JSON.parse(analysisResponse.text || '{}');

    // 2. IMAGE GENERATION STEP (Future Projection)
    let futureImageUrl = "";
    try {
      const imagePrompt = `A hyper-realistic cinematic portrait of a couple in their 50s, looking happy and wise, 20 years from now. Minimalist, ethereal lighting, high-end photography style. Based on a relationship with vibes: ${reportData.free_comment}`;
      
      const imageParts: any[] = [{ text: imagePrompt }];
      if (imageFile) {
        const base64 = await compressImage(imageFile);
        imageParts.push({ inlineData: { data: base64, mimeType: 'image/jpeg' } });
      }

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: imageParts }],
        config: {
          imageConfig: { aspectRatio: "4:3" }
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          futureImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imgErr) {
      console.warn("Future projection image failed:", imgErr);
    }

    return { ...reportData, futureImageUrl };

  } catch (error: any) {
    console.error("Vibrio Engine Error:", error);
    // Fallback to sample for demo purposes
    return {
      vibrio_score: 75,
      free_comment: "Sistem yoğunluğu nedeniyle demo modunda analiz yapıldı.",
      metrics: { trust: 70, passion: 80, communication: 60, attachment_style: "Güvenli", conflict_style: "Dengeli" },
      premium_report_content: sampleReportContent,
      futureImageUrl: "https://images.unsplash.com/photo-1526662097318-6c0b39f4007f?q=80&w=600&auto=format&fit=crop"
    };
  }
};
