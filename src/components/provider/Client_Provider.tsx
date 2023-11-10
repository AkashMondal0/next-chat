/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { userData } from '@/Query/user';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
import { MessageDirect, User } from '@/interface/type';
import socket from '@/lib/socket';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';

interface Client_ProviderProps {
    children?: React.ReactNode
}
const Client_Provider: FC<Client_ProviderProps> = ({
    children
}) => {
    const currentProfile = useClientProfile()
    const searchParam = useSearchParams().get("id")
    const scrollIntoView = useScrollToTop()

    const { status, data, error } = useQuery<User>({
        queryKey: ['userData'],
        queryFn: userData,
    })

    useEffect(() => {
        if (data) {
            socket.emit('user_connect', {
                id: data.id
            })
            currentProfile.setState({ ...currentProfile.state, ...data })
        }
    }, [data])

    useEffect(() => {
        socket.on('message_for_user', (data: MessageDirect) => {
            currentProfile.updateConversation(data)
            if (data.conversationId === searchParam) {
                scrollIntoView.setState()
            }
        })
        return () => {
            socket.off('message_for_user')
        }
    }, [socket, searchParam])

    if (error) {
        <div>User Fetch error</div>
    }

    return (
        <>
            {children}
        </>
    );
};

export default Client_Provider;