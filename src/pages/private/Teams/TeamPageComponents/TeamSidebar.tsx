// components/MySidebar.tsx
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { Home, Settings, User } from "lucide-react";
import { useState } from "react";

export function MySidebar() {
  const items = [
    { title: "Home", icon: Home, url: "/home" },
    { title: "Profile", icon: User, url: "/profile" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  const subItems = [
    { title: "Files", icon: Home },
    { title: "Events", icon: Home}
  ]

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    Home: false,
    Profile: false,
    Settings: false,
  });

  return (
    <Sidebar variant="floating">
        <SidebarHeader className="border">
            Team name here
        </SidebarHeader>
        <SidebarContent>
          <Collapsible>
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm">Chat Rooms</SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenu>
                  {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                          <a href={item.url} className="flex items-center gap-2">
                          <item.icon size={16} />
                          {item.title}
                          </a>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenu>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible>
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm">Voice Rooms</SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenu>
                  {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                          <a href={item.url} className="flex items-center gap-2">
                          <item.icon size={16} />
                          {item.title}
                          </a>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenu>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible>
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm">Chat Rooms</SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenu>
                  {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                          <a href={item.url} className="flex items-center gap-2">
                          <item.icon size={16} />
                          {item.title}
                          </a>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenu>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible>
            <SidebarGroup>
              <CollapsibleTrigger>
                <SidebarGroupLabel className="font-bold text-sm">Chat Rooms</SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarGroupContent>
                  <SidebarMenu>
                  {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                          <a href={item.url} className="flex items-center gap-2">
                          <item.icon size={16} />
                          {item.title}
                          </a>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenu>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarGroup>
            <SidebarGroupContent>
                  <SidebarMenu>
                  {subItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <div>
                          <item.icon size={16} />
                          {item.title}
                        </div>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
                  </SidebarMenu>
              </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border">
            Heyooo
        </SidebarFooter>
    </Sidebar>
  );
}
