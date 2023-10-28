import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useClientProfile from '@/hooks/client-profile';
import { Conversation, MessageDirect, typingState } from '@/interface/type';
import { cn } from '@/lib/utils';
import axios from "axios"
import qs from "query-string"
import { useMutation, useQuery } from '@tanstack/react-query'
import socket from '@/lib/socket';
interface ChatFooterProps {
    data: Conversation | undefined
}
const ChatFooter: FC<ChatFooterProps> = ({
    data
}) => {
    const currentProfile = useClientProfile()
    let userData = data?.users.find((user) => user.id !== currentProfile.state.id)
    const [inputValue, setInputValue] = useState("")

    const postMessage = async () => {
        const newMessage: MessageDirect = {
            content: inputValue,
            memberId: currentProfile.state.id,
            fileUrl: '',
            conversationId: data?.id || "",
        }
        const url = qs.stringifyUrl({
            url: "/api/chat/direct/message",
            query: {
                receiverId: userData?.id,
            }
        });
        let res = await axios.post(url, newMessage)
        return res
    }

    const isTyping = () => {

        const message: typingState = {
            conversationId: data?.id,
            senderId: currentProfile.state.id,
            receiverId: userData?.id,
            typing: true
        }
        socket.emit('_typing', message)
    }

    const stopTyping = () => {
        const message: typingState = {
            conversationId: data?.id,
            senderId: currentProfile.state.id,
            receiverId: userData?.id,
            typing: false
        }
        socket.emit('_typing', message)
    }

    const mutation = useMutation({ mutationFn: postMessage })


    return (
        <div className={cn('navbar-blur', "w-full h-20 bottom-0 z-50 md:px-10 sticky border-t")}>
            <div className="flex justify-between items-center h-full w-full px-3">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input onFocus={isTyping}
                        onBlur={stopTyping}
                        type="text" placeholder="send a message" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <Button type="button" onClickCapture={() => mutation.mutate()} disabled={mutation.isPending}>Send</Button>
                </div>
            </div>
        </div>
    );
};

export default ChatFooter;