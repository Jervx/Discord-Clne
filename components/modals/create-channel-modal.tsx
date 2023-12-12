"use client";
import qs from "query-string"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "../../hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../ui/select";

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Channel name is required" })
        .refine((name) => name !== "general", {
            message: "Channel name cannot be 'general'",
        }),
    type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
    const { isOpen, onClose, type } = useModal();

    const router = useRouter();
    const params = useParams();

    const isModalOpen = isOpen && type === "createChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChannelType.TEXT,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url : "/api/channels",
                query : {
                    serverId : params?.serverId
                }
            })
            await axios.post(url, values);
            form.reset();
            router.refresh();
            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 overflow-hidden text-black bg-white">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl font-bold text-center text-zinc">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="text-black border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ChannelType</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="text-black capitalize border-0 outline-none bg-zinc-300/50 focus:ring-0 ring-offset-0 focus:ring-offset-0">
                                                    <SelectValue placeholder="Select a channel type" />
                                                    <SelectContent>
                                                        {Object.values(
                                                            ChannelType
                                                        ).map((type) => (
                                                            <SelectItem
                                                                key={type}
                                                                value={type}
                                                            >
                                                                {type.toLocaleLowerCase()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </SelectTrigger>
                                            </FormControl>
                                        </Select>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4 bg-gray-100">
                            <Button variant={"primary"} disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
