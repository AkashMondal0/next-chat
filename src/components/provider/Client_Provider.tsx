/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { userData } from '@/api-functions/user';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
import { GroupMessage, MessageDirect, User } from '@/interface/type';
import socket from '@/lib/socket';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setConversation, insertMessageToConversation } from '@/redux/slices/conversation'
import { RootState } from '@/redux/store';
interface Client_ProviderProps {
    children?: React.ReactNode
}
const Client_Provider: FC<Client_ProviderProps> = ({
    children
}) => {
    const currentProfile = useClientProfile()
    const searchParamPrivate_id = useSearchParams().get("private_id")
    // const searchParamGroup_id = useSearchParams().get("group_id")
    const scrollIntoView = useScrollToTop()
    const conversationState = useSelector((state: RootState) => state.conversation)
    const dispatch = useDispatch()

    const authFetch = async () => {
        const token = getCookie('profile')
        const data1 = await userData(token as string)
        currentProfile.setState({ ...currentProfile.state, ...data1 })
    }

    useEffect(() => {
        authFetch()
    }, [])

    useEffect(() => {
        if (currentProfile.state.id) {
            socket.emit('user_connect', {
                id: currentProfile.state.id
            })
        }
        socket.on('message_for_user', (data: MessageDirect) => {

            // currentProfile.updateConversation(data)
            dispatch(insertMessageToConversation({ message: data }))
            if (data.conversationId === searchParamPrivate_id) {
                scrollIntoView.setState()
            }
        })
        return () => {
            socket.off('message_for_user')
        }
    }, [searchParamPrivate_id, currentProfile.state.id])

    // if (error) {
    //     <div>User Fetch error</div>
    // }

    console.log("check message add function", conversationState.conversation)

    return (
        <>
        </>
    );
};

export default Client_Provider;