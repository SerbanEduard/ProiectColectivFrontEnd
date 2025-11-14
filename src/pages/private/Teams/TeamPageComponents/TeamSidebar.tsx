// components/MySidebar.tsx
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
import { Home, Settings, User } from "lucide-react";

export function MySidebar() {
  const items = [
    { title: "Home", icon: Home, url: "/home" },
    { title: "Profile", icon: User, url: "/profile" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ];

  return (
    <Sidebar variant="floating">
        <SidebarHeader className="border">
            Heeyooo
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
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
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border">
            Heyooo
        </SidebarFooter>
    </Sidebar>
  );
}
