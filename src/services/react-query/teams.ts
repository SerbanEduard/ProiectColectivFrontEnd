import {useMutation} from "@tanstack/react-query";
import type {DtoTeamRequest, EntityTeam} from "@/api";
import { api } from './api'
import {useTeamStore} from "@/services/stores/useTeamStore.ts";
import type { DtoAddUserToTeamResponse } from "@/api";


export const useGetTeams = () => {
    return useMutation<EntityTeam[], Error>({
        mutationFn: () => api.teamsGet().then(res=>res.data),
        onSuccess: (data: EntityTeam[]) => {
            if (!data) return;
            const team = useTeamStore.getState();
            if(data) team.setTeams(data as EntityTeam[]);
        },
        onError: (err) => {
            console.error("Error fetching teams:", err);
        },

    })
}

export const useAddTeam = () => {
    return useMutation<EntityTeam, Error, DtoTeamRequest>({
        mutationFn: (data) => api.teamsPost(data).then(res=>res.data),
        onSuccess: (data) => {
            if (!data) return;
            const team = useTeamStore.getState();
            if(data) team.addTeam(data as EntityTeam);
        }
    })
}

export const useJoinTeam = () => {
    return useMutation<DtoAddUserToTeamResponse, Error, { teamId: string; userId: string }>(
        {
            mutationFn: ({ teamId, userId }) =>
                api.teamsUsersPut({teamId, userId}).then(res => res.data),

            onSuccess: (data) => {
                if (!data.team || !data) return;
                const team = useTeamStore.getState();
                if(data) team.updateTeam(data.team);
            },

            onError: (err) => {
                console.error("Error joining team:", err);
            }
        }
    );
};
