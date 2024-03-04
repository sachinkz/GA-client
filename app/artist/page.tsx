import HomePage from '@/components/artistHome/home-page'
import { initialArtistProfile } from '@/lib/create-initial-profile'
import React from 'react'

const page =async () => {

  const loggedUser=await initialArtistProfile()
  
  return (
    <HomePage profile={loggedUser} />
  )
}

export default page