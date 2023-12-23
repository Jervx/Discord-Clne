"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

import React from "react";

type Props = {};

const SocketIndicator = (props: Props) => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="text-white bg-yellow-600 border-none"
            >
                Fallback : Polling Every 1s
            </Badge>
        );
    }

    return (
        <Badge
            variant="outline"
            className="text-white border-none bg-emerald-600"
        >
            Live : Realtime
        </Badge>
    );
};

export default SocketIndicator;
