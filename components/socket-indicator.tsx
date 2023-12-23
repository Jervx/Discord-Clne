"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

import React from "react";

type Props = {};

const SocketIndicator = (props: Props) => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <WifiOff className="w-4 h-4 text-orange-600 border-none" />
        );
    }

    return <Wifi className="w-4 h-4 text-green-600 border-none" />;
};

export default SocketIndicator;
