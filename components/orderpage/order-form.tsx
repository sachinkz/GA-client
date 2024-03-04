"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { FileUplaod } from "../file-uplaod"
import { redirect, useRouter } from "next/navigation"
import axios from "axios"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { LoggedUserTypes } from "../providers/profile-provider"
import { Loader } from "lucide-react"
// import detectFaces from "@/lib/visionApi"

const formSchema = z.object({
    imgUrl: z.string().min(2, {
        message: "Please upload an image.",
    }).max(200),
    paper: z.string().min(1, {
        message: "Please select the size of paper",
    }).max(20),
    style: z.string().min(1, { message: "please select a style " }).max(20),
    faces: z.string().max(10).optional(),
    suggestion: z.string().max(300)
})

export default function OrderForm({ param }: { param?: string }) {

    const [profile, setProfile] = useState<LoggedUserTypes>()
    const router = useRouter()
    const [faces, setFaces] = useState<number>(0)
    const [fetchingFaces, setFetchingFaces] = useState<boolean>(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imgUrl: "",
            paper: "",
            faces: "",
            style: "",
            suggestion: "",
        },
    })


    useEffect(() => {
        let data = localStorage.getItem("profile")
        if (data) {
            const pro = JSON.parse(data)
            setProfile(pro)
        } else {
            return redirect("/")
        }
    }, [])


    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (faces === 0) {
            values.faces = "1"
        } else {
            values.faces = faces > 3 ? "4" : faces.toString()
        }
        console.log(values)
        const body = {
            ...values,
            orderedBy: profile?._id,
            orderedTo: param
        }

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/order`, body)
        if (res.data.status) {
            router.push(`/shop/delivery/${res.data.createdOrder._id}`)
        }
    }

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-fit mt-10 flex px-5 flex-col">
                <FormField control={form.control} name="imgUrl" render={({ field }) => (
                    <FormItem className="self-center w-full">
                        <FormLabel className="">Select the Picture</FormLabel>
                        <FormControl>
                            <FileUplaod
                                endpoint="orderImage"
                                value={field.value}
                                onChange={field.onChange}
                                setFetchingFaces={setFetchingFaces}
                                setFaces={setFaces}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                {fetchingFaces && <p className="text-xl flex items-center text-center w-full bg-blue-700 justify-center p-3 rounded-xl animate-pulse">AI is identifying number of faces in the picture <Loader className="ml-3 animate-spin" /></p>}
                {faces !== 0 && <p className="text-orange-400">{faces} faces detected in the image, crop of hide the faces you dont want in the picture</p>}
                <FormField
                    disabled={faces !== 0}
                    control={form.control}
                    name="faces"
                    render={({ field }) => (
                        <FormItem >

                            <FormLabel>Faces in Picture</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={faces > 3 ? "4" : (faces.toString())} disabled={isLoading} defaultValue={field.value}>
                                    <SelectTrigger disabled={faces !== 0} className="min-w-full">
                                        <SelectValue placeholder="How many faces are there in the picture" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup >
                                            <SelectLabel>No of faces</SelectLabel>
                                            <SelectItem value="1">1 Face</SelectItem>
                                            <SelectItem value="2">2 Faces</SelectItem>
                                            <SelectItem value="3">3 Faces</SelectItem>
                                            <SelectItem value="4">more than 3</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The faces are detected by AI make sure to exclude or hide faces you dont want in the art
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="paper"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size of Paper</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} disabled={isLoading} defaultValue={field.value}>
                                    <SelectTrigger className="min-w-full">
                                        <SelectValue placeholder="Select the size of paper to make the art" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Paper size</SelectLabel>
                                            <SelectItem value="A5">{"A5 Paper (small)"}</SelectItem>
                                            <SelectItem value="A4">{"A4 Paper (medium)"}</SelectItem>
                                            <SelectItem value="A3">{"A3 paper (large)"}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                This will be the size of paper in which the art is made
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style of Art</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} disabled={isLoading} defaultValue={field.value}>
                                    <SelectTrigger className="min-w-full">
                                        <SelectValue placeholder="Select the style in which the Art should be made" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Style of Art</SelectLabel>
                                            <SelectItem value="pencil">Pencil Drawing</SelectItem>
                                            <SelectItem value="color">Color Pencil</SelectItem>
                                            <SelectItem value="painting">Painting</SelectItem>
                                            <SelectItem value="stencil">Stencil</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The Art will be made in the above provided style
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="suggestion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{"Suggestions (optional)"}</FormLabel>
                            <FormControl>
                                <Textarea onChange={field.onChange} disabled={isLoading} value={field.value} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </FormControl>
                            <FormDescription>
                                Please provide your suggestions on the artwork
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-fit self-center" type="submit">Check out</Button>
            </form>
        </Form>
    )
}
