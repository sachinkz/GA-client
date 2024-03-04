"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { SideNavDrawer } from "./SideNavDrawer";
import { ModeToggle } from "../ui/Mode-toggle";
import { Input } from "../ui/input";
import { LoggedUserTypes } from "../providers/profile-provider";
import {useState } from "react";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search, X } from "lucide-react";


interface NavbarProps {
    onLandingpage?: boolean;
    onShop?: boolean;
}

const Navbar = ({ onLandingpage, onShop }: NavbarProps) => {

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
        <div className=" z-50 w-full h-14 border-b flex items-center fixed bg-background top-0 left-0 max-md:px-5 max-sm:px-2 px-10">
            <div className="flex items-center w-full">
                {onLandingpage &&
                    <>
                        <Link href={'/'}> <h3 className="text-xl font-semibold mr-5">
                            GrabArts
                        </h3></Link>
                        <Link className="max-md:hidden" href="/shop"><Button variant="ghost">Purchase Art</Button></Link>
                        <Link className="max-md:hidden" href="/artist"><Button variant="ghost">Artists</Button></Link>
                        <ModeToggle />
                        <div className="ml-auto">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </>
                }
                {onShop && (
                    <>
                        <Link href={"/shop"}><h3 className="text-xl font-semibold mr-5">
                            GrabArts
                        </h3></Link>

                        <Link className="max-md:hidden" href="/artist"><Button variant="ghost">Im an Artist</Button></Link>
                        <Link className="max-md:hidden" href="/shop/allorders"><Button variant="ghost">Orders</Button></Link>
                        <div className="ml-auto w-fit flex gap-3 items-center justify-around">
                            <div className='w-full max-md:hidden relative space-x-2  flex justify-center max-md:ml-14 items-center'>
                                <Input onChange={(e) => searchUsers(e.target.value)} value={typedValue} placeholder='search for artists . . .' className='h-full focus-visible:ring-0 focus-visible:ring-offset-0' />
                                <Button onClick={closeDrawer} variant="outline" className='h-full'>{typedValue!==""?<X className='h-5 w-5' />:<Search className='h-5 w-5'/>}</Button>
                                <div className='absolute w-full flex flex-col gap-1 bg-background top-10 z-50'>
                                    {searchResults?.map((result, i) => (
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
                            <ModeToggle />
                            <UserButton afterSignOutUrl="/" />
                            <SideNavDrawer onShop />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
