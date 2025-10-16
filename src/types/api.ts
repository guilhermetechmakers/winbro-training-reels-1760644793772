export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, any>;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  created_at: string;
  action_url?: string;
}

export type NotificationType = 
  | 'course_assigned'
  | 'course_completed'
  | 'certificate_issued'
  | 'reel_approved'
  | 'reel_rejected'
  | 'system_announcement'
  | 'password_reset'
  | 'email_verification';

export interface DashboardStats {
  total_courses: number;
  assigned_courses: number;
  completed_courses: number;
  reels_watched_today: number;
  certificates_earned: number;
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'course_started' | 'course_completed' | 'reel_watched' | 'certificate_earned' | 'quiz_passed';
  title: string;
  description: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  related_id?: string; // course_id, reel_id, etc.
  related_type?: string;
}
