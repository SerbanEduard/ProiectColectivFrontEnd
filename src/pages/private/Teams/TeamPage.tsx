import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MySidebar } from "./TeamPageComponents/TeamSidebar";
import { TeamSidebarTrigger } from "./TeamPageComponents/TeamSidebarTrigger";

export default function TeamPage() {
    const { teamId } = useParams<{teamId: string}>(); 

    console.log(teamId);



    return(
        <SidebarProvider>
            <MySidebar />
            <TeamSidebarTrigger />
            <div className="bg-accent w-screen">
                <div className="bg-black w-screen h-fit">
                </div>

            </div>
        </SidebarProvider>
    )
}

