import { currentUser } from "@clerk/nextjs";
import {redirectToSignIn } from "@clerk/nextjs/server";
import axios from "axios";


export const initialArtistProfile=async()=>{

      const user = await currentUser()
    if(!user){
        return redirectToSignIn();
    }
    
    const userData={
            userId:user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl:user.imageUrl,
    }

    const profile = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getuser/${user.id}`)

    

    if(!profile.data.message){
        return profile.data;
    }
    
    const newProfile=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/newuser`,userData)
    
    return newProfile.data;

}




