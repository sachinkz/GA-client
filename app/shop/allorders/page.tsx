"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const OrdersPage = () => {

    const [orders, setOrders] = useState<any>([])

    useEffect(() => {
        (async () => {
            const profile = localStorage.getItem('profile')

            if (profile) {
                const data = JSON.parse(profile)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-orders/${data._id}`)
                setOrders(res.data)
            }
        })()
    }, [])


    return (

        <div className="py-14 min-h-screen px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto text-foreground">
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 ">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 ">
                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Orders</p>

                    {orders?.length !== 0 && orders?.map((order: any) => (

                        <div key={order._id} className="flex flex-col justify-start items-start dark:bg-secondary bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-md">
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <Image width={100} height={100} className="w-full hidden md:block" src={order.imgUrl} alt="dress" />
                                    <Image width={500} height={500} className="w-full md:hidden" src={order.imgUrl} alt="dress" />
                                </div>
                                <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-md dark:text-white/60   leading-6 text-black/40">Ordered To: <span className='text-foreground text-2xl font-semibold capitalize'>{order.orderedTo.name}</span></h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> {order.style}</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Paper: </span> {order.paper}</p>
                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Faces: </span> {order.faces >3 ? "More than 3" : order.faces}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base  xl:text-lg leading-6 max-w-[320px]">{order.address?.fullName}, {order.address?.address}, {order.address?.pin}, {order.address?.mobile}</p>
                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">₹{order.amount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full '>
                                <div className='relative flex justify-between max-md:text-xs max-sm:text-[7px] h-4'>
                                    <p className={`absolute top-0 left-0 text-primary ${order.status==="UNPAYED"? "text-primary":"text-primary/50"}`} >Pending</p>
                                    <p className={`absolute top-0 left-[18%] text-primary ${order.status==="PAYED"? "text-primary":"text-primary/50"}`}>Placed</p>
                                    <p className={`absolute top-0 left-[35%] text-primary ${order.status==="ACCEPTED"? "text-primary":"text-primary/50"}`}>Work Accepted</p>
                                    <p className={`absolute top-0 left-[55%] text-primary ${order.status==="COMPLETED"? "text-primary":"text-primary/50"}`}>Work Completed</p>
                                    <p className={`absolute top-0 left-[77%] text-primary ${order.status==="SHIPPED"? "text-primary":"text-primary/50"}`}>Shipped</p>
                                    <p className={`absolute top-0 left-[95%] text-primary ${order.status==="DELIVERED"? "text-primary":"text-primary/50"}`}>Delivered</p>
                                </div>
                                <div className='w-full h-3 bg-black/5 mt-4'>
                                    <div className={`${order.status==="UNPAYED"&& "w-[0%]"} ${order.status==="PAYED"&& "w-[20%]"} ${order.status==="ACCEPTED"&& "w-[40%]"} ${order.status==="COMPLETED"&& "w-[60%]"} ${order.status==="SHIPPED"&& "w-[80%]"} ${order.status==="DELIVERED"&& "w-[100%]"} bg-violet-600 rounded-md h-full relative`}>
                                        <div className='w-3 h-3 rounded-full bg-violet-400 shadow-sm shadow-black border-4 border-violet-200 absolute right-0  '></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {
                        orders.length<=0&&
                        <div className='w-full h-24 flex justify-center items-center'>
                            <p className='text-2xl font-bold text-secondary'>No Orders yet!</p>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default OrdersPage