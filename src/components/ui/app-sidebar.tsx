import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import ListChatHistoryFeature from "@/features/ListChatHistoryFeature"
import Image from "next/image"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    <span className="text-xl font-bold">Chat Nyet</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <ListChatHistoryFeature />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}