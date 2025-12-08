import { GoogleGenAI, Schema, Type } from "@google/genai";
import { VibrioResponse } from "../types";
import { sampleReportContent } from "./sampleData";

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
  
  // 1. API Key Check
  if (!process.env.API_KEY) {
    throw new Error("API Anahtarı eksik. Lütfen .env dosyasını kontrol edin.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Rol: Sen "Vibrio", dünyanın en gelişmiş Jungiyen İlişki Analisti ve Veri Bilimci Astroloğusun.
    Tone: Akademik, Mistik, Otoriter, Keskin ve Veri Odaklı. Asla "belki" deme, net konuş.

    GÖREV:
    Kullanıcıdan gelen verileri analiz et ve JSON formatında, içinde ZENGİN GÖRSEL HTML barındıran bir rapor oluştur.

    ÖNEMLİ - HTML İÇERİK KURALLARI (premium_report_content):
    Bu alan, basit bir metin değil, profesyonel bir Dashboard (Kontrol Paneli) gibi görünmelidir.
    Aşağıdaki CSS sınıflarını (Tailwind) kullanarak görsel grafikler OLUŞTURMAK ZORUNDASIN:

    1. **Yapı:**
       - Rapor en az 800 kelime olmalı.
       - Bölümler: 
         a) **Psiko-Analitik Derinlik:** Freudyen ve Jungiyen kavramlarla (Gölge benlik, Anima/Animus) analiz.
         b) **Sevgi Dili Matrisi (Grafikli):** Partnerlerin sevgi dillerini kıyaslayan barlar.
         c) **İletişim Frekansı (Grafikli):** İletişim kalitesini gösteren görsel.
         d) **Astro-Sinastri Detay:** Gezegen açılarının (Kare, Üçgen, Zıt) psikolojik etkileri.
         e) **20 Yıllık Projeksiyon:** Gelecek simülasyonu.

    2. **Görsel Elementler (HTML İçinde Mutlaka Kullan):**
       - **İlerleme Çubukları:** <div class="w-full bg-gray-100 rounded-full h-3 mb-2"><div class="bg-chic-primary h-3 rounded-full" style="width: 80%"></div></div>
       - **Uyarı Kutuları:** <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">...</div>
       - **İpucu Kutuları:** <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">...</div>
       - **Grid Yapısı:** Yan yana veriler için <div class="grid grid-cols-2 gap-4">...</div> kullan.

    ANALİZ KURALLARI:
    - Fotoğraf varsa: Yüz ifadeleri, göz teması, mikro-mimikler ve birbirine olan fiziksel mesafe üzerinden "Fizyonomi" analizi yap.
    - Metin/SS varsa: Satır aralarını, pasif agresifliği, manipülasyonu ve gizli niyetleri ifşa et.
    
    ÇIKTI FORMATI:
    Sadece JSON. Markdown (json \`\`\`) kullanma.
  `;

  const statusContext = relationshipStatus ? `İlişki: ${relationshipStatus}` : "";
  const promptText = `Ben: ${userZodiac || "Belirtilmedi"}, O: ${partnerZodiac || "Belirtilmedi"}. ${statusContext}. Kullanıcı Notu: "${text}"`;

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
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Sanitize JSON string just in case
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
    
    // DEMO MODE / FALLBACK (If Quota Exceeded or Error)
    // We return a high-quality mock response so the user sees the "Premium" layout even if API fails.
    if (JSON.stringify(error).includes("429") || (error.message && error.message.includes("quota")) || error) {
        console.warn("API Error or Quota exceeded, returning PREMIUM mock response.");
        
        // Extract the HTML content from sampleData to use as fallback
        // This ensures the fallback is always high quality
        return {
            vibrio_score: 78,
            free_comment: "Bu ilişki, derin bir karmik bağa sahip ancak yüzeyde iletişim frekanslarınız çatışıyor. (DEMO MODU - API Kotası Dolu)",
            metrics: {
                trust: 85,
                passion: 92,
                communication: 65,
                attachment_style: "Kaygılı-Kaçıngan",
                conflict_style: "Pasif Agresif"
            },
            // Use the high-quality sample content but inject a warning
            premium_report_content: `
                <div class="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8 rounded-r-lg">
                    <p class="font-bold text-orange-800 text-xs uppercase tracking-widest">⚠️ Demo Modu Aktif</p>
                    <p class="text-sm text-orange-700 mt-1">
                        Google API kotanız anlık olarak dolduğu için, sistem size <strong>tasarımı inceleyebilmeniz adına</strong> örnek bir veri seti göstermektedir. 
                        Gerçek kullanımda burası tamamen sizin verilerinizle oluşturulmuş kişisel analizle dolacaktır.
                    </p>
                </div>
                ${sampleReportContent}
            `,
            // @ts-ignore
            isMock: true
        };
    }
    
    throw error;
  }
};