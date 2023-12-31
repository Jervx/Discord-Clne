import React from "react";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

// import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className="relative w-20 h-20">
                <Image fill src={value} alt="upload" className="rounded-full" />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
                    type="button"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    if (value && fileType === "pdf")
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-300 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-xs text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                <button
                    onClick={() => onChange("")}
                    className="absolute -top-2 -right-2 p-1 text-white rounded-full shadow-sm bg-rose-500"
                    type="button"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    );
};

export default FileUpload;
