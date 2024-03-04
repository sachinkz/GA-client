import { ModalProvider } from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketProvider>
      <ModalProvider />
      <QueryProvider>
        {children}
      </QueryProvider>
    </SocketProvider>
  )
}
