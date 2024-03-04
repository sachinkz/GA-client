"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { FileUplaod } from "../file-uplaod"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ImageDownIcon, PlayCircle, PlusCircle } from "lucide-react"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import { useProfileContext } from "../providers/profile-provider"
import { redirectToSignIn } from "@clerk/nextjs"
import { Dispatch, SetStateAction } from "react"

const formSchema = z.object({
    postUrl: z.string().min(2, {
        message: "Please upload an image.",
    }).max(200),
    caption: z.string().max(200, { message: "maximum 200 characters allowed" }),
})

interface CreatePostModalProps {
    isOpen: boolean,
    closeModal: Dispatch<SetStateAction<boolean>>,
    location: "onSidebar" | "onTopImage" | "onTopVideo"
}

export default function CreatePostModal({ isOpen, closeModal, location }: CreatePostModalProps) {

    const router = useRouter()

    const { profile } = useProfileContext()

    if (!profile) {
        redirectToSignIn()
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            postUrl: "",
            caption: "",

        },
    })

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/post`, {
            ...values,
            userId: profile.userId,
            name: profile.name
        })
        if (res.data.createdPost) {
            window.location.reload()
        }
    }


    const handleClose = () => {
        form.reset()
    }



    return (
        <Dialog  onOpenChange={handleClose}>
            <DialogTrigger className="w-full flex gap-1">
                {location === "onSidebar" &&
                    <div className='flex w-full hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                        <PlusCircle className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                        <p className='text-primary/75 hover:text-primary max-lg:hidden'>Create Post</p>
                    </div>
                }
                {location === "onTopImage" &&
                    <div className="w-full mr-1 flex justify-center bg-secondary/50 hover:bg-secondary cursor-pointer py-2">
                        <ImageDownIcon />
                    </div>
                }
                {
                    location === "onTopVideo" &&
                    <div className="w-full flex justify-center bg-secondary/50 hover:bg-secondary cursor-pointer py-2">
                        <PlayCircle />
                    </div>
                }
            </DialogTrigger>
            <DialogContent className="max-sm:p-5">
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-10 flex px-5 max-md:px-0 items-center flex-col">
                        <FormField disabled={isLoading} control={form.control} name="postUrl" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="">Select the Picture or Video</FormLabel>
                                <FormControl>
                                    <FileUplaod endpoint="postImage" value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel >Caption</FormLabel>
                                    <FormControl >
                                        <Textarea {...field} onChange={field.onChange} disabled={isLoading} placeholder="Add a caption" className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-fit self-center" type="submit">Post</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
