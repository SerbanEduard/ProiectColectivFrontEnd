import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

export function TeamSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      variant="ghost"
      className="mt-1.5 w-12 h-12 p-0 flex items-center justify-center"
      aria-label="Toggle Sidebar"
    >
      {open ? (
        <PanelRightClose className="w-7! h-7!" />
      ) : (
        <PanelLeftClose className="w-7! h-7!" />
      )}
    </Button>
  );
}
