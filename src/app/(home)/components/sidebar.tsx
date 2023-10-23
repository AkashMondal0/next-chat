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

const fetchUsers = async () => {
    const res = await fetch('/api/chat/list')
    return res.json()
}
export default function Sidebar() {
    const { user, error: UserError, isLoading } = useUser();
    const profile = useClientProfile()

    const { status, data, error } = useQuery<Conversation[]>({
        queryKey: ['chatList'],
        queryFn: fetchUsers,
    })

    useEffect(() => {
        if (data) {
            profile.setConversations(data as Conversation[])
        }
    }, [data])

    // console.log(data)
    return (
        <Card className="col-span-3 border-none">
            <ScrollArea className="h-screen w-96">
                <div className="flex justify-between w-full p-6 items-center">
                    <CardTitle>Sky Solo Chat</CardTitle>
                    <UserNav />
                </div>
                <CardContent>
                    <SearchModal />
                    <div className="space-y-8">
                        {status === "pending" && <div>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div className="flex items-center space-x-4 my-2" key={i}>
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-[150px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </div>}
                        {status === "error" && <div>{error?.message}</div>}
                        {data?.map((item) => {
                            const otherUser = item.users.filter(uid => uid.id !== user?.sid)[0]
                            return <div className="flex items-center my-2" key={item.id}>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={otherUser.imageUrl} alt="Avatar" />
                                    <AvatarFallback>{otherUser.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{otherUser.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {otherUser.email}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">{new Date(item.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                            </div>
                        })}
                    </div>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}