import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import useClientProfile from '@/hooks/client-profile';
import { Conversation, MessageDirect, typingState } from '@/interface/type';
import { cn } from '@/lib/utils';
import axios from "axios"
import qs from "query-string"
import { useMutation, useQuery } from '@tanstack/react-query'
import socket from '@/lib/socket';
import { Send } from 'lucide-react';
// import { pushNotification } from '@/Query/user';
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
            conversationId: data?.id || ""
        }
        setInputValue("")
        const url = qs.stringifyUrl({
            url: "/api/chat/direct/message/send",
            query: {
                receiverId: userData?.id,
            }
        });
        let res = await axios.post(url, newMessage)
        
        // send notification
        // const dataPush = {
        //     registrationToken: currentProfile.state.cloudMessageId,
        //     title: `${currentProfile.state.name} sent you a message`,
        //     body: inputValue,
        //     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Olivia_Rodrigo_with_Dr_Fauci_1.png/640px-Olivia_Rodrigo_with_Dr_Fauci_1.png"
        // }
        // pushNotification(dataPush)
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
        <div className={cn('navbar-blur', "w-full py-4 bottom-0 z-50 sticky border-t")}>
            <div className="flex justify-between items-center h-full w-full px-3">
                <div className="flex w-full items-center dark:bg-neutral-700 
                bg-neutral-200 dark:text-neutral-100 text-neutral-800
                rounded-xl">
                    <input onFocus={isTyping}
                        onBlur={stopTyping}
                        className='outline-none focus:none bg-transparent w-full p-2'
                        type="text" placeholder="send a message" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <Button type="button" variant={"ghost"} className='rounded-xl'
                        onClickCapture={() => mutation.mutate()} disabled={mutation.isPending}>
                        <Send />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatFooter;