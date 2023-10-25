'use client'
import Sidebar from "@/app/(home)/components/sidebar";
import ChatSection from "@/app/(home)/components/chat-section";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/shared/ToggleTheme";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import socket from "@/lib/socket";
import useClientProfile from "@/hooks/client-profile";




export default function Index() {

  const profile = useUser()
  const currentProfile = useClientProfile()


  useEffect(() => {
    if (profile.user) {
      console.log('socket', socket.connected)
      socket.emit('user_connect', {
        id: profile.user?.sid,
        name: profile.user?.name,
        image: profile.user?.picture
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
    <div className="flex">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <ModeToggle />
      <ChatSection />
    </div>
  );
}