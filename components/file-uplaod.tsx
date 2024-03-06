"use client"

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"
import axios from "axios";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile" | "orderImage" | "profileImage" | "postImage";
    setFaces?: (num: number) => void;
    setFetchingFaces?: (val: boolean) => void;
}



export const FileUplaod: React.FC<FileUploadProps> = ({
    endpoint,
    value,
    onChange,
    setFaces,
    setFetchingFaces,
}) => {

    const fileType = value.split(".").pop();


    const handleFileUploadComplete = async (res: any) => {
        onChange(res?.[0].url)

        if (setFetchingFaces && setFaces) {
            setFetchingFaces(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/detect-faces`, { imgUrl: res?.[0].url })
            if (response.data.status) {
                if (response.data.data <= 0) {
                    setFaces(1)
                } else {
                    setFaces(response?.data.data)
                }
            } else {
                console.log(response.data)
            }
            setFetchingFaces(false)
        }

    }


    if (value && fileType !== "pdf") {
        return (
            <div className="flex w-full justify-center border-2 border-primary/10 rounded-md">
                <div className="relative flex justify-center h-52 w-52 my-5">
                    <Image fill src={value} alt="Upload" className="rounded-lg h-52 w-52 object-cover" />
                    <button onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        )
    }
    if (value && fileType === "pdf") {
        return (
            <div className="relative flex flex-col gap-y-4 items-center  p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill indigo-200 stroke-indigo-400" />
                <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                    {value}
                </a>
                <button onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone className="mt-5 border-2 border-dashed border-primary/50" endpoint={endpoint} onClientUploadComplete={async (res) => {
            handleFileUploadComplete(res)
        }}
            onUploadError={(error) => {
                console.log(error)
            }}
        />
    );
}