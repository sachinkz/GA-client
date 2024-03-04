import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageDisplayModal } from "../modals/Image-display-modal";
import { GhostIcon } from "lucide-react";
import { ProfileSectionProps } from "./ProfileSection";



const PostsAndWorks = ({ artistData }:{artistData?:ProfileSectionProps}) => {

    return (
        <Tabs defaultValue="posts" className="w-full flex items-center  gap-3 flex-col px-10 max-md:px-3">
            <TabsList className="grid w-[350px] mb-5 grid-cols-2">
                <TabsTrigger value="posts">posts</TabsTrigger>
                <TabsTrigger value="works">works</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                <div className="grid w-full grid-cols-5 gap-5 max-xl:grid-cols-4 max-xs:gap-2 max-lg:grid-cols-3">
                    {artistData?.posts.map((post, i) => (
                        !post.isVideo&& 
                        <ImageDisplayModal key={i} imgUrl={post.postUrl} />
                    ))}
                </div>

            </TabsContent>
            <TabsContent value="works">
                <div className="grid w-full grid-cols-4 gap-5 max-xl:grid-cols-4 max-xs:gap-2 max-lg:grid-cols-3">
                    {artistData?.works?.map((work, i) => (
                        <ImageDisplayModal key={i} imgUrl={work.postUrl} />
                    ))}
                </div>
                {artistData?.works?.length === 0 && (
                    <div className="w-full flex justify-center gap-3  items-center h-40">
                        <h1 className="text-center text-2xl font-bold text-primary/50">No works yet! </h1>
                        <GhostIcon className=" text-primary/50" />
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}

export default PostsAndWorks;