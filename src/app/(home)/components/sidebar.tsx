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
import { useUser } from '@auth0/nextjs-auth0/client';
import { Conversation, User } from '@/interface/type';
import { useEffect } from 'react';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import socket from '@/lib/socket';
import { useRouter } from 'next/navigation';

const fetchUsers = async () => {
    const res = await fetch('/api/chat/list')
    return res.json()
}
export default function Sidebar() {
    const currentProfile = useClientProfile()
    const router = useRouter()

    const { status, data, error, refetch } = useQuery<Conversation[]>({
        queryKey: ['chatList'],
        queryFn: fetchUsers,
    })

    useEffect(() => {
        if (data) {
            currentProfile.setConversations(data as Conversation[])
        }
        socket.on('user_chat_list', (data: User) => {
            console.log('user_chat_list', data)
            refetch()
            router.refresh()
        })
    }, [data, socket])

    // console.log(data)
    return (
        <div className='border-r'>
            <Card className="col-span-3 border-none">
                <ScrollArea className="h-screen w-96">
                    <div className="flex justify-between w-full p-6 items-center">
                        <CardTitle>Sky Solo Chat</CardTitle>
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
                                const otherUser = item.users.filter(uid => uid.id !== currentProfile.state.id)[0]
                                return <Button variant={"ghost"} className="flex items-center py-3 w-full h-auto rounded-2xl my-4" key={item.id}>
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={otherUser.imageUrl} alt="Avatar" />
                                        <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-start">{otherUser.name}</p>
                                        <p className="text-sm text-muted-foreground text-start">
                                            {otherUser.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">{new Date(item.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                                </Button>
                            })}
                        </div>
                    </CardContent>
                </ScrollArea>
            </Card>
        </div>
    )
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