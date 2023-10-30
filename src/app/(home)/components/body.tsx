"use client"
import { Conversation, MessageDirect } from '@/interface/type';
import { FC, useEffect, useRef } from 'react';
import MessagesCard from './message';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    const user = data?.users.find((user) => user.id !== currentProfile.state.id)

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [scrollIntoView.state])

    return (
        <div className="p-4">
            <div className='flex justify-center items-center h-[80vh]'>
                <div className='text-center'>
                    <div className='my-5 flex justify-center items-center'>
                        <Avatar className="h-28 w-28">
                            <AvatarImage src={user?.imageUrl} alt="Avatar" />
                            <AvatarFallback>{user?.name}</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3>
                        {user?.name}
                    </h3>
                    <h6 className="font-normal">
                        {user?.email}
                    </h6>
                </div>
            </div>
            <div className='w-full'>
                {data?.messages?.map((message) => <MessagesCard
                    seen={message.deleted as boolean}
                    profile={currentProfile.state.id === message.memberId}
                    data={message} key={message.id} />)}
            </div>
            <div ref={ref} />
        </div>
    );
};

export default ChatBody;




