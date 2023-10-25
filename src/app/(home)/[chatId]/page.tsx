"use client"
import { FC } from 'react';
import ChatBody from './components/body';
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatFooter from './components/footer';
import useClientProfile from '@/hooks/client-profile';
import Header from './components/Header';
interface ChatPageProps {
  params: {
    chatId: string;
  }
}
const ChatPage: FC<ChatPageProps> = ({
  params
}) => {

  const currentProfile = useClientProfile()

  if (!currentProfile) {
    return null
  }

  console.log(currentProfile.conversations.find((conversation) => conversation.id === params.chatId))
  

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <Header />
      <ChatBody />
      <ChatFooter />
    </ScrollArea>
  );
};

export default ChatPage;