import { useMutation } from "@tanstack/react-query";
import type { DtoUserPasswordRequestDTO, DtoUserUpdateRequestDTO, DtoUserUpdateResponseDTO } from "@/api";
import { api } from "./api"
import { useAuthStore } from "../stores/useAuthStore";

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