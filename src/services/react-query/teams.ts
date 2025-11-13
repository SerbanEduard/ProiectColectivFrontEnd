import {useMutation} from "@tanstack/react-query";
import type {DtoTeamRequest, EntityTeam} from "@/api";
import { api } from './api'
import {useTeamStore} from "@/services/stores/useTeamStore.ts";



export const useGetTeams = () => {
    return useMutation<EntityTeam[], Error>({
        mutationFn: () => api.teamsGet().then(res=>res.data),
        onSuccess: (data: EntityTeam[]) => {
            console.log("🚀 GET TEAMS RAW RESPONSE:", data);
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
    return useMutation<EntityTeam, Error, { teamId: string; userId: string }>(
        {
            mutationFn: ({ teamId, userId }) =>
                api.teamsAddUserToTeamPut({
                    teamId,
                    userId
                }).then(res => res.data),

            onSuccess: (updatedTeam) => {
                const store = useTeamStore.getState();
                store.updateTeam(updatedTeam);
            },

            onError: (err) => {
                console.error("Error joining team:", err);
            }
        }
    );
};
