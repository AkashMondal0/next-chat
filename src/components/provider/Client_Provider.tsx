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
        queryFn: () => userData(currentProfile.loginToken),
    })

    useEffect(() => {
        if (data) {
            currentProfile.setState({ ...currentProfile.state, ...data })
        }
    }, [data])

    useEffect(() => {
        if (currentProfile.state.id) {
            socket.emit('user_connect', {
                id: currentProfile.state.id
            })
        }
        socket.on('message_for_user', (data: MessageDirect) => {
            currentProfile.updateConversation(data)
            if (data.conversationId === searchParam) {
                scrollIntoView.setState()
            }
        })
        return () => {
            socket.off('message_for_user')
        }
    }, [socket, searchParam, currentProfile.state.id])

    if (error) {
        <div>User Fetch error</div>
    }

    return (
        <>
        </>
    );
};

export default Client_Provider;