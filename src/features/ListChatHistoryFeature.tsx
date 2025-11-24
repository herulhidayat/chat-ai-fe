'use client';

import { InputGroupButton } from "@/components/ui/input-group";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api.service";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

function ListChatHistory() {
  const router = useRouter();

  const getListChat = useQuery({
    queryKey: ["getListChat"],
    queryFn: async () => {
      const res = await api.get("/v1/chat-history/get-all");
      return res.data;
    },
  });
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="flex justify-between mb-3">
          <span>Chat History</span>
          <InputGroupButton
            variant="outline"
            className="rounded-full cursor-pointer"
            size="icon-xs"
            onClick={() => getListChat.refetch()}
            title="Refresh"
          >
            <RefreshCwIcon />
          </InputGroupButton>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {getListChat.isPending && (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                      <Skeleton className="w-full h-10" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
            {getListChat.data?.map((item: any, index: number) => (
              <SidebarMenuItem key={index} className="cursor-pointer">
                <SidebarMenuButton asChild>
                  <div onClick={() => router.push(`/chat?sessionId=${item.sessionId}`)}>
                    <span>{item.historyName}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}


export default function ListChatHistoryFeature() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListChatHistory />
    </QueryClientProvider>
  );
}
