/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useSearchParams } from "next/navigation";
import useClientProfile from "@/hooks/client-profile";
import Sidebar from "@/app/(home)/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/private-chat/header";
import ChatBody from "./components/private-chat/body";
import ChatFooter from "./components/private-chat/footer";
import Client_Provider from "@/components/provider/Client_Provider";
import { useEffect, useState } from "react";
import GroupHeader from "./components/Group-chat/Header-Group";
import GroupBody from "./components/Group-chat/Body-Group";
import GroupFooter from "./components/Group-chat/Footer-Group";

type conversationType = "private" | "group" | "none"

export default function Index() {
  const currentProfile = useClientProfile()
  const [conversationType, setConversationType] = useState<conversationType>("none")
  const search_Param_private_id = useSearchParams().get("private_id")
  const search_Param_Group_id = useSearchParams().get("group_id")
  let conversation = currentProfile.conversations.find((conversation) => conversation.id === search_Param_private_id)

  let groupConversation = currentProfile.groups.find((conversation) => conversation.id === search_Param_Group_id)

  useEffect(() => {
    if (search_Param_private_id) {
      setConversationType("private")
    } else if (search_Param_Group_id) {
      setConversationType("group")
    } else {
      setConversationType("none")
    }
  }, [search_Param_private_id, search_Param_Group_id])

  return (
    <>
      <Client_Provider />
      <div className="flex w-full">
        <div className='md:block hidden'>
          <Sidebar />
        </div>
        {conversationType === "none" ?
          <NoConversation /> :
          <ScrollArea className={`h-[100dvh] w-full rounded-md border scroll-smooth`}>
            {conversationType === "private" ?
              <>
                {/* private conversation */}
                <Header data={conversation} />
                <ChatBody data={conversation} />
                <ChatFooter data={conversation} />
              </>
              :
              <>
                {/* group conversation */}
                <GroupHeader data={groupConversation} />
                <GroupBody data={groupConversation} />
                <GroupFooter data={groupConversation} />
              </>
            }
          </ScrollArea>}
      </div>
    </>
  );
}


const NoConversation = () => {
  return <>
    <div className="md:hidden block w-full">
      <Sidebar />
    </div>
    <div className="justify-center items-center hidden md:flex w-full h-[100dvh]">
      <img src="logo.png" />
    </div>
  </>
}
