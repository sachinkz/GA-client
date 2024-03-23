"use client"

import React from 'react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios';
import { redirect, useParams } from 'next/navigation';

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Please enter your name",
    }).max(50,{message:"Name cannot have more than 50 characters"}),
    mobile: z.string().min(10,{message: "Please enter a valid mobile number",}).max(10,{message:"Please enter a valid mobile number"}),
    email: z.string().email({message:"please enter a valid email"}).min(1, {message: "Username must be at least 2 characters.",
    }).max(60),
    pin: z.string().min(6, { message: "please enter your pin" }).max(6,{message:"Pin cannot have more than 6 numbers"}),
    address: z.string().min(10,{message:"please provide your complete address"}).max(400)
})



const DeliveryForm = () => {

    const params=useParams()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            mobile: "",
            email: "",
            pin: "",
            address: "",
        },
    })

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const body={
            ...values,
            orderId: params?.orderId
        }

        const stripe=await loadStripe("pk_test_51Ogfr5SA6926HmEKrt1wg4Qv3oMony5yK6dTq8IX5sgl30ik8mV2OT5C5Ux57JkEHNM4M1tWouDAYTol7cwICYXA00CJiSYbAW");
        const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-checkout-session`,body)
        if(res.data.status){
            const result=await stripe?.redirectToCheckout({
                sessionId:res.data.id
            })

            if(result?.error){
                console.log(result.error)
            }
        }
    }






    return (
        <Form {...form}>
            <div className='flex justify-center w-full text-2xl font-bold text-center my-10'>
                <h1>Provide your Delivery address</h1>
            </div>
            {/* <div className='flex justify-center mb-10'>
                <div className="flex flex-col justify-center bg-secondary py-2 px-5 rounded-lg">
                    <div className='space-x-2'>

                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Select this address
                        </label>
                    </div>
                    <p className='ml-6 text-sm opacity-60'>sachin k, madathil house, keezhur, iritty...</p>
                </div>
            </div> */}
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
                <div className="space-y-8 px-6 w-full flex flex-col items-center">
                    <div className='flex w-[70%] max-md:w-[95%] max-md:flex-col items-center justify-around gap-5'>
                        <div className='w-[50%] gap-5 flex flex-col max-md:w-[95%]'>
                            <div>
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 datk:text-secondary/70">
                                            Full name
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0" placeholder=" Enter your full name" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div>
                                <FormField control={form.control} name="mobile" render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 datk:text-secondary/70">
                                            Mobile
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="  focus-visible:ring-0 focus-visible:ring-offset-0" placeholder=" Enter your mobile number" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <div className='w-[50%] gap-5 flex flex-col max-md:w-[95%]'>
                            <div>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 datk:text-secondary/70">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input className=" focus-visible:ring-0 focus-visible:ring-offset-0" placeholder=" Enter your email address" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div>
                                <FormField control={form.control} name="pin" render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 datk:text-secondary/70">
                                            Pin number
                                        </FormLabel>
                                        <FormControl>
                                            <Input className=" focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="pin number" disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                    </div>
                    <div className='w-[70%] max-md:w-[90%]'>
                        <FormField control={form.control} name="address" render={({ field }) => (
                            <FormItem >
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 datk:text-secondary/70">
                                    Delivery Address
                                </FormLabel>
                                <FormControl>
                                    <Textarea  className=" focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="House name/no, steet, town, city" disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <DialogFooter className=" px-6 py-4 flex justify-center">
                        <Button variant="default" type="submit" disabled={isLoading} >
                            Proceed To Pay
                        </Button>

                    </DialogFooter>
                </div>
            </form>
        </Form>
    )
}

export default DeliveryForm