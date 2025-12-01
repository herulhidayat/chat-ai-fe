"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import ListChatHistoryFeature from "@/features/ListChatHistoryFeature"
import { SidebarIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AppSidebar() {
    const { state } = useSidebar()
    const router = useRouter()
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <div className="flex justify-between items-center">
                    <div className={`flex items-center gap-2 transition-all duration-200 ${state === "collapsed" ? "" : "p-2"}`} onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
                        {state === "collapsed" && isLogoHovered ? (
                            <SidebarTrigger className="size-8" />
                        ):(
                            <Image src="/logo.png" alt="Logo" width={32} height={32} />
                        )}
                        <span className={`text-xl font-bold transition-all duration-200 ${state === "collapsed" ? "hidden" : ""}`}>Chat Nyet</span>
                    </div>
                    {!(state === "collapsed") && (
                        <SidebarTrigger className="size-8" />
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => router.push("/")}>
                                    <SquarePenIcon />
                                    <span className={`${state === "collapsed" ? "hidden" : ""}`}>New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        </SidebarGroupContent>
                </SidebarGroup>
                {state === "expanded" && (
                    <ListChatHistoryFeature />
                )}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}