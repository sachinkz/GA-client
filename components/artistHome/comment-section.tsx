'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Separator } from '../ui/separator'
import { useProfileContext } from '../providers/profile-provider'
import axios from 'axios'
import { X } from 'lucide-react'


interface CommentProps {
  _id: string
  artistId: string
  postId: string
  artistName: string
  imgUrl: string
  comment: string
  likes: string[],
  replies: {
    _id: string
    artistId: string
    artistName: string
    imgUrl: string
    comment: string
  }[],
  replying: boolean
}[]



const CommentSection = ({ postId }: { postId: string }) => {

  const [comments, setComments] = useState<CommentProps[]>([])
  const [reply, setReply] = useState<string>('')
  const [comment, setComment] = useState<string>('')


  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/allcomments/${postId}`)
      setComments(res.data)
    }
    fetchComments()
  }, [postId])

  const handleReplying = (id: string) => {
    const newArr = comments?.map((item: any) => {
      if (item._id === id) {
        item.replying = !item.replying;
      } else {
        item.replying = false
      }
      return item
    })
    setComments(newArr)
  }

  const { profile } = useProfileContext()

  const postComment = async () => {
    if (profile) {
      const body = {
        artistId: profile._id,
        artistName: profile.name,
        imgUrl: profile.imageUrl,
        comment,
        postId
      }
      console.log(profile)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/comment`, body)
      if (res.data) {
        setComments([res.data, ...comments])
        setComment('')
      }
    }
  }
  const postReply = async (commentId: string) => {
    if (profile) {
      const body = {
        artistId: profile._id,
        artistName: profile.name,
        imgUrl: profile.imageUrl,
        comment: reply,
        commentId
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/reply`, body)
      if (res.data) {
        const newComments = comments.map(comment => {
          if (comment._id === commentId) {
            comment.replies = [res.data, ...comment.replies]
          }
          return comment
        })
        setComments(newComments)
        handleReplying(commentId)
        setReply("")
      }
    }
  }
  

  const likeComment=async(id:string)=>{
    if(profile){
      const body={
        userId: profile._id,
        commentId:id
      }

      const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/likecomment`, body)
      if(res.data.status){
        const newArr=comments.map((comment)=>{
          if(comment._id===id){
            comment.likes=res.data.likes
          }
          return comment
        })
        setComments(newArr)
      } 
    }
  }

  return (

    <div className='flex flex-col'>
      <div className='flex gap-3'>
        <Input onChange={(e) => setComment(e.target.value)} value={comment} className='focus-visible:ring-0 focus-visible:ring-offset-0' placeholder='add a comment...' />
        <Button disabled={comment.length === 0} onClick={postComment} variant="secondary">post</Button>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
        {comments.map((comment) => (
          <div key={comment._id} className='p-2 bg-secondary/25'>
            <div className='flex space-x-1 items-center'>
              <Avatar className='w-5 h-5'>
                <AvatarImage src={comment.imgUrl} alt='profileImage' />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <p className='font-semibold flex-1 max-sm:text-sm'>{comment.artistName}</p>
              <p className='text-xs text-foreground/50'><span>{comment.likes.length}</span> likes</p>
              <HeartFilledIcon onClick={()=>likeComment(comment._id)} className={`cursor-pointer hover:scale-110 mt-[2px] ${comment.likes.includes(profile._id) ?"text-rose-600":"text-white"}`} />
              <p className='text-xs text-foreground/50'><span>{comment.replies.length}</span> replies</p>
              <Button size="sm" onClick={() => handleReplying(comment._id)} className='text-xs focus-visible:ring-0 focus-visible:ring-offset-0 p-0' variant="link">{!comment.replying ? "reply" : <X className='rounded-full bg-secondary ml-5 mt-1 h-4 w-4' />}</Button>
            </div>
            <div  >
              <p className='ml-7 max-sm:text-xs'>{comment.comment}</p>
            </div>

            {comment.replies.length > 0 && (<Separator className='my-2' />)}
            {comment.replies.length > 0 && (<p className='ml-10 text-xs'>replies</p>)}
            <div className='flex flex-col gap-2 mt-2'>
              {comment.replies.length > 0 && (
                comment.replies.map((reply) =>
                (<div key={reply._id} className='ml-10 p-2 rounded-md bg-secondary'>
                  <div className='flex space-x-1 text-sm items-center'>
                    <Avatar className='w-5 h-5'>
                      <AvatarImage src={reply.imgUrl} alt='profileImage' />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <p className='font-semibold flex-1 max-sm:text-sm'>{reply.artistName}</p>
                  </div>
                  <div>
                    <p className='ml-7 text-xs'>{reply.comment}</p>
                  </div>
                </div>
                )))}
            </div>
            {comment.replying && (
              <div className='mt-2'>
                <div className='flex gap-3'>
                  <Input onChange={(e) => setReply(e.target.value)} value={reply} className='focus-visible:ring-0 focus-visible:ring-offset-0' placeholder='add a comment...' />
                  <Button disabled={reply.length === 0} onClick={() => postReply(comment._id)} variant="secondary">post</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection