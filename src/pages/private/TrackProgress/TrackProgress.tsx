import { SidebarProvider } from "@/components/ui/sidebar";
import StatisticsSidebar from "./TrackProgressComponents/TrackProgressSidebar";
import TrackProgressSidebarTrigger from "./TrackProgressComponents/TrackProgressSidebarTrigger";
import TotalTimeSpent from "./TrackProgressComponents/TTimeSpent";
import TimeSpentOnTeam from "./TrackProgressComponents/TeamTimeSpent";
import type { StatisticsResponse, ViewType } from "./TrackProgressComponents/StatisticsTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
  
const MOCK_TIME_SPENT = 7200000; // 10 hours in milliseconds

export default function TrackProgress() {

  const [cards, setCards] = useState<Array<{ id: string; type: ViewType }>>([]);
  const [stats, setStats] = useState<StatisticsResponse | null>(null);
  const navigate = useNavigate();

  const getStats = async () => {
    setStats({
      totalTimeSpentOnApp: MOCK_TIME_SPENT, 
      totalTimeSpentPerTeam: []
    });
    // Placeholder for fetching statistics data
    // In a real application, you would fetch this data from an API
  }

  const goToHome = () => {
    navigate("/home");
  }

  const addCard = (type: ViewType) => {
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

  useEffect(() => {
    getStats();
  }, []);
  
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
                    time={milisecondToMinutes(stats ? stats.totalTimeSpentOnApp : 0)} 
                  /> }
                {card.type === "timeSpentOnTeams" && <TimeSpentOnTeam onClose={() => removeCard(card.id)} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

