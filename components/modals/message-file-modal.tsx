"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    fileUrl: z.string().min(1, { message: "File is required" }),
});

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { apiUrl, query } = data;
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        },
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            await axios.post(url, { ...values, content: values.fileUrl });
            form.reset();
            router.refresh();
            handleClose();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 overflow-hidden text-black bg-white">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl font-bold text-center text-zinc">
                        Add an attatchment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 space-y-8">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                        </div>
                        <DialogFooter className="px-6 py-4 bg-gray-100">
                            <Button variant={"primary"} disabled={isLoading}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
