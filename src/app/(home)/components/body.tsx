"use client"
import { Conversation, MessageDirect } from '@/interface/type';
import { FC, useEffect, useRef } from 'react';
import MessagesCard from './message';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
interface ChatBodyProps {
    data: Conversation | undefined
    scrollToBottom?: number
}
const ChatBody: FC<ChatBodyProps> = ({
    data,
}) => {
    const currentProfile = useClientProfile()
    const ref = useRef<HTMLDivElement>(null)
    const scrollIntoView = useScrollToTop()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [scrollIntoView.state])

    return (
        <div className="p-4 min-h-screen">
            <div className='w-full'>
                {data?.messages?.map((message) => <MessagesCard
                    profile={currentProfile.state.id === message.memberId}
                    data={message} key={message.id} />)}
            </div>
            <div ref={ref} />
        </div>
    );
};

export default ChatBody;




