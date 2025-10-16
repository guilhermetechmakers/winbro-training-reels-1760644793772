export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  company_id?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
  preferences: UserPreferences;
}

export type UserRole = 'admin' | 'curator' | 'trainer' | 'operator' | 'customer-admin';

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  playback_speed: number;
  autoplay: boolean;
  captions_enabled: boolean;
  notifications: {
    email: boolean;
    in_app: boolean;
    assignments: boolean;
    certificates: boolean;
  };
}

export interface CreateUserInput {
  email: string;
  full_name: string;
  role: UserRole;
  company_id?: string;
  password: string;
}

export interface UpdateUserInput {
  id: string;
  full_name?: string;
  avatar_url?: string;
  preferences?: Partial<UserPreferences>;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token: string;
}

export interface SignInInput {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignUpInput {
  email: string;
  full_name: string;
  company_name: string;
  role: UserRole;
  password: string;
  subscription_plan?: string;
}
