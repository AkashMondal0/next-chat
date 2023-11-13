/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useQuery } from '@tanstack/react-query'
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "./user-nav"
import SearchModal from "@/components/modal/search_user"
import { Conversation, Group } from '@/interface/type';
import { useEffect } from 'react';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import socket from '@/lib/socket';
import { getUserConversation } from '@/api-functions/direct-chat';
import GroupCreateModal from '@/components/modal/GroupCreate';
import UserCard from './private-chat/User-Card';
import { getGroupConversation } from '@/api-functions/group-chat';
import GroupCard from './Group-chat/Card-Group';

export default function Sidebar() {
    const currentProfile = useClientProfile()

    const getPrivateConversationList = async () => {
        let data = await getUserConversation(currentProfile.state.id)
        return data
    }

    const getGroupConversationList = async () => {
        let data = await getGroupConversation(currentProfile.state.id)
        return data
    }

    const { status, data, error, refetch } = useQuery({
        queryKey: ['getPrivateConversationList'],
        queryFn: getPrivateConversationList,
        enabled: currentProfile.state.id ? true : false,
    });

    const GroupConversationList = useQuery({
        queryKey: ['getGroupConversationList'],
        queryFn: getGroupConversationList,
        enabled: currentProfile.state.id ? true : false,
    });

    const ArrangeDateByeDate = (data: Conversation[], data2: Group[]) => {
        let privateConversationList = data.map(item => {
            return { ...item, type: 'DIRECT' }
        })
        let groupConversationList = data2.map(item => {
            return { ...item, type: 'GROUP' }
        })

        return [...privateConversationList, ...groupConversationList]
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    useEffect(() => {
        if (data) {
            currentProfile.setConversations(data as Conversation[])
        }
        if (GroupConversationList.data) {
            currentProfile.setGroups(GroupConversationList.data as Group[])
        }
        socket.on('user_group_list', () => {
            GroupConversationList.refetch()
        })
        socket.on('user_chat_list', () => {
            refetch()
        })
        return () => {
            socket.off('user_chat_list')
            socket.off('user_group_list')
        }
    }, [data, GroupConversationList.data])

    // console.log(GroupConversationList.data)
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
                            <GroupCreateModal />
                            <Button variant={"ghost"}><Bell className='w-6 h-6 cursor-pointer' /></Button>
                        </div>
                        <div className='px-2'>
                            {status === "error" && <div>{error?.message}</div>}
                            {status === "pending" && <div>
                                {Array.from({ length: 10 }).map((_, i) => <UserCardLoading key={i} />)}
                            </div>}
                            <>
                                {ArrangeDateByeDate(data ? currentProfile.conversations : [], currentProfile.groups)
                                    ?.map((item: any | Conversation | Group, i) => {
                                        return <>{item.type === "DIRECT" ?
                                            <UserCard key={item.id} item={item} /> :
                                             <GroupCard item={item} key={item.id} />
                                        }</>
                                    })}
                            </>
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