import { NavLink } from "react-router-dom";
import { GraduationCap, Users, Settings, UserPlus } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function Navbar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
            isActive
                ? "bg-neutral-800 text-white"
                : "text-gray-100 hover:text-gray-300"
        }`;

    return (
        <div className="border-b border-neutral-800 bg-neutral-900 text-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <GraduationCap className="h-5 w-5 text-gray-100" />
                    <span>StudyFlow</span>
                </div>

                {/* Menubar */}
                <Menubar className="bg-neutral-900 border-none">
                    <MenubarMenu>
                        <NavLink to="/teams" className={linkClasses}>
                            <MenubarTrigger className="flex items-center gap-2">
                                <Users className="h-4 w-4" /> Teams
                            </MenubarTrigger>
                        </NavLink>
                    </MenubarMenu>

                    <MenubarMenu>
                        <NavLink to="/friends" className={linkClasses}>
                            <MenubarTrigger className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" /> Friends
                            </MenubarTrigger>
                        </NavLink>
                    </MenubarMenu>

                    <MenubarMenu>
                        <NavLink to="/settings" className={linkClasses}>
                            <MenubarTrigger className="flex items-center gap-2">
                                <Settings className="h-4 w-4" /> Settings
                            </MenubarTrigger>
                        </NavLink>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}
