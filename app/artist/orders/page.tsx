import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderDataTypes{
    userId:string,
    artistId:string,
    name:string
    paper:string
    face:number
    mobile:string,
    address1:string
    address2:string
    city:string
    district:string
    pin:string ,
    suggestion:string,
    status:string
    style:string
    amount:number,
    image:string
  }

const page = () => {
    return (
        <div className="w-full mt-14 flex justify-center items-center">
            <Tabs defaultValue="Requests" className="w-full flex items-center  gap-3 flex-col px-10 max-md:px-3">
                <TabsList className="grid w-[350px] mb-5 grid-cols-2">
                    <TabsTrigger value="Requests">Requests</TabsTrigger>
                    <TabsTrigger value="Completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full" value="Requests">
                    <div className="bg-secondary w-full h-32">
                        <h1>hello</h1>
                    </div>
                </TabsContent>
                <TabsContent className="w-full" value="Completed">
                    <div className="bg-secondary w-full h-32">
                        <h1>hello</h1>
                    </div>
                </TabsContent>
               
            </Tabs>
        </div>
    )
}

export default page
