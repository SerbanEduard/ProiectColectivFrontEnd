import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, ClipboardClock, Watch } from "lucide-react";
import type { ViewType } from "./StatisticsTypes";


export default function StatisticsSidebar({onSelect, onGoToHome}: {onSelect: (value: ViewType) => void, onGoToHome: () => void}) {

  const switchSelection = (value: ViewType) => {
    onSelect(value);
  }

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        HEADER
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onGoToHome()} asChild>
                  <div className="flex items-center gap-10 text-xl ml-2">
                    <LayoutDashboard/>
                    Dashboard
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
      <SidebarFooter>
        FOOTER
      </SidebarFooter>
  </Sidebar>
  )
}