"use client";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "../ui/form";
import { Loader2, Plus, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";

import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import EmojiPicker from "../emoji-picker";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
    const router = useRouter();
    const { onOpen } = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });
            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                        onClick={() =>
                                            onOpen("messageFile", {
                                                apiUrl,
                                                query,
                                            })
                                        }
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        autoComplete="off"
                                        className="py-6 border-0 border-none px-14 bg-zinc-200/90 dark:bg-zinc-700/75 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder={`Message ${
                                            type === "conversation"
                                                ? name
                                                : "#" + name
                                        }`}
                                    />
                                    <div className="absolute flex items-center justify-end top-7 right-8 gap-x-2">
                                        <Button disabled={field.value.length === 0 || isLoading} type="submit" variant={"ghost"} className="p-0 bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 h-fit hover:bg-transparent" size={"sm"}>
                                            { isLoading ? <Loader2 strokeWidth={1} className="animate-spin"/> : <SendHorizonal /> }
                                        </Button>
                                        <EmojiPicker
                                            onChange={(emoji: string) =>
                                                field.onChange(
                                                    `${field.value}${emoji}`
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default ChatInput;
