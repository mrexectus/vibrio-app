
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
    Rol: Sen "Vibrio", dünyanın en gelişmiş Jungiyen İlişki Analistisin. 
    Tone: Akademik, Mistik, Otoriter ama Şefkatli. Asla yüzeysel konuşma.
    
    GÖREV:
    Kullanıcıdan gelen metni veya görseli analiz et ve JSON formatında yanıt ver.
    
    ÖNEMLİ: 'premium_report_content' alanı SADECE ve SADECE HTML kodu içermelidir.
    Bu HTML, CSS sınıfları (Tailwind) kullanılarak görselleştirilmiş, Barlar, Grafikler ve Kutucuklar içermelidir.
    Düz yazı yazma. Görselleştir.

    HTML İÇERİK KURALLARI (premium_report_content):
    1.  **Uzunluk:** En az 600 kelime olmalı.
    2.  **Yapı:**
        -   **Bölüm 1: Psiko-Dinamik Profil:** İlişkinin röntgeni.
        -   **Bölüm 2: Bilinçaltı Kodları (Görsel Bar Kullan):** Kıskançlık, Sadakat, Manipülasyon seviyelerini HTML progress bar ile göster.
            *Örnek:* <div class="w-full bg-gray-100 rounded-full h-2 mb-4"><div class="bg-chic-primary h-2 rounded-full" style="width: 75%"></div></div>
        -   **Bölüm 3: Gelecek Simülasyonu (Timeline):** 1. Yıl, 5. Yıl ve 20. Yıl için tahminler.
        -   **Bölüm 4: Toksik Alarm:** Varsa kırmızı bayraklar.
    3.  **Stil:** Başlıklar için <h3 class="text-xl font-serif font-bold text-chic-deep mt-6 mb-3 border-b border-chic-primary/20 pb-2"></h3> kullan. Vurgular için <strong class="text-chic-primary"></strong> kullan.
    
    ANALİZ KURALLARI:
    -   Eğer fotoğraf varsa: Yüz ifadelerine, mikro mimiklere ve duruşa odaklan. "Gözleri kaçırıyor", "Dudak kenarında küçümseme var" gibi detay ver.
    -   Eğer metin/ss varsa: Satır aralarını oku. Pasif agresifliği yakala.
    
    ÇIKTI FORMATI:
    Sadece JSON. Markdown (json \`\`\`) kullanma.
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
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
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
    
    if (JSON.stringify(error).includes("429") || (error.message && error.message.includes("429")) || (error.message && error.message.includes("quota"))) {
        console.warn("Quota exceeded, returning mock response for UI demo.");
        return {
            vibrio_score: 78,
            free_comment: "Bu ilişki, derin bir karmik bağa sahip ancak yüzeyde iletişim frekanslarınız çatışıyor. (DEMO MODU)",
            metrics: {
                trust: 85,
                passion: 92,
                communication: 65,
                attachment_style: "Kaygılı-Kaçıngan Döngüsü",
                conflict_style: "Pasif Agresif"
            },
            premium_report_content: `
            <div class="space-y-6">
                <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800 text-sm">
                    <strong>⚠️ DEMO MODU AKTİF</strong><br/>
                    Google API kotanız dolduğu için bu örnek bir analizdir. Gerçek kullanımda yapay zeka buraya kişiselleştirilmiş, 600+ kelimelik detaylı bir rapor yazar.
                </div>
                
                <h3 class="text-xl font-serif font-bold text-chic-deep mt-6 mb-3 border-b border-chic-primary/20 pb-2">1. Psiko-Dinamik Profil</h3>
                <p>İlişkinizdeki temel dinamik <strong>"Yaralı Şifacı"</strong> arketipine dayanıyor. Birbirinizin çocukluk travmalarını tetikliyor, ancak aynı zamanda iyileştirme potansiyeli taşıyorsunuz. Tutku (Skor: 92) bu ilişkinin yakıtı, ancak iletişim (Skor: 65) motoru tekletiyor.</p>
                
                <h3 class="text-xl font-serif font-bold text-chic-deep mt-6 mb-3 border-b border-chic-primary/20 pb-2">2. Bilinçaltı Kodları</h3>
                
                <div class="mb-4">
                    <div class="flex justify-between text-xs uppercase font-bold text-chic-deep/60 mb-1">
                        <span>Manipülasyon Riski</span>
                        <span>%45 (Orta)</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                        <div class="bg-orange-400 h-2 rounded-full" style="width: 45%"></div>
                    </div>
                </div>

                <div class="mb-4">
                     <div class="flex justify-between text-xs uppercase font-bold text-chic-deep/60 mb-1">
                        <span>Cinsel Çekim</span>
                        <span>%92 (Çok Yüksek)</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                        <div class="bg-red-400 h-2 rounded-full" style="width: 92%"></div>
                    </div>
                </div>

                 <h3 class="text-xl font-serif font-bold text-chic-deep mt-6 mb-3 border-b border-chic-primary/20 pb-2">3. Gelecek Simülasyonu</h3>
                 <p>Önümüzdeki 6 ay içinde bir güç savaşı yaşanacak. Eğer "ben" yerine "biz" demeyi öğrenirseniz, bu ilişki 20 yıl sürecek bir ortaklığa dönüşebilir.</p>
            </div>
            `,
            // @ts-ignore
            isMock: true
        };
    }

    let errorMsg = "Analiz sırasında bir hata oluştu.";
    if (error.message) {
        if (error.message.includes("API key")) errorMsg = "API Anahtarı geçersiz.";
        else if (error.message.includes("403")) errorMsg = "Erişim izni yok (403).";
        else if (error.message.includes("503")) errorMsg = "Servis şu an yoğun, lütfen tekrar deneyin.";
        else errorMsg = `Hata: ${error.message}`;
    }
    
    throw new Error(errorMsg);
  }
};
