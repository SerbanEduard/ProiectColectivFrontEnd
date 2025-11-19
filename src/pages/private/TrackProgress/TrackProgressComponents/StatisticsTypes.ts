export type ViewType = "totalTimeSpent" | "timeSpentOnTeams";

type TeamTimeSpent = {
    teamId: string;
    duration: number;
}

export type StatisticsResponse = {
    totalTimeSpentOnApp: number;
    totalTimeSpentPerTeam: TeamTimeSpent[];
}