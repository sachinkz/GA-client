"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"
import CommentSection from "../artistHome/comment-section"
import { ScrollArea } from "../ui/scroll-area"


interface PostDisplayModalProps {
    postUrl: string
    isVideo: boolean
    postId: string
    profileId: string
    likePost: (postId: string) => Promise<void>
    commentsLength: number
    likes: string[];
}


export function PostDisplayModal({ postUrl, isVideo, postId, likePost, profileId, likes, commentsLength }: PostDisplayModalProps) {


    return (
        <Dialog>
            <DialogTrigger asChild>

                {!isVideo && (<Image className="w-full rounded-md mt-2 object-cover" src={postUrl} width={400} height={400} alt="postImage" />)}

            </DialogTrigger>
            <DialogContent className="max-sm:w-[325px] p-2 flex justify-center pt-10 h-screen w-full">
                <ScrollArea className="pr-3 m-1 w-full">
                    <Image src={postUrl} width={400} height={400} alt="post-image" className="object-contain mb-5 w-full max-h-[500px] mt-10" />
                    <div className="flex gap-3 my-3 ml-2">
                        <Heart onClick={() => likePost(postId)} className={`${likes?.includes(profileId) ? "text-red-500" : " text-white"} cursor-pointer hover:scale-110 transition-transform duration-300`} />
                        <Share2 />
                    </div>
                    <div className="flex gap-3 my-3 rounded-md bg-secondary px-2 py-2">
                        <p className="text-xs"><span className="font-extrabold">{likes.length}</span> likes</p>
                        <p className="text-xs"><span className="font-extrabold">{commentsLength}</span> comments</p>
                    </div>
                    <CommentSection postId={postId} />
                </ScrollArea>

            </DialogContent>

        </Dialog>
    )
}
