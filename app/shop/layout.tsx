import { SiteFooter } from '@/components/footer'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar onShop />
            {children}
            <SiteFooter/>
        </>
    )
}

export default ShopLayout