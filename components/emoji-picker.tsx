"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";
import EmojiPick, { Theme } from "emoji-picker-react";

// EmojiMart doesn't work after building
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();

    console.log(resolvedTheme)

    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="transition text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="mb-16 bg-transparent border-none shadow-none drop-shadow-none"
            >
                {/* <Picker
                    theme={resolvedTheme}
                    data={data}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                /> */}
                <EmojiPick
                    theme={resolvedTheme as Theme}
                    onEmojiClick={({ emoji }) => onChange(emoji)}
                />
            </PopoverContent>
        </Popover>
    );
};

export default EmojiPicker;
