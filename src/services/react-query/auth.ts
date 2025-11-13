// queries/auth.ts
import { useMutation } from '@tanstack/react-query'
import { Configuration, DefaultApi, type DtoLoginRequest, type DtoLoginResponse, type DtoSignUpUserRequest, type DtoSignUpUserResponse } from '../../api'
import { useAuthStore } from '../stores/useAuthStore'

const api = new DefaultApi(
  new Configuration({ basePath: '/api' }) // proxy will handle it
);

export const useSignup = () => {
  return useMutation<DtoSignUpUserResponse, Error, DtoSignUpUserRequest>({
    mutationFn: (data) => api.usersSignupPost(data).then(res => res.data)
  });
};

export const useLogin = () => {
  return useMutation<DtoLoginResponse, Error, DtoLoginRequest>({
    mutationFn: (data) => api.usersLoginPost(data).then(res => res.data),
    onSuccess: (data) => {
      if (!data) return;
      const auth = useAuthStore.getState();
      if (data.accessToken) auth.setToken(data.accessToken);
      if (data.accessToken) {
        try {
          localStorage.setItem('auth_token', data.accessToken);
        } catch {/* ignore quota errors */}
      }
      if (data.user) auth.setUser(data.user);
    }
  });
};

// Helper: Get stored token
export const getStoredToken = () => {
  const authStore = useAuthStore.getState();
  if (authStore.token) return authStore.token;
  else try { 
    const token = localStorage.getItem('auth_token');
    if (token) {
      authStore.setToken(token);
      return token;
    }
    return undefined; 
  } 
    catch { return undefined; }
};

// Helper: Check if token exists and is not expired (assumes JWT with exp claim in seconds)
export const isTokenValid = (token?: string) => {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length < 2) return false;
  try {
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    if (payload.exp && typeof payload.exp === 'number') {
      return payload.exp * 1000 > Date.now();
    }
    // If no exp, assume valid
    return true;
  } catch {
    return false;
  }
};


