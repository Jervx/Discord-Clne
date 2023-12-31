"use client";
import { useUser } from "@clerk/nextjs";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const resp = await fetch(
                    `/api/livekit?room=${chatId}&username=${name}`
                );
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error(e);
            }
        })()
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-col items-center justify-center flex-1">
                <Loader2 className="my-4 h-7 w-7 text-zinc-500 animate-spin" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
            data-lk-thene="default"
        >
            <VideoConference />
        </LiveKitRoom>
    );
};

export default MediaRoom;
