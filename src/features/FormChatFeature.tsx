'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { IconPlus, IconX } from "@tabler/icons-react"
import { ArrowUpIcon, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query"
import api from "@/services/api.service"
import { Suspense, useRef, useState } from "react"
import { debounce, size } from "lodash"
import ChatHistoryFeature from "./ChatHistoryFeature"
import { useSearchParams } from "next/navigation"
import AppLoader from "@/components/ui/app-loader"

const queryClient = new QueryClient();

function FormChat() {
  const inputRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [tempUploadedFile, setTempUploadedFile] = useState<any>(null)
  const [sessionId, setSessionId] = useState<any>(null)

  const [dataDoc, setDataDoc] = useState<any>(null);
  const [historyChat, setHistoryChat] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>("");

  const urlSessionId = useSearchParams().get("sessionId");

  useQuery({
    queryKey: ["getChatHistory", urlSessionId],
    queryFn: async () => {
      if (!urlSessionId) return null;
      const res = await api.get(`/v1/chat-history/get-one?sessionId=${urlSessionId}`);

      if (res.data) {
        setSessionId(res.data?.sessionId)
        const historyRemap = res.data?.data?.map((item: any) => {
          if (item.role === "user") {
            return {
              type: "question",
              data: item.content
            }
          }
          if (item.role === "assistant") {
            return {
              type: "response",
              data: {
                answer: item.content
              }
            }
          }
        })

        setHistoryChat(historyRemap)
      }
      return res.data;
    },
    enabled: !!urlSessionId,
  })

  const chatToLLM = useMutation({
    mutationFn: async () => {
      const question = currentChat;
      setCurrentChat("");
      const response = await api.post("/v1/llm-client/chat", {
        docId: dataDoc?.docId || undefined,
        question: question,
        sessionId: sessionId || undefined,
      });

      if (response.data) {
        setHistoryChat((prev: any) => [...prev, {
          type: "response",
          data: response.data?.data
        }]);

        if (!sessionId) {
          setSessionId(response.data?.data?.sessionId)
        }
      }
      return response.data;
    },
  })

  const uploadFile = useMutation({
    mutationFn: async ({ file }: { file: FormData }) => {
      const res = await api.request({
        method: 'post',
        url: `/v1/file-upload/upload`,
        data: file,
      });
      if (size(res.data)) {
        setDataDoc(res.data)
      }
      return res.data;
    },
    onError: (error: any) => {
      setTempUploadedFile(null)
      inputRef.current = null
    },
  });

  const handleChat = (text: string) => {
    chatToLLM.mutate();
    setHistoryChat((prev: any) => [...prev, {
      type: "question",
      data: text
    }])
  }

  const debounceChat = debounce(setCurrentChat, 1000);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setTempUploadedFile(file)

      const formData: any = new FormData()
      formData.append('file', file)

      uploadFile.mutate({ file: formData })
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTempUploadedFile(file)

      const formData: any = new FormData()
      formData.append('file', file)

      uploadFile.mutate({ file: formData })
    }
  }


  return (
    <>
      <div className="flex justify-center w-full">
        <div className={`container xl:px-56 lg:px-32 md:px-16 px-8  relative min-h-screen`}>
          <div className="mt-4 overflow-y-auto">
            <ChatHistoryFeature data={historyChat} isLoading={chatToLLM.isPending} />
          </div>
          <div className={`min-w-full mx-auto ${Boolean(size(historyChat)) ? "bottom-0 sticky pb-4 pt-6 bg-linear-to-t from-zinc-50 from-90% to-transparent" : "flex items-center min-h-screen"}`}>
            <div className="w-full" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
              <InputGroup className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-6">
                <InputGroupTextarea onChange={(e) => setCurrentChat(e.target.value)} value={currentChat} placeholder="Ask, Search or Chat..." />
                <InputGroupAddon align="block-end" className="flex justify-between gap-2">
                  <div className="flex flex-row gap-2">
                    <InputGroupButton
                      variant="outline"
                      className="rounded-full cursor-pointer"
                      size="icon-xs"
                      onClick={() => inputRef.current?.click()}
                      disabled={uploadFile.isPending || dataDoc?.docId}
                    >
                      {uploadFile.isPending ?
                        <Loader2 className="animate-spin" />
                        : <IconPlus />
                      }
                    </InputGroupButton>
                    {(tempUploadedFile && dataDoc?.docId) && (
                      <div className="flex flex-row gap-2 items-center justify-center rounded-full border bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-medium">
                        {tempUploadedFile?.name}
                        <IconX
                          className="cursor-pointer"
                          onClick={() => {
                            setTempUploadedFile(null);
                            setDataDoc(null);
                          }}
                          size={14}
                        />
                      </div>
                    )}
                  </div>
                  <InputGroupButton
                    variant="default"
                    className="rounded-full"
                    size="icon-xs"
                    // disabled={chatToLLM.isLoading}
                    onClick={() => handleChat(currentChat)}
                  >
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                  </InputGroupButton>
                </InputGroupAddon>

                <div hidden>
                  <input ref={inputRef} className="input" id="fileInput" onChange={handleFileChange} type="file" accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/csv" multiple={false} />
                </div>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function FormChatFeature() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<AppLoader />}>
        <FormChat />
      </Suspense>
    </QueryClientProvider>
  );
}
