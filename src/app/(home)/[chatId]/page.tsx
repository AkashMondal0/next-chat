"use client"
import { FC, useEffect, useState } from 'react';
import ChatBody from './components/body';
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatFooter from './components/footer';
import useClientProfile from '@/hooks/client-profile';
import Header from './components/header';
import socket from '@/lib/socket';
import { MessageDirect } from '@/interface/type';
interface ChatPageProps {
  params: {
    chatId: string;
  }
}
const ChatPage: FC<ChatPageProps> = ({
  params
}) => {
  const currentProfile = useClientProfile()
  let conversation = currentProfile.conversations.find((conversation) => conversation.id === params.chatId)
  const [scrollToBottom, setScrollToBottom] = useState(0)

  useEffect(() => {
    socket.on('message_for_user', (data: MessageDirect) => {
      currentProfile.updateConversation(data)
      if (params.chatId === data.conversationId) {
        setScrollToBottom(scrollToBottom + 1)
      }
    })

    return () => {
      socket.off('message_for_user')
    }
  }, [params.chatId])

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <Header data={conversation} />
      <ChatBody data={conversation} scrollToBottom={scrollToBottom} />
      <ChatFooter data={conversation} />
    </ScrollArea>
  );
};

export default ChatPage;