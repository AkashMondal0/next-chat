/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "./user-nav"
import SearchModal from "@/components/modal/search_user"
import { Conversation, MessageDirect, User, typingState } from '@/interface/type';
import { useEffect, useState } from 'react';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import socket from '@/lib/socket';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import useScrollToTop from '@/hooks/scrollToBottom';
import { getUserConversation } from '@/Query/user';
import GroupCreateModal from '@/components/modal/GroupCreate';

export default function Sidebar() {
    const currentProfile = useClientProfile()

    const fun = async () => {
        let data = await getUserConversation(currentProfile.state.id)
        return data
    }

    const { status, data, error, refetch} = useQuery({
        queryKey: ['user_chat_list'],
        queryFn: fun,
        enabled: currentProfile.state.id ? true : false,
    });

    const ArrangeDateByeDate = (data: Conversation[]) => {
        return data?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    useEffect(() => {
        if (data) {
            currentProfile.setConversations(data as Conversation[])
        }
        socket.on('user_chat_list', () => {
            refetch()
        })
        return () => {
            socket.off('user_chat_list')
        }
    }, [data, socket])


    return (
        <div>
            <Card className="col-span-3 border-none">
                <ScrollArea className={`h-[100dvh] w-full md:w-96 scroll-smooth`}>
                    <div className="flex justify-between w-full p-6 items-center">
                        <CardTitle>Next Chat</CardTitle>
                        <UserNav />
                    </div>
                    <CardContent className='p-0'>
                        <div className='flex justify-between items-center w-full mb-2 px-4'>
                            <SearchModal />
                            <GroupCreateModal/>
                            <Button variant={"ghost"}><Bell className='w-6 h-6 cursor-pointer' /></Button>
                        </div>
                        <div className='px-2'>
                            {status === "pending" && <div>
                                {Array.from({ length: 10 }).map((_, i) => <UserCardLoading key={i} />)}
                            </div>}
                            {status === "error" && <div>{error?.message}</div>}
                            {ArrangeDateByeDate(data ? currentProfile.conversations : [])?.map((item) => {
                                const otherUser = item.users.find(uid => uid.id !== currentProfile.state.id)
                                return <>{otherUser?.id ?
                                    <UserCard data={otherUser} key={item.id} item={item} />
                                    : <UserCardLoading key={item.id} />}</>
                            })}
                        </div>
                    </CardContent>
                </ScrollArea>
            </Card>
        </div>
    )
}


const UserCard = ({ data, item }: { data: User, item: Conversation }) => {
    const router = useRouter()
    const [isTyping, setIsTyping] = useState(false)
    const currentProfile = useClientProfile()
    const searchParam = useSearchParams().get("id")
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
            router.replace(`?id=${ChatId}`)
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
    }, [socket])

    useEffect(() => {
        if (searchParam === item.id) {
            ChatPage(searchParam)
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


const UserCardLoading = () => {
    return <div className="flex items-center my-4 py-3 w-full h-auto rounded-2xl px-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="ml-4 space-y-1">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
}