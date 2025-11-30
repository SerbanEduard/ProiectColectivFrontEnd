import type { DtoUserResponse } from '@/api/api';
import { create } from 'zustand';

interface AuthState {
  user: DtoUserResponse | undefined;
  token: string | undefined;

  setToken: (t: string) => void;
  setUser: (u: DtoUserResponse) => void;
  logout: () => void;
  getStoredUser: () => DtoUserResponse | undefined;
}

export const useAuthStore = create<AuthState>((set,get) => {
  const localToken: string | undefined= localStorage.getItem('auth_token') || undefined;
  let userLogged: DtoUserResponse | undefined = undefined;

  try {
    const raw = localStorage.getItem('auth_user');
    if (raw) userLogged = JSON.parse(raw);
  } catch {
    userLogged = undefined;
  }

  return {
    user: userLogged,
    token: localToken,

    setToken: (t) => {
      localStorage.setItem('auth_token', t);
      set({ token: t });
    },

    setUser: (u) => {
      localStorage.setItem('auth_user', JSON.stringify(u));
      set({user: u});
    },

    getStoredUser : () => {
      const state = get();

      if (state.user) return state.user;

      try {
        const raw = localStorage.getItem('auth_user');
        if (raw) {
          const user = JSON.parse(raw);
          state.setUser(user);
          return user;
        }
      } catch {
        return undefined;
      }

      return null;
    }
    ,logout: () => {
      set({ user: undefined, token: undefined });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
}});

