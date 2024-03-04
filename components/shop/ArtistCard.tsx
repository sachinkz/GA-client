
import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { ProfileSectionProps } from "../profilePage/ProfileSection"



export function ArtistCard({ artistData }: { artistData: ProfileSectionProps }) {
    return (
        <Card className="w-fit max-w-[300px] bg-[#eeeeee] dark:bg-[#141414] dark:border-gray-800">
            <CardHeader className="p-0">
                <Link className="flex items-center gap-2 ml-5 my-3" href={`/artist/profile/${artistData._id}`}>
                    <Avatar>
                        <AvatarImage src={artistData.imageUrl} alt="Profile" />
                        <AvatarFallback>Profile pic</AvatarFallback>
                    </Avatar>
                    <CardTitle>{artistData.name}</CardTitle>
                </Link>
                <div className="flex shadow-lg justify-evenly py-2 bg-secondary">
                    <div><span className="font-semibold">{artistData.followers.length}</span><p> followers</p></div>
                    <div><span className="font-semibold">{artistData.posts.length}</span><p> Posts</p></div>
                    <div><span className="font-semibold">{artistData.works?.length}</span><p> works</p></div>
                </div>
            </CardHeader>
            <CardContent className="h-[150px]">
                <ScrollArea className="whitespace-nowrap mt-5 w-[260px] rounded-md border-none">
                    <div className="flex w-full space-x-4 py-4">
                        {artistData.posts.map((post: any) => (
                            !post.isVideo && <figure key={post._id} className="shrink-0">
                                <div className="overflow-hidden rounded-md">
                                    <Image
                                        src={post.postUrl}
                                        alt={`Photo by ${artistData.name}`}
                                        className="aspect-[1] rounded-lg h-[100px] w-[100px] object-cover"
                                        width={130} height={130}
                                    />
                                </div>
                            </figure>
                        ))}{
                            artistData.posts.length === 0 && (
                                <h1 className="text-center w-full text-2xl font-bold text-secondary">No Posts Yet</h1>
                            )
                        }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between mt-5">
                <Link href={`artist/profile/${artistData._id}`}> <Button variant="outline">Profile</Button></Link>
                <Link href={`shop/order/${artistData._id}`}><Button>Order</Button></Link>
            </CardFooter>
        </Card>
    )
}