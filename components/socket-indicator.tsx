"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

import React from "react";
import ActionTooltip from "./action-tooltip";

type Props = {};

const SocketIndicator = (props: Props) => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <ActionTooltip label="Disconnected" side="left">
                <WifiOff className="w-4 h-4 text-orange-600 border-none" />
            </ActionTooltip>
        );
    }

    return (
        <ActionTooltip label="Connected" side="left">
            <Wifi className="w-4 h-4 text-green-600 border-none" />
        </ActionTooltip>
    );
};

export default SocketIndicator;
