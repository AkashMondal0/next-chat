"use client"
import { Conversation, MessageDirect } from '@/interface/type';
import { FC, useEffect } from 'react';
interface ChatBodyProps {
    data: Conversation | undefined
    scrollToBottom?: number
}
const ChatBody: FC<ChatBodyProps> = ({
    data,
    scrollToBottom
}) => {

    useEffect(() => {
        console.log('scroll to bottom')
    }, [scrollToBottom])

    return (
        <div className="p-4 min-h-screen">
            {data?.messages?.map((message) => (
                <>
                    <div key={message.id} className="text-sm">
                        {message.content}
                    </div>
                </>
            ))}
        </div>
    );
};

export default ChatBody;




