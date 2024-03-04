import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const ReviewsSection = () => {
    return (
        <Card className="w-[60%] max-xl:w-full flex flex-col p-5 gap-3">
            <h1 className="text-center text-2xl pb-5 font-bold">Reviews</h1>
            <div className="flex gap-3 items-end mb-5">
                <Textarea className="" placeholder='Type your review here..' />
                <Button>Post</Button>
            </div>

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className='flex bg-secondary rounded-lg mt-2 flex-col'>
                            <div className='flex items-center  gap-3'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                                    <AvatarFallback>Profile pic</AvatarFallback>
                                </Avatar>
                                <h2 className='text-xl font-bold'>Sachin k </h2>
                            </div>
                            <p className='text-lg ml-14'>this is an awesome artist got the work on time, the work was more beautiful than i have expected, the package was really protected and iam happy with the work he provides</p>
                        </TableCell>
                        <TableCell className='flex bg-secondary rounded-lg mt-2 flex-col'>
                            <div className='flex items-center  gap-3'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                                    <AvatarFallback>Profile pic</AvatarFallback>
                                </Avatar>
                                <h2 className='text-xl font-bold'>Sachin k </h2>
                            </div>
                            <p className='text-lg ml-14'>this is an awesome artist got the work on time, the work was more beautiful than ive expected, the package was really protected and iam happy with the work he provides</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </Card>
    )
}

export default ReviewsSection