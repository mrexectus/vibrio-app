
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
  premium_report_content: string;
  numerology?: {
    life_path_compatibility: number;
    karmic_lesson: string;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  userZodiac: string;
  partnerZodiac: string;
  relStatus: string;
  result: VibrioResponse & { futureImageUrl?: string };
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
