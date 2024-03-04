"use client"
import ArtistSidebar from "@/components/artist-sidebar"
import { FeedsList } from "@/components/artistHome/feeds-list"
import { Separator } from "@/components/ui/separator"
import RightSection from "@/components/artistHome/right-section"
import { useEffect, useState } from "react"
import { LoggedUserTypes, useProfileContext } from "../providers/profile-provider"
import NotificationsPage from "./notifications"
import axios from "axios"
import OrdersArtist from "./orders-artist"


export default function HomePage({ profile }: { profile?: LoggedUserTypes }) {


  const [showSidebar, setShowSidebar] = useState(false)
  const [page, setPage] = useState<"feeds" | "notifications" | "orders">("feeds")
  const [nots, setNots] = useState<any>([])
  const [orders, setOrders] = useState<any>([])
  const [acceptedOrders, setAcceptedOrders] = useState<any>([])
  const [newNots, setNewNots] = useState(0)
  const [newOrders, setNewOrders] = useState(0)

  const toggleSidebarVisibility = () => {
    setShowSidebar(!showSidebar)
  }
  const { setProfile } = useProfileContext()

  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile))
      setProfile(profile)
    }
  }, [profile, setProfile])


  useEffect(() => {
    if (profile) {
      const fetchnots = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/notifications/${profile._id}`)
        setNots(res.data)
        const unseenNots = res.data.filter((d: any) => d.status === "NOTSEEN")
        setNewNots(unseenNots.length)
      }
      fetchnots()
    }
  }, [profile])

  useEffect(() => {
    (async () => {
      if (profile) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artist/all-orders/${profile._id}`)
        setOrders(res.data.allOrderRequests)
        setNewOrders(res.data.allOrderRequests.length)
        setAcceptedOrders(res.data.allAcceptedOrders)
      }
    })()
  }, [profile])


  return (
    <div className="min-h-screen max-h-screen px-24 max-xl:px-0">
      <div className="flex">
        <ArtistSidebar
          toggleSidebarVisibility={toggleSidebarVisibility}
          showSidebar={showSidebar}
          userId={profile?._id}
          changePage={setPage}
          newNots={newNots}
          newOrders={newOrders}
          userName={profile?.name.split(' ')[0]}
        />
        <Separator orientation="vertical" />
        {page === "feeds" &&
          <FeedsList
            showSidebar={showSidebar}
            toggleSidebarVisibility={toggleSidebarVisibility}
          />}
        {page === "notifications" &&
          <NotificationsPage
            toggleSidebarVisibility={toggleSidebarVisibility}
            showSidebar={showSidebar}
            setNewNots={setNewNots}
            setNots={setNots}
            nots={nots}
          />
        }
        {
          page === "orders" &&
          <OrdersArtist 
          orders={orders}
          showSidebar={showSidebar} 
          acceptedOrders={acceptedOrders}
          toggleSidebarVisibility={toggleSidebarVisibility}
           />
        }
        <div className="max-md:hidden">
          <RightSection userId={profile?._id} />
        </div>
      </div>
    </div>
  )
}