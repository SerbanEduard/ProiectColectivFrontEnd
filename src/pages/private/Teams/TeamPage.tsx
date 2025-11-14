import { Link, useParams } from "react-router-dom";
import logo from "@/assets/logo-clean.png";
import { Button } from "@/components/ui/button";
import { Settings, UserPlus, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MySidebar } from "./TeamPageComponents/TeamSidebar";
import { TeamSidebarTrigger } from "./TeamPageComponents/TeamSidebarTrigger";

export default function TeamPage() {
    const { teamId } = useParams<{teamId: string}>(); 




    // return (
    // <div className="min-w-screen min-h-screen bg-amber-100 flex flex-col">
    //     <div className="min-h-fit bg-background items-end">
    //         <header className="w-full px-6 py-4 border-b border-border">
    //         <div className="flex max-w-7xl">
    //             <div className="flex flex-col gap-1">
    //             <div className="flex items-center gap-2">
    //                 <img src={logo} alt="StudyFlow logo" className="h-8 w-auto" />
    //                 <h1 className="text-2xl font-bold text-foreground">StudyFlow</h1>
    //             </div>
    //             </div>

    //             <nav className="flex absolute right-1 gap-6 justify-end">
    //             <Link to="/study-teams">
    //                 <Button variant="ghost" className="flex items-center gap-2">
    //                 <Users className="size-5" />
    //                 <span>Teams</span>
    //                 </Button>
    //             </Link>
    //             <Link to="/friends">
    //                 <Button variant="ghost" className="flex items-center gap-2">
    //                 <UserPlus className="size-5" />
    //                 <span>Friends</span>
    //                 </Button>
    //             </Link>
    //             <Link to="/settings">
    //                 <Button variant="ghost" className="flex items-center gap-2">
    //                 <Settings className="size-5" />
    //                 <span>Settings</span>
    //                 </Button>
    //             </Link>
    //             </nav>
    //         </div>
    //         </header>
            
    //         {/* <SidebarProvider>
    //             <TeamSidebar className="top-16"/>
    //             <SidebarTrigger size="sm"/>
    //         </SidebarProvider> */}

    //     </div>
    //     <div className="bg-background ">
    //             <TeamSidebar className="top-16"/>
    //             <SidebarTrigger size="sm"/>
    //     </div>
    // </div>
    // );

    return(
        <SidebarProvider>
            <MySidebar />
            <TeamSidebarTrigger />
        </SidebarProvider>
    )
}

