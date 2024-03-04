"use client"

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

export type LoggedUserTypes = {
  _id: string
  userId: string
  name: string
  email: string
  imageUrl: string
  reviews: string[]
  posts: string[]
  followers: string[]
  following: string[]
  isVerified: boolean
  isTopten: boolean
}


interface ContextProps {
  profile: LoggedUserTypes;
  setProfile: Dispatch<SetStateAction<LoggedUserTypes>>
}

const ProfileContext = createContext<ContextProps>({
  profile: {
    _id: "",
    userId: "",
    name:"",
    email: "",
    imageUrl: "",
    reviews: [],
    posts: [],
    followers: [],
    following: [],
    isVerified: false,
    isTopten: false,
  },
  setProfile: ()=> {}
});


export const ProfileContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [profile, setProfile] = useState<LoggedUserTypes>({
    _id: "",
    userId: "",
    name:"",
    email: "",
    imageUrl: "",
    reviews: [],
    posts: [],
    followers: [],
    following: [],
    isVerified: false,
    isTopten: false,
  })

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}


export const useProfileContext = () => useContext(ProfileContext)