import { useMutation } from "@tanstack/react-query";
import type { EntityUser } from "@/api";
import { api } from "./api"
import { useAuthStore } from "../stores/useAuthStore";

export const useUpdateUser = () => {
  return useMutation<EntityUser, Error, { id: string, user: EntityUser }>({
    mutationFn: ({ id, user }) =>
      api.usersIdPut(id, user).then(res => res.data),
    onSuccess: (data) => {
      const auth = useAuthStore.getState();
      if (data) {
        const { email, firstname, id, lastname, statistics, teams, topicsOfInterest, username } = data;
        auth.setUser({ email, firstname, id, lastname, statistics, teams, topicsOfInterest, username });
      }
    }
  });
};