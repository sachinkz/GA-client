"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { LoggedUserTypes } from '../providers/profile-provider'


const RightSection = ({ userId }: { userId?: string }) => {


    const [suggestions, setSuggestions] = useState<LoggedUserTypes[]>([])
    const [following, setFollowing] = useState<boolean>(false)
    const [processing,setProcessing] = useState<boolean>(false)

    useEffect(() => {
        if (userId) {
            (async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/suggestions/${userId}`)
                if (res.data.success) {
                    setSuggestions(res.data.suggestions)
                }
            })()
        }
    }, [following,userId])

    const followArtist = async (toFollow: string) => {
        setProcessing(true)
        const data = {
            artistToFollow: toFollow,
            loggedArtist: userId
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/follow`, data)
        if (res.data) {
            setFollowing(!following)
            setProcessing(false)
        }
    }


    return (
        <div className='flex flex-col border border-secondary min-h-screen px-5 gap-2 py-10  dark:bg-secondary/20'>
            <h1 className='text-xl font-semibold mb-2 text-center'>Suggested Artists</h1>
            {suggestions.length !== 0 && suggestions.map((account: any) => (
                <div key={account._id} className='flex bg-secondary/50 p-2 rounded-md items-center justify-between'>
                    <Link className='flex items-center gap-2' href={`/artist/profile/${account?._id}`}>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={account.imageUrl} alt="@shadcn" />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                        <p className='capitalize'>{account.name}</p>
                    </Link>
                    <Button disabled={processing} onClick={() => followArtist(account._id)} size="sm" className='ml-auto'>Follow</Button>
                </div>
            ))}
            <div className='flex w-full mt-3 justify-between max-lg:flex-col'>
                <Link href="https://brustro.in/products/brustro-bristol-ultra-smooth-paper-250-gsm-size-a2-10-sheets">
                    <div className='hover:scale-105 transition-transform duration-200 cursor-pointer p-2 flex flex-col items-center gap-3 '>
                        <Image priority={true} className='rounded-lg object-contain w-[100px] h-[80px]' width={100} height={200} alt='ad bristol' src="https://artcetera.in/wp-content/uploads/2023/07/A3-1.png" />
                        <button className='bg-secondary text-xs flex justify-center items-center gap-1 rounded-md px-3 py-1'>Purchase <ArrowUpRight className='w-5 mt-1 h-5' /></button>
                    </div>
                </Link>
                <Link href="https://brustro.in/products/brustro-bristol-ultra-smooth-paper-250-gsm-size-a2-10-sheets">
                    <div className='hover:scale-105 transition-transform duration-200 cursor-pointer p-2 flex flex-col items-center gap-3'>
                        <Image priority={false} className='rounded-lg object-contain w-[100px] h-[80px]' width={100} height={200} alt='ad bristol' src="https://images-na.ssl-images-amazon.com/images/I/81SM1+KmiNL._AC_UL600_SR600,600_.jpg" />
                        <button className='bg-secondary text-xs flex justify-center items-center gap-1 rounded-md px-3 py-1'>Purchase <ArrowUpRight className='w-5 mt-1 h-5' /></button>
                    </div>
                </Link>

                <Link href="https://brustro.in/products/brustro-bristol-ultra-smooth-paper-250-gsm-size-a2-10-sheets">
                    <div className='hover:scale-105 transition-transform duration-200 cursor-pointer p-2 flex flex-col items-center gap-3'>
                        <Image priority={false} className='rounded-lg object-contain w-[100px] h-[80px]' width={100} height={200} alt='ad bristol' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JyFgU7zF3DolZsFky3KlmOL4XVT_xIqYxsSWFyWyGG-f4bv4NdlDAtXL3A3x8lod0DM&usqp=CAU" />
                        <button className='bg-secondary text-xs flex justify-center items-center gap-1 rounded-md px-3 py-1'>Purchase <ArrowUpRight className='w-5 mt-1 h-5' /></button>
                    </div>
                </Link>

            </div>
            <div className='opacity-25 '>
                <Button variant="link">Grabarts</Button>
                <Button variant="link">Contact us</Button>
                <Button variant="link">About</Button>
                <Button variant="link">Terms&conditions</Button>
                <Button variant="link">Github</Button>
                <Button variant="link">Linkedin</Button>
                <Button variant="link">Instagram</Button>
            </div>
        </div>
    )
}

export default RightSection