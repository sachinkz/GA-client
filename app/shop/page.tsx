
import { TopAlert } from '@/components/navbar/TopAlert'
import EachSection from '@/components/shop/EachSection'
import GrabArtsArtistsSection from '@/components/shop/Ga-artists-section'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import shopBanner from "@/assets/shopBanner.png"



const ShopHome = () => {
  return (
    <div className='pt-14'>
      <div className='w-full relative'>
        <div className='pb-14 w-full p-3 flex flex-col justify-center items-center text-center gap-10'>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
            Find your favourite artist and order a custom artwork
          </h1>
          <h3 className="text-xl font-semibold tracking-tight">
            Each artists have their own unique styles, Check out their previous works and find who does the work as you desired.
          </h3>
          <TopAlert content={"🎉 start exploring our talented artists"} />
         
        </div>
        <div className='absolute top-0 left-0 w-full h-full'>
            <Image src={shopBanner} fill alt='banner' className='w-full -z-10 object-fill opacity-10'/>
        </div>
      </div>
      <EachSection sectionName='TopArtists' />
      <Separator/>
      <GrabArtsArtistsSection />
      <Separator/>
      <EachSection sectionName='Verified Artists' />
    </div>
  )
}

export default ShopHome