"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Separator } from './ui/separator'
import { ArrowLeftFromLine, Bell, Home, ListOrdered, LogOut, MessageCircle, Settings, User2Icon } from 'lucide-react'
import { ModeToggle } from './ui/Mode-toggle'
import CreatePostModal from './modals/create-post-modal'
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link'

interface SidebarProps {
    showSidebar: boolean,
    toggleSidebarVisibility: () => void,
    userId?: string
    userName?:string
    changePage:Dispatch<SetStateAction<"feeds" | "notifications" | "orders">>,
    newNots:number
    newOrders:number
}

const ArtistSidebar = ({ showSidebar, toggleSidebarVisibility, userId ,userName,changePage,newNots,newOrders}: SidebarProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className={` ${showSidebar ? "flex flex-col " : "max-md:hidden"} bg-secondary/20  max-md:absolute max-md:top-0 max-md:left-0 max-md:bg-background h-screen max-md:z-50 min-w-[150px] border border-secondary  max-lg:min-w-[60px]`}>
            <>
                <div className='w-full h-[44px] flex items-center  justify-center'>
                    <h1 className='font-semibold text-xl max-lg:hidden '>GrabArts</h1>
                    <h1 className='font-semibold text-xl hidden max-lg:block '><ArrowLeftFromLine onClick={toggleSidebarVisibility} /></h1>
                </div>
                <Separator />
                <div className='flex flex-col  pt-3 justify-center'>
                    <Link href={"/artist"}>
                        <div onClick={()=>changePage("feeds")} className='flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                            <Home className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                            <p className='text-primary/75 hover:text-primary max-lg:hidden'>Home</p>
                        </div>
                    </Link>
                        <div onClick={()=>changePage("notifications")} className='relative flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                            <Bell className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                            <p className='text-primary/75 hover:text-primary max-lg:hidden'>Notifications</p>
                            {newNots>0 && <p className='absolute right-0  max-lg:right-3 max-lg:top-1 bg-green-400 text-secondary rounded-full text-xs px-1 font-bold'>{newNots}</p>}
                        </div>
                    {/* <Link href={"/messaging"}>
                        <div className='flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                            <MessageCircle className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                            <p className='text-primary/75 hover:text-primary max-lg:hidden'>Messages</p>
                        </div>
                    </Link> */}
                    <div onClick={() => setIsModalOpen(true)} >
                        <CreatePostModal location='onSidebar' isOpen={isModalOpen} closeModal={setIsModalOpen} />
                    </div>

                    <div onClick={()=>changePage("orders")} className='relative flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                        <ListOrdered className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                        <p className='text-primary/75 hover:text-primary max-lg:hidden'>Orders</p>
                        {newOrders>0 && <p className='absolute right-10  max-lg:right-3 max-lg:top-1 bg-green-400 text-secondary rounded-full text-xs px-1 font-bold'>{newOrders}</p>}
                    </div>
                    <Link className='max-md:hidden' href="/artist/settings">
                        <div className='flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                            <Settings className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                            <p className='text-primary/75 hover:text-primary max-lg:hidden'>Settings</p>
                        </div>
                    </Link>
                    <Link href={`/artist/profile/${userId}`}>
                        <div className='flex hover:bg-secondary/25 cursor-pointer pl-5 py-2 items-center gap-2'>
                            <User2Icon className='w-4 h-4 max-lg:h-6 max-lg:w-5' />
                            <p className='text-primary/75 hover:text-primary max-lg:hidden capitalize'>{userName}</p>
                        </div>
                    </Link>
                </div>
            </>
            <div className='mt-10 bg-secondary/75 py-3 gap-5 max-lg:flex-col flex justify-center items-center' >
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default ArtistSidebar