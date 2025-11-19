import { SidebarProvider } from "@/components/ui/sidebar";
import StatisticsSidebar from "./TrackProgressComponents/TrackProgressSidebar";
import TrackProgressSidebarTrigger from "./TrackProgressComponents/TrackProgressSidebarTrigger";
import TotalTimeSpent from "./TrackProgressComponents/TTimeSpent";
import TimeSpentOnTeam from "./TrackProgressComponents/TeamTimeSpent";
import type { ViewType } from "./TrackProgressComponents/StatisticsTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrackProgress() {

  const [view, setView] = useState<ViewType>("totalTimeSpent");
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <StatisticsSidebar onSelect={setView} onGoToHome={goToHome}/>
      <div className="flex flex-col w-full h-screen"> 
        <TrackProgressSidebarTrigger />
        <div className="flex-1 w-full">
          {view === "totalTimeSpent" && <TotalTimeSpent />}
          {view === "timeSpentOnTeams" && <TimeSpentOnTeam />}
        </div>
      </div>
    </SidebarProvider>
  );
}

