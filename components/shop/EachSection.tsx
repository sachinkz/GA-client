"use client"
import React, { useEffect, useState } from 'react'
import { ArtistCard } from './ArtistCard'
import axios from 'axios';
import { ProfileSectionProps } from '../profilePage/ProfileSection';


interface EachSectionProps {
  sectionName: string;
}

const EachSection = ({ sectionName }: EachSectionProps) => {

  const [artists, setArtists] = useState<ProfileSectionProps[]>()
  const [profileId, setProfileId] = useState<string>("")


  useEffect(() => {
    (async () => {
      const profile = localStorage.getItem("profile")
      if (profile) {
        const data=JSON.parse(profile)
        setProfileId(data?._id)
      }
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getartists`)
      if (res.data.status) {
        setArtists(res.data.artists)
      }
    })()
  }, [])



  return (
    <div className='w-full flex flex-col px-5 mt-10'>
      <h1 className='text-xl mb-10 font-bold text-center '>{sectionName}</h1>
      <div className='w-full mx-auto mb-10 grid max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 justify-items-center grid-cols-4 gap-y-10 gap-x-5'>
        {artists?.map((artist) => (
          artist._id !== profileId &&
          <ArtistCard
            key={artist._id}
            artistData={artist}
          />

        ))}
      </div>
    </div>
  )
}

export default EachSection