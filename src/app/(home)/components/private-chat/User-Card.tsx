/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import useScrollToTop from '@/hooks/scrollToBottom';
import { Conversation, MessageDirect, User, typingState } from '@/interface/type';
import { useEffect, useState } from 'react';
import useClientProfile from '@/hooks/client-profile';
import socket from '@/lib/socket';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const UserCard = ({ data, item }: { data: User, item: Conversation }) => {
    const router = useRouter()
    const [isTyping, setIsTyping] = useState(false)
    const currentProfile = useClientProfile()
    const searchParam = useSearchParams().get("private_id")
    const Scroll = useScrollToTop()


    const seenCount = () => {
        return item.messages.filter((item) => item.memberId !== currentProfile.state.id).filter((item) => item.deleted === false)
    }

    const postSeen = async (ids: string[]) => {
        const messageSeen = {
            senderId: currentProfile.state.id,
            receiverId: data.id,
            data: ids,
        }
        let res = await axios.post("/api/chat/direct/message/seen", messageSeen)
        socket.emit("message_for_user_seen", messageSeen)
        currentProfile.conversationMessageSeen(item.id, messageSeen.data)
        return res
    }
    const mutation = useMutation({ mutationFn: postSeen })

    const ChatPage = (ChatId: string) => {
        if (seenCount().length > 0) {
            mutation.mutate(seenCount().map((item) => item.id) as string[])
        }
        if (searchParam !== item.id) {
            router.replace(`?private_id=${ChatId}`)
        }
    }

    useEffect(() => {
        socket.on('_typing', (data_typing: typingState) => {
            if (data_typing.receiverId !== data.id && data_typing.conversationId === item.id) {
                setIsTyping(data_typing.typing)
            }
        })
        socket.on('message_for_user_seen', (seen_data) => {
            if (seen_data.senderId !== currentProfile.state.id) {
                currentProfile.conversationMessageSeen(item.id, seen_data.data)
            }
        })
        return () => {
            socket.off('_typing')
            socket.off('message_for_user_seen')
        }
    }, [])

    useEffect(() => {
        if (searchParam === item.id) {
            ChatPage(searchParam) //TODO-issue here Scroll
        }
    }, [searchParam, Scroll])

    return <Button onClick={() => ChatPage(item.id)}
        variant={"ghost"}
        className={`${searchParam === item.id && "bg-accent"} flex items-center py-3 w-full h-auto rounded-2xl my-3`}
        key={item.id}>
        <div className={`flex w-full items-center`}>
            <Avatar className="h-12 w-12">
                <AvatarImage src={data.imageUrl} alt="Avatar" />
                <AvatarFallback>{data.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-start">{data.name}</p>
                <p className="text-sm text-muted-foreground text-start">
                    {isTyping ? "typing" : item.lastMessage}
                </p>
            </div>
        </div>
        <div className='w-20'>
            <div className="ml-auto font-medium">{new Date(item.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
            {searchParam !== item.id && seenCount().length > 0 ? <div className='rounded-full bg-black dark:bg-white mx-auto my-1
            text-white dark:text-black w-6 h-6 flex justify-center items-center'>
                {seenCount().length || 0}
            </div> : <div className='w-6 h-6' />}
        </div>
    </Button>
}

export default UserCard;