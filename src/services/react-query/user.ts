import { useMutation } from "@tanstack/react-query";
import type { DtoStatisticsResponse, DtoUserPasswordRequestDTO, DtoUserUpdateRequestDTO, DtoUserUpdateResponseDTO } from "@/api";
import { api } from "./api"
import { useAuthStore } from "../stores/useAuthStore";
import { useStatisticsStore } from "../stores/useStatisticsStore";

const MOCK_TIME_ON_TEAM = [
  {
    duration: 120000,
    teamId: "team-1"
  },
  {
    duration: 450000,
    teamId: "team-2"
  },
  {
    duration: 300000,
    teamId: "team-3"
  }
]

export const useUpdateUserData = () => {
  return useMutation<DtoUserUpdateResponseDTO, Error, { id: string, user: DtoUserUpdateRequestDTO }>({
    mutationFn: ({ id, user }) =>
      api.usersIdPatch(id, user).then(res => res.data),
    onSuccess: (data) => {
      const auth = useAuthStore.getState();
      if (data) {
        const { email, firstname, id, lastname, statistics, teams, topicsOfInterest, username } = data;
        auth.setUser({ email, firstname, id, lastname, statistics, teams, topicsOfInterest, username });
      }
    }
  });
};

export const useUpdateUserPassword = () => {
  return useMutation<string | { [key: string]: string; }, Error, { id: string, request: DtoUserPasswordRequestDTO }>({
    mutationFn: ({ id, request }) =>
      api.usersIdPasswordPut(id, request).then(res => res.data),
  });
}

export const useGetUserStatistics = () => {
  return useMutation<DtoStatisticsResponse, Error, { id: string }>({
    mutationFn: ({ id }) =>
      api.usersIdStatisticsGet(id).then(res => res.data),
    onSuccess: (data) => {
      const stats = useStatisticsStore.getState();
      if(data) {
        data.timeSpentOnTeams = MOCK_TIME_ON_TEAM;
        stats.setStats(data);
      }
    }
  });
}