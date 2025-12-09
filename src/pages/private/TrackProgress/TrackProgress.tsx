import { SidebarProvider } from "@/components/ui/sidebar";
import StatisticsSidebar from "./TrackProgressComponents/TrackProgressSidebar";
import TrackProgressSidebarTrigger from "./TrackProgressComponents/TrackProgressSidebarTrigger";
import TotalTimeSpent from "./TrackProgressComponents/TTimeSpent";
import TimeSpentOnTeam from "./TrackProgressComponents/TeamTimeSpent";
import type { ViewType } from "./TrackProgressComponents/StatisticsTypes";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserStatistics } from "@/services/react-query/user";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/services/stores/useAuthStore";
import { useStatisticsStore } from "@/services/stores/useStatisticsStore";
  
const FAILED_FATCHED_STATS = "Failed to fetch statistics.";

export default function TrackProgress() {

  const [cards, setCards] = useState<Array<{ id: string; type: ViewType }>>([]);
  const { user: authUser } = useAuthStore();
  const { stats: userStats } = useStatisticsStore();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const { mutateAsync: getUserStatsAsync } = useGetUserStatistics();
  
  useEffect(() => {
    const id = authUser?.id;
    
    if (!id || hasFetched.current) return;

    hasFetched.current = true;

    const fetchStats = async () => {
      await toast.promise(
        getUserStatsAsync({ id: id as string }),
        {
          loading: "Loading statistics...",
          error: (err: unknown) => {
            if (axios.isAxiosError(err)) {
              const status = err.response?.status;
              if (status === 401) return "Unauthorized";
              if (status === 404) return "Stats not found";
              if (status === 500) return "Server error";
              return err.response?.data?.message || err.message || FAILED_FATCHED_STATS;
            }
            if (err instanceof Error) return err.message || FAILED_FATCHED_STATS;
            return FAILED_FATCHED_STATS;
          }
        }
      );
    };

    fetchStats();
  }, [authUser?.id, getUserStatsAsync]);

  const goToHome = () => {
    navigate("/home");
  }

  const addCard = (type: ViewType) => {
    if (cards.some(card => card.type === type)) {
      return;
    }

    const newCard = {
      id: `${type}-${Date.now()}`,
      type
    };
    setCards(prev => [...prev, newCard]);
  }

  const removeCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
  }

  const milisecondToMinutes = (ms: number) => {
    return Math.floor(ms / 60000);
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <StatisticsSidebar onSelect={addCard} onGoToHome={goToHome}/>
      <div className="flex flex-col w-full h-screen"> 
        <TrackProgressSidebarTrigger />
        <div className="flex-1 w-full p-6 overflow-auto flex justify-center">
          <div className="flex flex-col gap-6 w-full max-w-5xl">
            {cards.map(card => (
              <div key={card.id}>
                {card.type === "totalTimeSpent" && 
                  <TotalTimeSpent 
                    onClose={() => removeCard(card.id)} 
                    time={milisecondToMinutes(userStats?.totalTimeSpentOnApp ?? 0)} 
                  /> }
                {card.type === "timeSpentOnTeams" && 
                  <TimeSpentOnTeam 
                    onClose={() => removeCard(card.id)} 
                    data={userStats?.timeSpentOnTeams ?? []}
                  /> }
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

