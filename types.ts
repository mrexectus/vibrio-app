
export interface VibrioResponse {
  vibrio_score: number;
  free_comment: string;
  metrics: {
    trust: number;
    passion: number;
    communication: number;
    attachment_style: string;
    conflict_style: string;
  };
  future_visual_description?: string; // Görsel üretim için prompt
  premium_report_content: string;
  numerology?: {
    life_path_compatibility: number;
    karmic_lesson: string;
  };
  generated_image_base64?: string | null; // Gerçek AI üretimi görsel verisi
}

export interface AnalysisRequest {
  text: string;
  userZodiac?: string;
  partnerZodiac?: string;
  relationshipStatus?: string;
  image?: File | null;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}
