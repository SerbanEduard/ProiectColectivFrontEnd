import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MySidebar } from "./TeamPageComponents/TeamSidebar";
import { TeamSidebarTrigger } from "./TeamPageComponents/TeamSidebarTrigger";
import { TeamDashboard } from "./TeamPageComponents/TeamDashboard";
import { useState, useMemo } from "react";
import TeamQuizzes from "./TeamPageComponents/TeamQuizzes";


function TeamFiles({teamId}:{teamId:string}) { return <div className="p-6">Files for team {teamId}</div>; }
function TeamEvents({teamId}:{teamId:string}) { return <div className="p-6">Events for team {teamId}</div>; }
function TeamCalendar({teamId}:{teamId:string}) { return <div className="p-6">Calendar for team {teamId}</div>; }
function ChatRoom({room}:{room:string}) { return <div className="p-6">Chat Room: {room}</div>; }
function VoiceRoom({room}:{room:string}) { return <div className="p-6">Voice Room: {room}</div>; }

export default function TeamPage() {
    const { teamId } = useParams<{teamId: string}>(); 

    const [selected, setSelected] = useState<string>('dashboard');

    const content = useMemo(() => {
        if (!teamId) return null;
        if (selected.startsWith('chat:')) return <ChatRoom room={selected.split(':')[1]} />;
        if (selected.startsWith('voice:')) return <VoiceRoom room={selected.split(':')[1]} />;
        switch (selected) {
            case 'dashboard': return <TeamDashboard teamId={teamId} />;
            case 'files': return <TeamFiles teamId={teamId} />;
            case 'events': return <TeamEvents teamId={teamId} />;
            case 'calendar': return <TeamCalendar teamId={teamId} />;
            case 'quizzes': return <TeamQuizzes teamId={teamId} />;
            default: return <TeamDashboard teamId={teamId} />;
        }
    }, [selected, teamId]);

    return(
        <SidebarProvider>
            <MySidebar onSelect={setSelected} />
            <div className="flex flex-col w-full h-screen">
                <div className="flex flex-col w-full flex-1">
                    <TeamSidebarTrigger />
                    <div className="border w-full h-16">

                    </div>
                    <div className="flex-1 w-full overflow-auto">
                        {content}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

