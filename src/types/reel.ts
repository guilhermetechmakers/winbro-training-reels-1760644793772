export interface Reel {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number; // in seconds
  file_size: number; // in bytes
  resolution: string; // e.g., "1920x1080"
  format: string; // e.g., "mp4", "webm"
  status: ReelStatus;
  tags: string[];
  machine_model?: string;
  process_step?: string;
  tooling?: string[];
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  view_count: number;
  transcript?: TranscriptSegment[];
  metadata: ReelMetadata;
  allocated_customers: string[];
  qa_notes?: string;
  qa_reviewer_id?: string;
  qa_reviewed_at?: string;
}

export type ReelStatus = 'draft' | 'pending_qa' | 'approved' | 'published' | 'archived' | 'rejected';

export interface TranscriptSegment {
  start_time: number; // in seconds
  end_time: number; // in seconds
  text: string;
  speaker?: string;
}

export interface ReelMetadata {
  machine_model?: string;
  process_step?: string;
  tooling?: string[];
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
  safety_notes?: string;
  quality_rating?: number; // 1-5
  auto_generated_tags?: string[];
  manual_tags?: string[];
}

export interface CreateReelInput {
  title: string;
  description: string;
  video_file: File;
  tags?: string[];
  machine_model?: string;
  process_step?: string;
  tooling?: string[];
  allocated_customers?: string[];
}

export interface UpdateReelInput {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  machine_model?: string;
  process_step?: string;
  tooling?: string[];
  allocated_customers?: string[];
  status?: ReelStatus;
  qa_notes?: string;
}

export interface ReelSearchFilters {
  query?: string;
  tags?: string[];
  machine_models?: string[];
  process_steps?: string[];
  tooling?: string[];
  duration_min?: number;
  duration_max?: number;
  created_by?: string[];
  date_from?: string;
  date_to?: string;
  status?: ReelStatus[];
  allocated_customers?: string[];
}

export interface ReelSearchResult {
  reels: Reel[];
  total: number;
  page: number;
  limit: number;
  facets: {
    tags: { name: string; count: number }[];
    machine_models: { name: string; count: number }[];
    process_steps: { name: string; count: number }[];
    tooling: { name: string; count: number }[];
    authors: { name: string; count: number }[];
  };
}
