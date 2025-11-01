import { create } from 'zustand';

interface AuthState {
  user: null | any;

  setUser: (u: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  
  setUser: (u) => set({ user: u }),
  logout: () => set({ user: null }),
}));
