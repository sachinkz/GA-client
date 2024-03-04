"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ArrowUp, Heart, LoaderIcon, MessageCircleDashedIcon, RefreshCcw, Share2, VerifiedIcon } from "lucide-react"
import WhatsOnYourMind from "./whats-on-your-mind"
import CommentSection from "./comment-section"
import { Button } from "../ui/button"
import { ElementRef, useEffect, useRef, useState } from "react"
import { PostDisplayModal } from "../modals/post-display-modal"
import VideoPlayer from "./video-player"
import { useProfileContext } from "../providers/profile-provider"
import { useFeedQuery } from "@/hooks/use-feeds-query"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import Link from "next/link"

interface MailListProps {
  toggleSidebarVisibility: () => void;
  showSidebar: boolean;
}

interface FeedProps {
  _id: string;
  userId: {
    imageUrl: string
    isTopten: boolean
    isVerified: boolean
    name: string;
    userId: string;
  }
  name: string;
  openComments?: boolean;
  caption: string;
  postUrl: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}


export function FeedsList({ toggleSidebarVisibility, showSidebar }: MailListProps) {


  const [feeds, setFeeds] = useState<FeedProps[]>([])
  const feedsDiv = useRef<ElementRef<"div">>(null)
  const [divWidth, setDivWidth] = useState<number>(0);
  const { toast } = useToast()



  const handleCommentOpen = (id: string) => {

    const newFeeds: FeedProps[] = feeds?.map((feed: FeedProps) => {
      if (feed._id === id) {
        feed.openComments = !feed.openComments;
      }
      return feed
    })
    setFeeds(newFeeds)
  }

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } = useFeedQuery()


  useEffect(() => {
    if (data) {
      const arr: FeedProps[] = data?.pages.map((page: any) => page.items).flat();
      const dataArray: FeedProps[] = arr?.map((item) => {
        const newItem = { ...item, openComments: false }
        return newItem
      })
      setFeeds(dataArray)
    }
  }, [data])

  const { profile } = useProfileContext()

  const likePost = async (postId: string) => {
    if (profile) {
      const body = {
        userId: profile._id,
        postId
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/likepost`, body)
      if (res.data.status) {
        const newArr = feeds.map((feed) => {
          if (feed._id === res.data.post._id) {
            return res.data.post
          } else {
            return feed
          }
        })
        setFeeds(newArr)
      }
    }
  }


  const handleShare = (postUrl: string) => {
    navigator.clipboard.writeText(postUrl);
    toast({
      description: "Share link is copied to clipboard",
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      //@ts-ignore
      if (scrollDiv?.scrollTop + scrollDiv?.clientHeight >= scrollDiv?.scrollHeight - 500) {
        scrollDiv?.removeEventListener("scroll", handleScroll)
        fetchNextPage()
        setTimeout(() => {
          scrollDiv?.addEventListener('scroll', handleScroll);
        }, 1000)
      }
    };

    const scrollDiv = feedsDiv.current;
    scrollDiv?.addEventListener('scroll', handleScroll);
    return () => {
      scrollDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage]);


  //getting width of the scrolling div to provide the width of videoplayer

  useEffect(() => {
    const handleResize = () => {
      const scrollDiv = feedsDiv.current;
      setDivWidth(scrollDiv ? scrollDiv.offsetWidth : 350 );
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (

    <div ref={feedsDiv} id="scrollDiv" className="custom-scroll-width relative overflow-y-scroll   dark:bg-secondary/20 w-[1000px]  h-screen">

      <WhatsOnYourMind showSidebar={showSidebar} toggleSidebarVisibility={toggleSidebarVisibility} />

      <div className="flex flex-col gap-10    ">

        {feeds?.map((item: any, i) => (
          <div className="bg-secondary/25 p-2 border border-secondary rounded-md" key={i}>
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <Link href={`/artist/profile/${item.userId?._id}`}>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.userId?.imageUrl} alt="@shadcn" />
                      <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                    <div className="font-semibold max-sm:text-sm capitalize flex items-center gap-2">{item.userId?.name} {item.userId?.isVerified && <VerifiedIcon className=" h-4 w-4 text-blue-400" />}</div>
                  </div>
                </Link>
              </div>

              <div className="text-xs ml-10 font-medium mt-2 max-sm:text-xs">{item.caption}</div>

            </div>

            <div className="w-full max-h-screen flex justify-center">
              <PostDisplayModal
                postId={item._id}
                likes={item.likes}
                commentsLength={item.comments?.length}
                isVideo={item.isVideo}
                likePost={likePost}
                profileId={profile._id}
                postUrl={item.postUrl} />
              {item.isVideo && <VideoPlayer divWidth={divWidth} videoUrl={item.postUrl} />}
            </div>
            <div className="flex gap-6 my-3 ml-2">
              <Heart onClick={() => likePost(item._id)} className={`${item.likes?.includes(profile._id) ? "text-red-500" : " text-primary"} cursor-pointer hover:scale-110 transition-transform duration-300`} />
              <MessageCircleDashedIcon className="cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => handleCommentOpen(item._id)} />
              <Share2 onClick={() => handleShare(item.postUrl)} className="cursor-pointer hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex gap-3 my-3 rounded-md bg-secondary px-2 py-2">
              <p className="text-xs"><span className="font-extrabold">{item.likes.length}</span> likes</p>
              <p className="text-xs"><span className="font-extrabold">{item.comments.length}</span> comments</p>
            </div>
            {item.openComments && <CommentSection postId={item._id} />}
          </div>
        ))}

      </div>
      {(status === "success" && hasNextPage && !isFetchingNextPage) && <div className="h-60 flex flex-col gap-4 justify-center items-center">
        <Button onClick={() => fetchNextPage()} variant="outline">load more posts <RefreshCcw className="h-4 w-4 ml-2 mt-1" /></Button>
      </div>}

      {(status === "pending" || isFetchingNextPage) && (
        <div className="h-60 flex gap-4 justify-center items-center">
          <p>Loading...</p>
          <LoaderIcon className="h-8 w-8 animate-spin" />
        </div>
      )}

      {status === "success" && !hasNextPage && (
        <div className="h-60 flex flex-col gap-4 justify-center items-center">
          <p>Nothing else here...</p>
          <a href="#postDiv"><Button variant="outline">go to top<ArrowUp /></Button></a>
        </div>
      )}
    </div>
  )
}

