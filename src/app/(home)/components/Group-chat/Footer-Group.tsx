import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import useClientProfile from '@/hooks/client-profile';
import { Conversation, Group, GroupMessage, MessageDirect, typingState } from '@/interface/type';
import { cn } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query'
import socket from '@/lib/socket';
import { Send } from 'lucide-react';
import { sendGroupMessage } from '@/api-functions/group-chat';
// import { pushNotification } from '@/Query/user';


interface GroupFooterProps {
    data: Group | undefined
}
const GroupFooter: FC<GroupFooterProps> = ({
    data
}) => {
    const currentProfile = useClientProfile()
    const [inputValue, setInputValue] = useState("")

    const postMessage = async () => {
        const newMessage: GroupMessage = {
            content: inputValue,
            memberId: currentProfile.state.id,
            fileUrl: '',
            groupId: data?.id as string,
        }
        setInputValue("")
        let res = await sendGroupMessage(newMessage)
        return res
    }

    const isTyping = () => {
        const message: typingState = {
            groupId: data?.id,
            senderId: currentProfile.state.id,
            // receiverId: userData?.id,
            typing: true
        }
        socket.emit('_typing', message)
    }

    const stopTyping = () => {
        const message: typingState = {
            groupId: data?.id,
            senderId: currentProfile.state.id,
            // receiverId: userData?.id,
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

export default GroupFooter;