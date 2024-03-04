"use client"
import OrderForm from '@/components/orderpage/order-form'
import { useParams } from 'next/navigation'
import React from 'react'

const OrderPage = () => {

  const params = useParams<{artistId:string}>()


  return (
    <div className='w-full flex justify-center  min-h-screen mt-14'>
      <OrderForm param={params?.artistId} />
    </div>
  )
}

export default OrderPage