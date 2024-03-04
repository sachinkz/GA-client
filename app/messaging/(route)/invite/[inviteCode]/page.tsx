import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"


interface InviteCodeProps{
    params:{
        inviteCode: string
    }
}

 const InviteCodePage= async({params}:InviteCodeProps)=>{

    const profile=await currentProfile()

    if(!profile){
        return redirectToSignIn()
    }

    if(!params.inviteCode){
        return redirect("/messaging");
    }

    const existingServer=await db.server.findFirst({
        where:{
            inviteCode: params.inviteCode,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(existingServer){
        return redirect(`/messaging/servers/${existingServer.id}`)
    }

    const server=await db.server.update({
        where:{
            inviteCode:params.inviteCode
        },
        data:{
            members:{
                create:[
                    {profileId: profile.id}
                ]
            }
        }
    })

    if(server){
        return redirect(`/messaging/servers/${server.id}`)
    }
    return null

}

export default InviteCodePage