import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "lucide-react";

import mrBrainwash from '@/assets/mr-brainwash.jpg'
import dFace from '@/assets/dface.jpg'
import pichiavo from '@/assets/pichiavo.jpg'
import Shepard from '@/assets/Shepard-fairey.jpg'
import devon from '@/assets/devon.jpg'

const GrabArtsArtistsSection = () => {
    return (
        <div className='w-full flex flex-col my-10 bg-secondary/25 pb-10'>
            <h1 className='text-xl mb-10 mt-5 font-bold text-center '>Our Artists</h1>
            <div className="flex justify-around max-xl:justify-between max-lg:justify-normal gap-5 max-xl:whitespace-nowrap max-xl:overflow-x-scroll">
                <div className="min-w-[200px] min-h-[240px] shadow-lg relative">
                    <Image  className="min-w-[200px] rounded-lg object-cover h-[200px]" src={devon} fill alt="artist-profile" />
                    <div className="w-full flex justify-between items-center p-2 absolute bottom-0 bg-secondary/90 rounded-b-md left-0">
                        <h3 className="font-semibold capitalize">Devon Rodreguez</h3>
                        <Button className="w-8 h-8 " variant="outline" size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                </div>
                <div className="min-w-[200px] min-h-[240px] shadow-lg relative">
                    <Image className="min-w-[200px] rounded-lg object-cover h-[200px]" src={dFace} fill alt="artist-profile" />
                    <div className="w-full flex justify-between items-center p-2 absolute bottom-0 bg-secondary/90 rounded-b-md left-0">
                        <h3 className="font-semibold capitalize">Devon Rodreguez</h3>
                        <Button className="w-8 h-8 " variant="outline" size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                </div>
                <div className="min-w-[200px] min-h-[240px] shadow-lg relative">
                    <Image className="min-w-[200px] rounded-lg object-cover h-[200px]" src={pichiavo} fill alt="artist-profile" />
                    <div className="w-full flex justify-between items-center p-2 absolute bottom-0 bg-secondary/90 rounded-b-md left-0">
                        <h3 className="font-semibold capitalize">Devon Rodreguez</h3>
                        <Button className="w-8 h-8 " variant="outline" size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                </div>
                <div className="min-w-[200px] min-h-[240px] shadow-lg relative">
                    <Image className="min-w-[200px] rounded-lg object-cover h-[200px]" src={mrBrainwash} fill alt="artist-profile" />
                    <div className="w-full flex justify-between items-center p-2 absolute bottom-0 bg-secondary/90 rounded-b-md left-0">
                        <h3 className="font-semibold capitalize">Devon Rodreguez</h3>
                        <Button className="w-8 h-8 " variant="outline" size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                </div>
                <div className="min-w-[200px] min-h-[240px] shadow-lg relative">
                    <Image className="min-w-[200px] rounded-lg object-cover h-[200px]" src={Shepard} fill alt="artist-profile" />
                    <div className="w-full flex justify-between items-center p-2 absolute bottom-0 bg-secondary/90 rounded-b-md left-0">
                        <h3 className="font-semibold capitalize">Devon Rodreguez</h3>
                        <Button className="w-8 h-8 " variant="outline" size="icon"><User className="w-4 h-4" /></Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GrabArtsArtistsSection;