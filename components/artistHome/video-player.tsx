import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";



const VideoPlayer = ({ videoUrl,divWidth }: { videoUrl: string,divWidth:number }) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])



    return (
        <div className='mt-2'>
            {isClient && <ReactPlayer
                width={`${divWidth-10}px`}
                height={"600px"}
                
                url={videoUrl}
                controls={true}
                light={false}
                pip={false}
            />}
        </div>
    )
}

export default VideoPlayer