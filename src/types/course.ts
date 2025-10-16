export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  status: CourseStatus;
  modules: CourseModule[];
  quiz?: Quiz;
  completion_rules: CompletionRules;
  target_audience: string[];
  allocated_customers: string[];
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  enrolled_count: number;
  completion_count: number;
  average_rating?: number;
  total_duration: number; // in seconds
}

export type CourseStatus = 'draft' | 'published' | 'archived';

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  reels: CourseReel[];
  prerequisites?: string[]; // module IDs
}

export interface CourseReel {
  id: string;
  reel_id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail_url: string;
  order: number;
  is_required: boolean;
  completion_threshold?: number; // percentage of video to watch
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passing_score: number; // percentage
  time_limit?: number; // in minutes
  max_attempts?: number;
  show_correct_answers: boolean;
  randomize_questions: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // for multiple choice
  correct_answer: string | string[]; // single answer or array for multiple correct
  explanation?: string;
  points: number;
  reel_timestamp?: number; // link to specific time in reel
  order: number;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

export interface CompletionRules {
  require_all_reels: boolean;
  require_quiz_pass: boolean;
  minimum_watch_percentage: number; // percentage
  allow_skip_optional: boolean;
  certificate_required: boolean;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  modules: Omit<CourseModule, 'id'>[];
  quiz?: Omit<Quiz, 'id'>;
  completion_rules: CompletionRules;
  target_audience: string[];
  allocated_customers: string[];
}

export interface UpdateCourseInput {
  id: string;
  title?: string;
  description?: string;
  modules?: CourseModule[];
  quiz?: Quiz;
  completion_rules?: CompletionRules;
  target_audience?: string[];
  allocated_customers?: string[];
  status?: CourseStatus;
}

export interface CourseProgress {
  course_id: string;
  user_id: string;
  status: ProgressStatus;
  started_at: string;
  completed_at?: string;
  progress_percentage: number;
  module_progress: ModuleProgress[];
  quiz_attempts: QuizAttempt[];
  last_accessed_at: string;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

export interface ModuleProgress {
  module_id: string;
  status: ProgressStatus;
  started_at: string;
  completed_at?: string;
  reel_progress: ReelProgress[];
}

export interface ReelProgress {
  reel_id: string;
  status: ProgressStatus;
  watch_percentage: number;
  last_position: number; // in seconds
  completed_at?: string;
}

export interface QuizAttempt {
  attempt_id: string;
  started_at: string;
  submitted_at?: string;
  score?: number;
  passed: boolean;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  question_id: string;
  answer: string | string[];
  is_correct: boolean;
  points_earned: number;
}
