import type {EntityTeam} from '@/api/api';
import { create } from 'zustand';

interface TeamState {
    teams: EntityTeam[];
    setTeams: (teams: EntityTeam[]) => void;
    addTeam: (team: EntityTeam) => void;
    updateTeam: (team: EntityTeam) => void;
}

export const useTeamStore = create<TeamState>((set,get) => {

    return {
        teams: [],

        setTeams: (t) => {
            set({ teams: t });
        },

        addTeam: (team) => {
            const currentTeams = get().teams;
            set({ teams: [...currentTeams, team] });
        },
        updateTeam: (updatedTeam) => {
            const teams = get().teams;
            set({
                teams: teams.map(t =>
                    t.id === updatedTeam.id ? updatedTeam : t
                )
            });
        }
    }});
