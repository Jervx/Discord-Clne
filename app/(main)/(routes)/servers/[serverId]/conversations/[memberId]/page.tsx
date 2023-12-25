import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import MediaRoom from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversations";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdProps {
    params: {
        memberId: string;
        serverId: string;
    };
    searchParams: {
        video?: boolean;
    };
}

const page = async ({ params, searchParams }: MemberIdProps) => {
    const profile = await currentProfile();

    if (!profile) return redirectToSignIn();

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
    });

    if (!currentMember) return redirect("/");

    const conversation = await getOrCreateConversation(
        currentMember.id,
        params.memberId
    );

    if (!conversation) return redirect(`/servers/${params.serverId}`);

    const { memberOne, memberTwo } = conversation;

    const otherMember =
        memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={otherMember.profile.name}
                imageUrl={otherMember.profile.imageUrl}
                serverId={params.serverId}
                type="conversation"
            />
            {!searchParams.video && (
                <MediaRoom chatId={conversation.id} audio={true} video={true} />
            )}
            {!searchParams.video && (
                <>
                    <ChatMessages
                        member={currentMember}
                        name={otherMember.profile.name}
                        chatId={conversation.id}
                        type="conversation"
                        apiUrl="/api/direct-messages"
                        paramKey="conversationId"
                        paramValue={conversation.id}
                        socketUrl="/api/socket/direct-messages"
                        socketQuery={{ conversationId: conversation.id }}
                    />
                    <ChatInput
                        name={otherMember.profile.name}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                        query={{ conversationId: conversation.id }}
                    />
                </>
            )}
        </div>
    );
};

export default page;
