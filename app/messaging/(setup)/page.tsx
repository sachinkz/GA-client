import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {

    const profile = await initialProfile();
    const server =await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/messaging/servers/${server.id}`)
    }
    
    return redirect(`/messaging/invite/9a838f6b-0549-4c75-b3b7-0fe979671264`)
    // return ( 
    // <div className="flex h-screen justify-center items-center">
    //     <InitialModal/>
    // </div> );
}
 
export default SetupPage;