"use client";
import { Member, Message, Profile } from "@prisma/client";
import React, { Fragment } from "react";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import ChatItem from "./chat-item";
import { format } from "date-fns";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

const DATE_FORMAT = "d MMMM yyyy, HH:mm";

const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketQuery,
    socketUrl,
    paramKey,
    paramValue,
    type,
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    if (status === "loading")
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    loading messages...
                </p>
            </div>
        );

    if (status === "error")
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-rose-500 my-4" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    something went wrong
                </p>
            </div>
        );

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome type={type} name={name} />
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map(
                            (message: MessageWithMemberWithProfile) => (
                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    currentMember={message.member}
                                    member={message.member}
                                    content={message.content}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    timeStamp={format(
                                        new Date(message.createdAt),
                                        DATE_FORMAT
                                    )}
                                    isUpdated={
                                        message.updatedAt !== message.createdAt
                                    }
                                    socketUrl={socketUrl}
                                    socketQuery={socketQuery}
                                />
                            )
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;
