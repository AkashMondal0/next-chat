/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import socket from "@/lib/socket";
import useClientProfile from "@/hooks/client-profile";
import { MessageDirect, User } from "@/interface/type";
import Sidebar from "@/app/(home)/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/header";
import ChatBody from "./components/body";
import ChatFooter from "./components/footer";
import useScrollToTop from "@/hooks/scrollToBottom";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/Query/user";
import Notification_Provider from "@/components/provider/Notificaiton_Provider";


export default function Index() {
  const currentProfile = useClientProfile()
  const searchParam = useSearchParams().get("id")
  const scrollIntoView = useScrollToTop()
  let conversation = currentProfile.conversations.find((conversation) => conversation.id === searchParam)

  const { status, data, error, refetch } = useQuery<User>({
    queryKey: ['getUserData'],
    queryFn: getUserData,
  })

  useEffect(() => {
    if (data) {
      // connect to socket
      socket.emit('user_connect', {
        id: data.id
      })
      // set user data
      currentProfile.setState({...currentProfile.state,...data})
    }
  }, [data])
  // console.log(data)

  // receive messages
  useEffect(() => {
    socket.on('message_for_user', (data: MessageDirect) => {
      currentProfile.updateConversation(data)
      if (data.conversationId === searchParam) {
        scrollIntoView.setState()
      }
    })
    return () => {
      socket.off('message_for_user')
    }
  }, [socket, searchParam])

  if (error) {
    <div>User Fetch error</div>
  }

  return (
    <>
      {status === "pending" ? <>Loading</> :
        <div className="flex w-full">
          <div className='md:block hidden'>
            <Sidebar />
          </div>
          {!conversation ?
            <>
              <div className="md:hidden block w-full">
                <Sidebar />
              </div>
              <div className="justify-center items-center hidden md:flex w-full h-[100dvh]">
                <img src="logo.png" />
              </div>
            </> :
            <ScrollArea className={`h-[100dvh] w-full rounded-md border scroll-smooth`}>
              {/* <Notification_Provider/> */}
              <Header data={conversation} />
              <ChatBody data={conversation} />
              <ChatFooter data={conversation} />
            </ScrollArea>}
        </div>}
    </>
  );
}