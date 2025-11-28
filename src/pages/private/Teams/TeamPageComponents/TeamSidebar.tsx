// components/MySidebar.tsx
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { BookOpenText ,AudioLines, CalendarClock, CalendarDays, ChevronDown, ChevronUp, FolderClosed, LayoutDashboard, MessageSquareText, UsersRound } from "lucide-react";
import { useState } from "react";

export function MySidebar({ onSelect }: { onSelect: (key: string) => void }) {
  const [chatsAreOpen, setChatsAreOpen] = useState(false);
  const [voicesAreOpen, setVoicesAreOpen] = useState(false);

  const chatRooms = [
    { title: "Announcement"},
    { title: "General"},
    { title: "Memes"},
  ]

  const voiceRooms = [
    { title: "General", peopleOn:10},
    { title: "Daily Meeting Room", peopleOn:3},
    { title: "Relaxing", peopleOn:4}
  ]

  return (
    <Sidebar variant="floating">
        <SidebarHeader>
            HEADER
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel onClick={() => onSelect('dashboard')} className="font-bold text-sm h-10 hover:text-primary hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-8 text-xl">
                    <LayoutDashboard/>
                    Dashboard
                  </div>
                </SidebarGroupLabel>     
            </SidebarGroupContent>
          </SidebarGroup>
          <Collapsible
            open={chatsAreOpen}
            onOpenChange={setChatsAreOpen}
          >
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm justify-between hover:text-primary cursor-pointer">
                  <div className="flex items-center gap-4.5">
                    <MessageSquareText size={22}/>
                    Chat Rooms
                  </div>
                  { chatsAreOpen && 
                    <ChevronUp/>
                  }
                  {
                    !chatsAreOpen &&
                    <ChevronDown/>
                  }
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenuSub className="gap-y-2">
                  {chatRooms.map((item) => (
                      <SidebarMenuItem key={item.title} onClick={()=> onSelect(`chat:${item.title}`)}>
                        <SidebarMenuButton asChild>
                          <div>
                            {item.title}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenuSub>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible
            open={voicesAreOpen}
            onOpenChange={setVoicesAreOpen}
          >
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm justify-between hover:text-primary cursor-pointer">
                  <div className="flex items-center gap-4">
                    <AudioLines/>
                    Voice Rooms
                  </div>
                  { voicesAreOpen && 
                    <ChevronUp/>
                  }
                  {
                    !voicesAreOpen &&
                    <ChevronDown/>
                  }
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenuSub className="gap-y-3">
                  {voiceRooms.map((item) => (
                      <SidebarMenuItem className="cursor-pointer" key={item.title} onClick={()=> onSelect(`voice:${item.title}`)}>
                        <SidebarMenuButton asChild>
                          <div className="justify-between">
                            <p className="line-clamp-1">{item.title}</p>
                            <div className="flex items-center gap-1">
                              {item.peopleOn}
                              <UsersRound size={20}/>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenuSub>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel onClick={() => onSelect('files')} className="font-bold text-sm h-10 hover:text-primary hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-10">
                    <FolderClosed/>
                    Team Files
                  </div>
                </SidebarGroupLabel>     
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel onClick={() => onSelect('events')} className="font-bold text-sm h-10 hover:text-primary hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-10">
                    <CalendarClock/>
                    Events
                  </div>
                </SidebarGroupLabel>     
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel onClick={() => onSelect('calendar')} className="font-bold text-sm h-10 hover:text-primary hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-10">
                    <CalendarDays/>
                    Calendar
                  </div>
                </SidebarGroupLabel>     
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel onClick={() => onSelect('quizzes')} className="font-bold text-sm h-10 hover:text-primary hover:bg-accent cursor-pointer">
                  <div className="flex items-center gap-10">
                    <BookOpenText/>
                    Quizzes
                  </div>
                </SidebarGroupLabel>     
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            FOOTER
        </SidebarFooter>
    </Sidebar>
  );
}
