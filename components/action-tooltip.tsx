"use client";

import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

interface ActionTooltipProps {
    children: React.ReactNode;
    label: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

const ActionTooltip = ({
    label,
    children,
    side,
    align,
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    className="text-sm font-semibold capitalize"
                    side={side}
                    align={align}
                >
                    {label.toLowerCase()}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionTooltip;
