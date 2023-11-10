/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useSearchParams } from "next/navigation";
import useClientProfile from "@/hooks/client-profile";
import Sidebar from "@/app/(home)/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/header";
import ChatBody from "./components/body";
import ChatFooter from "./components/footer";
import Client_Provider from "@/components/provider/Client_Provider";


export default function Index() {
  const currentProfile = useClientProfile()
  const searchParam = useSearchParams().get("id")
  let conversation = currentProfile.conversations.find((conversation) => conversation.id === searchParam)

  return (
    <>
      <Client_Provider />
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
      </div>
    </>
  );
}