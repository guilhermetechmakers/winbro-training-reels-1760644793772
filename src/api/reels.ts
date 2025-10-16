import { api, uploadFile } from './client';
import type { 
  Reel, 
  CreateReelInput, 
  UpdateReelInput, 
  ReelSearchFilters, 
  ReelSearchResult 
} from '@/types/reel';

export const reelsApi = {
  // Get all reels
  getAll: async (params?: { page?: number; limit?: number }): Promise<Reel[]> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return api.get<Reel[]>(`/reels${query ? `?${query}` : ''}`);
  },

  // Get reel by ID
  getById: async (id: string): Promise<Reel> => {
    return api.get<Reel>(`/reels/${id}`);
  },

  // Create new reel
  create: async (reelData: CreateReelInput, onProgress?: (progress: number) => void): Promise<Reel> => {
    // First upload the video file
    const uploadResponse = await uploadFile('/reels/upload', reelData.video_file, onProgress);
    
    // Then create the reel with metadata
    const { video_file, ...metadata } = reelData;
    return api.post<Reel>('/reels', {
      ...metadata,
      video_file_id: uploadResponse.file_id,
    });
  },

  // Update reel
  update: async (id: string, updates: UpdateReelInput): Promise<Reel> => {
    return api.put<Reel>(`/reels/${id}`, updates);
  },

  // Delete reel
  delete: async (id: string): Promise<void> => {
    await api.delete(`/reels/${id}`);
  },

  // Search reels
  search: async (filters: ReelSearchFilters): Promise<ReelSearchResult> => {
    return api.post<ReelSearchResult>('/reels/search', filters);
  },

  // Get reels by user
  getByUserId: async (userId: string): Promise<Reel[]> => {
    return api.get<Reel[]>(`/reels/user/${userId}`);
  },

  // Get reels by tags
  getByTags: async (tags: string[]): Promise<Reel[]> => {
    return api.post<Reel[]>('/reels/by-tags', { tags });
  },

  // Get popular reels
  getPopular: async (limit = 10): Promise<Reel[]> => {
    return api.get<Reel[]>(`/reels/popular?limit=${limit}`);
  },

  // Get recent reels
  getRecent: async (limit = 10): Promise<Reel[]> => {
    return api.get<Reel[]>(`/reels/recent?limit=${limit}`);
  },

  // Update reel status (for QA workflow)
  updateStatus: async (id: string, status: string, notes?: string): Promise<Reel> => {
    return api.patch<Reel>(`/reels/${id}/status`, { status, qa_notes: notes });
  },

  // Get reel transcript
  getTranscript: async (id: string): Promise<any> => {
    return api.get(`/reels/${id}/transcript`);
  },

  // Update reel transcript
  updateTranscript: async (id: string, transcript: any): Promise<void> => {
    await api.put(`/reels/${id}/transcript`, { transcript });
  },

  // Bookmark reel
  bookmark: async (id: string): Promise<void> => {
    await api.post(`/reels/${id}/bookmark`, {});
  },

  // Remove bookmark
  removeBookmark: async (id: string): Promise<void> => {
    await api.delete(`/reels/${id}/bookmark`);
  },

  // Get bookmarked reels
  getBookmarked: async (): Promise<Reel[]> => {
    return api.get<Reel[]>('/reels/bookmarked');
  },

  // Record view
  recordView: async (id: string, position?: number): Promise<void> => {
    await api.post(`/reels/${id}/view`, { position });
  },
};
