import SparklesIcon from "@/components/ui/sparkles-icon";
import TextTypingMarkdown from "@/components/ui/text-typing-markdown";
import { size } from "lodash";

export default function ChatHistoryFeature({ data, isLoading }: any) {
    return (
        <>
            <div className={`flex flex-col gap-2 w-full ${(Boolean(size(data)) || isLoading) ? "min-h-[calc(100vh-12rem)]" : "hidden"}`}>
                {Boolean(size(data)) && data?.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                {item?.type == "question" && (
                                    <div className="flex flex-row justify-end gap-2 ps-28">
                                        <div className="flex flex-row gap-2">
                                            <div className="flex items-center justify-center rounded-md rounded-se-none bg-blue-100 px-3 py-2 text-xs font-medium">
                                                {item.data}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item?.type == "response" && (
                                    <div className="flex flex-row gap-2">
                                        <div className="px-3 py-2">
                                            <TextTypingMarkdown text={item?.data?.answer} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex flex-row gap-2 text-sm font-medium items-center">
                        <div className="text-blue-500">
                            <SparklesIcon width="24px" height="24px" />
                        </div>
                        <span className="animate-pulse">Generating response...</span>
                    </div>
                )}
            </div>
        </>
    );
}