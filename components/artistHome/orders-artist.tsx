"use client"
import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import axios from 'axios'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ArrowRight, Download, MenuIcon } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Checkbox } from '../ui/checkbox'
import { useToast } from '../ui/use-toast'

const OrdersArtist = ({ orders, acceptedOrders, toggleSidebarVisibility, showSidebar }: { orders: any, acceptedOrders: any, toggleSidebarVisibility: () => void, showSidebar: boolean }) => {



    const [conditionsAccept, setConditionsAccept] = useState<boolean>(false)

    const { toast } = useToast()


    const handleDownload = async (imgUrl: string) => {
        const response = await fetch(imgUrl)
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl
        link.download = 'grabarts-work-image.jpg'
        link.click()
    }



    const updateWork = async (orderId: string) => {
        if (conditionsAccept) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/update-order/${orderId}`)
            window.location.reload()
        } else {
            toast({
                description: "Read the instructions carefully and select the checkbox",
                variant: "destructive"
            })
        }
    }



    return (
        <ScrollArea className="relative max-md:min-w-[350px] w-[1200px] max-md:w-full h-screen ">
            <MenuIcon onClick={toggleSidebarVisibility} className={` hidden absolute left-5 top-4 ${!showSidebar && "max-md:block"}`} />
            <h1 className='text-center text-2xl font-bold mt-5'>Orders</h1>
            <div className='w-full flex flex-col gap-1 mt-5'>

                <Tabs defaultValue='requests' className='w-full flex flex-col items-center justify-center'>
                    <TabsList className="grid w-[350px] mb-5 grid-cols-2">
                        <TabsTrigger value="requests">Requests</TabsTrigger>
                        <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsContent value='requests' className='w-full'>
                        {orders?.length !== 0 && orders?.map((order: any) => (

                            <div key={order._id} className={`flex flex-col justify-start items-start dark:bg-secondary   px-3 w-full rounded-md pb-2 bg-gray-50`}>
                                <div className="mt-4 md:mt-6 flex  justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4  w-32 flex flex-col">
                                        <Image width={100} height={100} className="w-full" src={order.imgUrl} alt="dress" />
                                        <Button className='h-6 mt-2' onClick={() => handleDownload(order.imgUrl)} >Download <Download className='h-3' /></Button>
                                    </div>
                                    <div className=" flex justify-between items-start w-full pb-8 ml-3 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> {order.style}</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Paper: </span> {order.paper}</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Faces: </span> {order.faces>3 ? "More than 3" : order.faces}</p>
                                                <p className='text-xs text-orange-500'>The order will be automatically rejected after 24 hours if you did not accept it </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start">
                                            <p className="text-base px-3 xl:text-lg font-semibold bg-green-400 rounded-lg text-background leading-6">₹{order.amount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center gap-3 justify-end'>
                                    <Button variant="destructive"
                                    >Reject work</Button>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant="default">Accept work</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <h1 className='font-bold text-2xl'>Accept Work</h1>
                                                <div className='flex-flex-col mt-4 w-full'>
                                                    <h2 className='font-bold text-xl text-center text-red-600'>Please Read carefully Before accepting</h2>
                                                    <p>Confirm that the faces in the image are same as the number of faces provided by the customer. If not reject the work or accept if you are ok with the amount payed by the customer</p>
                                                    <div className='w-full mt-5 flex '>
                                                        <div className="flex items-center space-x-2 ">
                                                            <Checkbox onClick={() => setConditionsAccept(!conditionsAccept)} id="terms" />
                                                            <label
                                                                htmlFor="terms"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Accept terms and conditions
                                                            </label>
                                                        </div>
                                                        <Button onClick={() => updateWork(order._id)} className='ml-auto'>Accept</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                        {
                            orders.length === 0 &&
                            <div className='w-full h-24 flex justify-center items-center text-black/25'>
                                NO WORK REQUESTS
                            </div>
                        }
                    </TabsContent>
                    <TabsContent value='accepted' className='w-full'>
                        {acceptedOrders?.length !== 0 && acceptedOrders?.map((order: any) => (

                            <div key={order._id} className={`${order.status == "SHIPPED" ? "bg-emerald-50" : "bg-gray-50"} flex flex-col justify-start items-start dark:bg-secondary bg-gray-50  px-3 w-full rounded-md pb-2`}>
                                <div className="mt-4 md:mt-6 flex  justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4  w-32 flex flex-col">
                                        <Image width={100} height={100} className="w-full" src={order.imgUrl} alt="dress" />
                                        <Button className='h-6 mt-2' onClick={() => handleDownload(order.imgUrl)} >Download <Download className='h-3' /></Button>
                                    </div>
                                    <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8 ml-3 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> {order.style}</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Paper: </span> {order.paper}</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Faces: </span> {order.faces}</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Address: </span></p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base  xl:text-lg leading-6 max-w-[320px]">{order.address?.fullName}, {order.address?.address}, {order.address?.pin}, {order.address?.mobile}</p>
                                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">₹{order.amount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex items-center gap-3 justify-end'>

                                    {order.status === "ACCEPTED" &&
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant="default">Work Finished</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <div className='w-full flex flex-col justify-center items-center'>
                                                    <h1 className='font-bold text-2xl'>Work Completed?</h1>
                                                    <div className='flex flex-col mt-4 w-full text-center gap-2'>
                                                        <p className='text-lg'>update the order status to work completed?</p>
                                                        <p className='text-xs flex items-center'><ArrowRight className='h-3 w-3' /> If the work is finished pack it well and courier it to the customers address</p>
                                                        <p className='text-xs flex items-center'><ArrowRight className='h-3 w-3' /> Then come back and update the status to Shipped in your accepted orders page</p>
                                                        <p className='text-xs flex items-center'><ArrowRight className='h-3 w-3' /> Make sure the packaging is proper</p>
                                                        <p className='text-xs flex items-center'><ArrowRight className='h-3 w-3' /> The amount will only be credited after the parcel reaches the customer without fail</p>
                                                        <div className='w-full mt-5 flex '>
                                                            <div className="flex items-center space-x-2 ">
                                                                <Checkbox onClick={() => setConditionsAccept(!conditionsAccept)} id="terms" />
                                                                <label
                                                                    htmlFor="terms"
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    I understood and agree with the conditions
                                                                </label>
                                                            </div>
                                                            <Button onClick={() => updateWork(order._id)} className='ml-auto'>Completed</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>}
                                    {order.status === "COMPLETED" &&
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant="default">Shipped</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <div className='w-full flex flex-col justify-center items-center'>
                                                    <h1 className='font-bold text-2xl'>Work Shipped?</h1>
                                                    <div className='flex flex-col mt-4 w-full text-center gap-2'>
                                                        <p className='text-lg'>Congrats you have completely finished your work</p>
                                                        <p className='text-xs flex items-center'><ArrowRight className='h-3 w-3' /> The amount will only be credited after the parcel reaches the customer without fail</p>
                                                        <div className='w-full mt-5 flex '>
                                                            <div className="flex items-center space-x-2 ">
                                                                <Checkbox onClick={() => setConditionsAccept(!conditionsAccept)} id="terms" />
                                                                <label
                                                                    htmlFor="terms"
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    I understood and agree with the conditions
                                                                </label>
                                                            </div>
                                                            <Button onClick={() => updateWork(order._id)} className='ml-auto'>SHIPPED</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    }
                                    {
                                        order.status === "SHIPPED" &&
                                        <p className='text-green-500'>
                                            WORK FINISHED SUCCESSFULLY
                                        </p>
                                    }
                                </div>
                            </div>
                        ))}
                        {
                            acceptedOrders.length === 0 &&
                            <div className='w-full h-24 flex justify-center items-center text-black/25'>
                                NO ACCEPTED WORKS
                            </div>
                        }
                    </TabsContent>
                </Tabs>

            </div>
        </ScrollArea>
    )
}

export default OrdersArtist