import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MySidebar } from "./TeamPageComponents/TeamSidebar";
import { TeamSidebarTrigger } from "./TeamPageComponents/TeamSidebarTrigger";
import { TeamDashboard } from "./TeamPageComponents/TeamDashboard";

export default function TeamPage() {
    const { teamId } = useParams<{teamId: string}>(); 

    console.log(teamId);



    return(
        <SidebarProvider>
            <MySidebar />
            <div className="flex flex-col w-full h-screen">
                <div className="flex flex-col w-full flex-1">
                    <TeamSidebarTrigger />
                    <div className="border w-full h-16">

                    </div>
                    <div className="flex-1 w-full overflow-auto">
                        <TeamDashboard teamId={teamId!}/>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

