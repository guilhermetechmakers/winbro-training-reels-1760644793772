import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth';

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!localStorage.getItem('auth_token'),
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      // Update the user in the cache
      if (data.user) {
        queryClient.setQueryData(authKeys.user, data.user);
      }
      
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Sign in failed: ${error.message}`);
    },
  });
};

// Sign up mutation
export const useSignUp = () => {
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Sign up failed: ${error.message}`);
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Sign out failed: ${error.message}`);
    },
  });
};

// Password reset mutation
export const usePasswordReset = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Password reset failed: ${error.message}`);
    },
  });
};

// Update password mutation
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.updatePassword(token, password),
    onSuccess: () => {
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Password update failed: ${error.message}`);
    },
  });
};

// Email verification mutation
export const useEmailVerification = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Email verification failed: ${error.message}`);
    },
  });
};

// Resend verification mutation
export const useResendVerification = () => {
  return useMutation({
    mutationFn: authApi.resendVerification,
    onSuccess: () => {
      // Success handled by UI
    },
    onError: (error: any) => {
      console.error(`Failed to send verification email: ${error.message}`);
    },
  });
};