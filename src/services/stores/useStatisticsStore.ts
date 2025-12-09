import type { DtoStatisticsResponse } from '@/api';
import { create } from 'zustand';

interface StatisticsState {
  stats: DtoStatisticsResponse | undefined;

  setStats: (stats: DtoStatisticsResponse) => void;
  logout: () => void;
}

export const useStatisticsStore = create<StatisticsState>((set) => {
  return {
    stats: undefined,

    setStats: (s) => {
      set({ stats: s });
    },

    logout: () => {
      set({ stats: undefined });
    },
  }
});