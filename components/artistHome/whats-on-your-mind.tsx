import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { MenuIcon,X } from 'lucide-react'
import { Input } from '../ui/input'
import CreatePostModal from '../modals/create-post-modal'
import { LoggedUserTypes } from '../providers/profile-provider'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

const WhatsOnYourMind = ({ toggleSidebarVisibility, showSidebar }: { toggleSidebarVisibility: () => void, showSidebar: boolean }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<LoggedUserTypes[]>([])
    const [typedValue, setTypedValue] = useState('')

    const searchUsers = async (searchParam: string) => {
        setTypedValue(searchParam)
        if (searchParam !== "") {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/search/${searchParam}`)
            if (res.data.length > 0) {
                setSearchResults(res.data)
            }
        }else{
            setSearchResults([])
        }
    }

    const closeDrawer = () => {
        setSearchResults([])
        setTypedValue("")
    }


    return (
        <div id='postDiv' className="h-56  z-20 bg-background flex flex-col items-center border rounded-lg border-secondary w-full">
            <div className="w-full max-sm:bg-background max-sm:z-30 bg-secondary max-sm:fixed max-sm:top-0 max-sm:left-0 relative h-[58px] flex justify-center items-center">
                <MenuIcon onClick={toggleSidebarVisibility} className={` hidden absolute left-2 ${!showSidebar && "max-md:block"}`} />
                <div className='w-full relative space-x-2  flex justify-center mr-10 ml-10 max-md:ml-14 items-center'>
                    <Input onChange={(e) => searchUsers(e.target.value)} value={typedValue} placeholder='search for artists . . .' className='h-full focus-visible:ring-0 focus-visible:ring-offset-0' />
                    <Button onClick={closeDrawer} variant="outline" className='h-full'><X className='h-5 w-5' /></Button>
                    <div className='absolute w-full flex flex-col gap-1 bg-background top-10 z-50'>
                        {searchResults?.map((result,i) => (
                            <Link key={i} href={`/artist/profile/${result?._id}`}>
                            <div  className='w-full h-16 bg-secondary/25 items-center px-4 flex gap-3'>
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
            </div>
            <div className="w-full h-full flex-col px-5 justify-around  flex items-center">
                <div className="w-full relative">
                    <Textarea placeholder="share your thoughts..." className="placeholder:text-foreground/50 bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0 " />
                    <Button className="absolute bottom-2 right-2" variant='default'>Post</Button>
                </div>
                <div onClick={() => setIsModalOpen(true)} className="w-full flex">
                    <CreatePostModal isOpen={isModalOpen} closeModal={setIsModalOpen} location='onTopImage' />
                    <CreatePostModal isOpen={isModalOpen} closeModal={setIsModalOpen} location='onTopVideo' />
                </div>
            </div>
        </div>
    )
}

export default WhatsOnYourMind