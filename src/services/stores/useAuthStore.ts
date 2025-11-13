import type { DtoUserResponse } from '@/api/api';
import { create } from 'zustand';

interface AuthState {
  user: DtoUserResponse | undefined;
  token: string | undefined;

  setToken: (t: string) => void;
  setUser: (u: DtoUserResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  token: undefined,

  setToken: (t) => set({ token: t }),
  
  setUser: (u) => set({ user: u }),
  logout: () => set({ user: undefined, token: undefined }),
}));
