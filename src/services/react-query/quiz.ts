import { useMutation } from "@tanstack/react-query";
import { api } from "./api";
import type { EntityQuiz } from "@/api";

export const useGetTeamQuizzes = (teamId: string) => {
  return useMutation<EntityQuiz[], Error>({
    mutationFn: async () => {
      if (!teamId) return [];
      const res = await api.quizzesTeamTeamIdGet(teamId);
      const quizzes = res.data?.quizzes || [];
      return quizzes as EntityQuiz[];
    }
  });
};
