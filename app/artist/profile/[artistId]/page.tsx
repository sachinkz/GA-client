"use client"
import PostsAndWorks from "../../../../components/profilePage/PostsAndWorks";
import ProfileSection, { ProfileSectionProps } from "../../../../components/profilePage/ProfileSection";
import ReviewsSection from "../../../../components/profilePage/ReviewsSection";
import { Separator } from "../../../../components/ui/separator";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "../../../../components/ui/use-toast";
import { ToastAction } from "../../../../components/ui/toast";


const ProfilePage = () => {

    const [artistData, setArtistData] = useState<ProfileSectionProps>()
    const params = useParams()
    useEffect(() => {
        const artistId = params?.artistId;
        const fetchArtistData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/profile/${artistId}`)
            if (res.data.status) {
                setArtistData(res.data.artistDetails)
            } else {

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Could not fetch artist information",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
        fetchArtistData()
    }, [params?.artistId])

    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <ProfileSection artistData={artistData&& artistData}/>
            <PostsAndWorks artistData={artistData&& artistData} />
            <Separator className="my-10" />
            <ReviewsSection />
        </div>
    );
}

export default ProfilePage;