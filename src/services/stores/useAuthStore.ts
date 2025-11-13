import type { DtoUserResponse } from '@/api/api';
import { create } from 'zustand';

interface AuthState {
  user: DtoUserResponse | undefined;
  token: string | undefined;

  setToken: (t: string) => void;
  setUser: (u: DtoUserResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const localToken: string | undefined= localStorage.getItem('auth_token') || undefined;

  return {
    user: undefined,
    token: localToken,

    setToken: (t) => {
      localStorage.setItem('auth_token', t);
      set({ token: t });
    },
    
    setUser: (u) => set({ user: u }),
    logout: () => set({ user: undefined, token: undefined }),
}});
