/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { userData } from '@/api-functions/user';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
import { GroupMessage, MessageDirect, User, VideoCall } from '@/interface/type';
import socket from '@/lib/socket';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import ReactPlayer from 'react-player'
import { PeerContext } from './web-rtc_Provider';

interface Client_ProviderProps {
    children?: React.ReactNode
}
const Client_Provider: FC<Client_ProviderProps> = ({
    children
}) => {
    const currentProfile = useClientProfile()
    const searchParamPrivate_id = useSearchParams().get("private_id")
    const scrollIntoView = useScrollToTop()
    const usePeer = useContext(PeerContext)
    const [myStream, setMyStream] = useState() as any

    const [incomingCall, setIncomingCall] = useState(null) as any
    const [callAccepted, setCallAccepted] = useState(null) as any


    const authFetch = async () => {
        const token = getCookie('profile')
        const data1 = await userData(token as string)
        currentProfile.setState({ ...currentProfile.state, ...data1 })
    }

    const handleCallAns = async () => {
        const ans = await usePeer.createAnswer(incomingCall.offer)
        socket.emit('video_call_answer', {
            senderId: currentProfile.state.id,
            receiverId: incomingCall.senderId,
            conversationId: incomingCall.conversationId,
            answer: ans
        })
    }

    const handleCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true, video: true
            });
            setMyStream(stream)
            /* use the stream */
        } catch (err) {
            /* handle the error */
        }
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
            currentProfile.updateConversation(data)
            if (data.conversationId === searchParamPrivate_id) {
                scrollIntoView.setState()
            }
        })
        socket.on('video_call_request', (data: VideoCall | any) => {
            setIncomingCall(data)
        })

        socket.on('video_call_answer', (data: VideoCall | any) => {
            setCallAccepted(data)
            console.log(data)
            usePeer.setRemoteDescription(data.answer)
        })

        return () => {
            socket.off('message_for_user')
            socket.off('video_call_answer')
            socket.off('video_call_request')
        }
    }, [searchParamPrivate_id, currentProfile.state.id])

    // if (error) {
    //     <div>User Fetch error</div>
    // }
    useEffect(() => {
        handleCall()
    }, [])

    return (
        <>
            {incomingCall ? <Button onClick={handleCallAns}>
                pickup call
            </Button> : <></>}
            {callAccepted ? <Button onClick={handleCall}>
                open call
            </Button> : <></>}
            {callAccepted && <ReactPlayer url={myStream} height={200} width={200} playing />}
        </>
    );
};

export default Client_Provider;