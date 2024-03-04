import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import { cn } from "@/lib/utils"
import { ClerkProvider } from '@clerk/nextjs'
import { ProfileContextProvider } from '@/components/providers/profile-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const metadata: Metadata = {
  title: 'GrabArts',
  description: 'made by sachin',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider
            defaultTheme='dark'
            attribute='class'
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <ProfileContextProvider>
                {children}
                <Toaster />
              </ProfileContextProvider>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
