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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "./user-nav"
import SearchModal from "@/components/modal/search_user"
import { Conversation, User, typingState } from '@/interface/type';
import { useEffect, useState } from 'react';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import socket from '@/lib/socket';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const fetchUsers = async () => {
    const res = await axios.get('/api/chat/list')
    return res.data
}
export default function Sidebar() {
    const currentProfile = useClientProfile()


    const { status, data, error, refetch } = useQuery<Conversation[]>({
        queryKey: ['chatList'],
        queryFn: fetchUsers,
    })

    useEffect(() => {
        if (data) {
            currentProfile.setConversations(data as Conversation[])
        }
        socket.on('user_chat_list', (data: User) => {
            refetch()
        })

        return () => {
            socket.off('user_chat_list')
        }
    }, [data, socket])



    return (
        <div className='md:block hidden'>
            <Card className="col-span-3 border-none">
                <ScrollArea className={`h-[100dvh)] w-full md:w-96`}>
                    <div className="flex justify-between w-full p-6 items-center">
                        <CardTitle>Next Chat</CardTitle>
                        <UserNav />
                    </div>
                    <CardContent className='p-0'>
                        <div className='flex justify-between items-center w-full mb-2 px-4'>
                            <SearchModal />
                            <Button variant={"ghost"}><Bell className='w-6 h-6 cursor-pointer' /></Button>
                        </div>
                        <div className='px-2'>
                            {status === "pending" && <div>
                                {Array.from({ length: 10 }).map((_, i) => <UserCardLoading key={i} />)}
                            </div>}
                            {status === "error" && <div>{error?.message}</div>}
                            {data?.map((item) => {
                                const otherUser = item.users.find(uid => uid.id !== currentProfile.state.id)
                                return <>{otherUser?.id ?
                                    <UserCard data={otherUser} key={item.id} item={item} /> : <UserCardLoading key={item.id} />}</>
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

    const ChatPage = (ChatId: string) => {
        router.replace(`?id=${ChatId}`)
    }
    useEffect(() => {
        socket.on('_typing', (data_typing: typingState) => {
            if (data_typing.receiverId !== data.id && data_typing.conversationId === item.id) {
                setIsTyping(data_typing.typing)
            }
        })
    }, [socket])

    return <Button onClick={() => ChatPage(item.id)}
        variant={"ghost"} className="flex items-center py-3 w-full h-auto rounded-2xl my-4" key={item.id}>
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
        <div className="ml-auto font-medium">{new Date(item.lastMessageTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
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