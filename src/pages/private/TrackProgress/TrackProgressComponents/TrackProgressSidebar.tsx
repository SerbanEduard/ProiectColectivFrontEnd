import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ClipboardClock, Watch } from "lucide-react";
import type { ViewType } from "./StatisticsTypes";
import { useAuthStore } from "@/services/stores/useAuthStore";
import homeLogo from "@/assets/home.png"


export default function StatisticsSidebar({onSelect, onGoToHome}: {onSelect: (value: ViewType) => void, onGoToHome: () => void}) {
  const { user: loggedUser } = useAuthStore();
  const loggedUserUsername = loggedUser ? loggedUser.username : "Guest";

  const switchSelection = (value: ViewType) => {
    onSelect(value);
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex border-b rounded-lg w-full justify-center items-center font-light p-3">{loggedUserUsername}</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Time Tracking
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => switchSelection("totalTimeSpent")} asChild>
                  <div className="flex items-center gap-10 text-lg ml-2">
                    <Watch/>
                    Total Time Spent
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => switchSelection("timeSpentOnTeams")} asChild>
                  <div className="flex items-center gap-10 text-lg ml-2">
                    <ClipboardClock/>
                    Time Spent on Teams
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border rounded-t-4xl hover:bg-accent cursor-pointer"
          onClick={() => onGoToHome()}
        >
          <div className=" flex items-center justify-center gap-x-2 pr-5">
            <img src={homeLogo} alt="StudyFlow logo" className="h-7 w-auto" />
            <p>Home</p>
          </div>
        </SidebarFooter>
  </Sidebar>
  )
}