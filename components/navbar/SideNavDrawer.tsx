import { Menu, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import Link from "next/link";
import { LoggedUserTypes } from "../providers/profile-provider";
import { useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface SideNavbarProps {
    onLandingpage?: boolean;
    onShop?: boolean;
    onArtist?: boolean;
}

export function SideNavDrawer({ onLandingpage, onShop, onArtist }: SideNavbarProps) {

    const [searchResults, setSearchResults] = useState<LoggedUserTypes[]>([])
    const [typedValue, setTypedValue] = useState('')

    const searchUsers = async (searchParam: string) => {
        setTypedValue(searchParam)
        if (searchParam !== "") {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/search/${searchParam}`)
            if (res.data.length > 0) {
                setSearchResults(res.data)
            }
        } else {
            setSearchResults([])
        }
    }


    const closeDrawer = () => {
        setSearchResults([])
        setTypedValue("")
    }


    return (
        <div className="max-md:block hidden">
            <Drawer >
                <DrawerTrigger asChild>
                    <Button variant="outline"><Menu /></Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className='w-full pl-2 pr-4 relative space-x-2  flex flex-col justify-center  items-center'>
                        <div className="w-full flex my-3 gap-3 px-3">
                            <Input onChange={(e) => searchUsers(e.target.value)} value={typedValue} placeholder='search for artists . . .' className='h-full focus-visible:ring-0 focus-visible:ring-offset-0' />
                            <Button onClick={closeDrawer} variant="outline" className='h-full'>{typedValue !== "" ? <X className='h-5 w-5' /> : <Search className='h-5 w-5' />}</Button>
                        </div>
                        <div className='w-full  flex flex-col gap-1 bg-background  z-50'>
                            {searchResults?.map((result, i) => (
                                i<5 &&
                                <Link key={i} href={`/artist/profile/${result?._id}`}>
                                    <div className='w-full h-16 bg-secondary/25 items-center px-4 flex gap-3'>
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={result?.imageUrl} alt="image" />
                                            <AvatarFallback>Profile</AvatarFallback>
                                        </Avatar>
                                        <h1>{result.name}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <Link href="/shop"><Button variant="ghost" className="mr-auto px-10 w-full flex justify-start">Home</Button></Link>
                    <Separator />
                    <Link href="/artist"><Button variant="ghost" className="mr-auto px-10 w-full flex justify-start">Im an Artist</Button></Link>
                    <Separator />
                    <Link href="/shop/allorders"></Link><Button variant="ghost" className="mr-auto px-10 w-full flex justify-start">Orders</Button>
                    <Separator />
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="secondary">close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
