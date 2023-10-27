'use client'
import useClientProfile from "@/hooks/client-profile"
import socket from "@/lib/socket"
import { useUser } from "@auth0/nextjs-auth0/client"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ChatLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const profile = useUser()
  const currentProfile = useClientProfile()


  useEffect(() => {
    if (profile.user) {
      socket.emit('user_connect', {
        id: profile.user?.sid
      })
      currentProfile.setState({
        ...currentProfile.state,
        id: profile.user?.sid as string,
        name: profile.user?.name as string,
        imageUrl: profile.user?.picture as string,
        userId: profile.user?.sid as string,
      })
    }
    if (!profile) {
      return redirect("/auth")
    }
  }, [profile])


  return (
    <>
      {children}
    </>
  )
}