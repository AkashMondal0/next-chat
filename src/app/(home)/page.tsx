'use client'
import ChatSection from "@/app/(home)/components/chat-section";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/shared/ToggleTheme";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import socket from "@/lib/socket";
import useClientProfile from "@/hooks/client-profile";
import { MessageDirect } from "@/interface/type";


export default function Index() {
  const profile = useUser()
  const currentProfile = useClientProfile()


  useEffect(() => {
    if (profile.user) {
      console.log('socket', socket.connected)
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
    socket.on('message_for_user', (data: MessageDirect) => {
      currentProfile.updateConversation(data)
    })
    if (!profile) {
      return redirect("/auth")
    }
  }, [profile])
  return (
    <div>
      <ModeToggle />
      <ChatSection />
    </div>
  );
}