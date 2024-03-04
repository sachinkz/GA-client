"use client"

import React, { useEffect } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import axios from 'axios'
import { MenuIcon } from 'lucide-react'


const NotificationsPage = ({ nots, setNewNots, setNots ,toggleSidebarVisibility,showSidebar}: { nots: any, setNewNots: any, setNots: any,toggleSidebarVisibility: () => void,showSidebar:boolean }) => {

  useEffect(() => {
    const updateNots = async () => {
      if (nots.length > 0) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/notifications/update/${nots[0].to}`)
        setNewNots(0)
      }
    }
    updateNots()
  }, [nots,setNewNots])

  return (
    <ScrollArea className="relative max-md:min-w-[350px] w-[1200px] max-md:w-full h-screen ">
      <MenuIcon onClick={toggleSidebarVisibility} className={` hidden absolute left-5 top-4 ${!showSidebar && "max-md:block"}`} />
      <h1 className='text-center text-2xl font-bold mt-10'>Notifications</h1>
      <div className='w-full flex flex-col gap-1 mt-10'>
        <Separator />
        {nots.length !== 0 && nots?.map((msg: any) => (
          <div key={msg._id} className={`flex flex-col h-16 ${msg.status === "NOTSEEN" ? "bg-secondary/100" : "bg-secondary/50"}`}>
            <div className='flex h-10 items-center gap-3 pl-3'>
              <Avatar className='w-8 h-8'>
                <AvatarImage src={msg.artistImg} alt="profile" />
                <AvatarFallback>profile</AvatarFallback>
              </Avatar>
              <p>{msg.message}</p>
            </div>
            <div className='h-6 w-full flex justify-end'>
              <p className='mx-2 mb-1 text-primary/50 text-[11px] italic'>{msg.createdAt}</p>
            </div>
            <Separator />
          </div>
        ))}

      </div>
    </ScrollArea>
  )
}

export default NotificationsPage