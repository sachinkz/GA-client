import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

import { HeartFilledIcon } from "@radix-ui/react-icons"
import Image from "next/image"

export function ImageDisplayModal({ imgUrl }: { imgUrl: string }) {
    return (
        <Dialog>
            <DialogTrigger className="bg-secondary" asChild>
                <Image alt="postimage" src={imgUrl} width={200} height={200} className="w-[160px] bg-secondary h-[160px] hover:-translate-y-2  hover:shadow-md border-2 border-black/10 hover:shadow-black/75 transition-all ease-in-out duration-500 cursor-pointer aspect-square max-sm:w-[100px] max-sm:h-[100px] object-cover rounded-md" />
            </DialogTrigger>
            <DialogContent className="max-sm:max-w-[355px] w-[500px]">
                <Image src={imgUrl} width={400} height={400} alt="post-image" className="object-contain w-[700px] mt-10" />
                <DialogFooter>
                    <div className="flex items-center gap-2">
                        <span><HeartFilledIcon className="w-5 h-5 text-red-500"/></span>
                        <p>600 likes</p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
