"use client"
import { Conversation, Group, MessageDirect } from '@/interface/type';
import { FC, useEffect, useRef } from 'react';
import useClientProfile from '@/hooks/client-profile';
import useScrollToTop from '@/hooks/scrollToBottom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GroupMessagesCard from './MessageCard-Group';

const dateFormat = (date: string | any) => {

    if (!date) {
        return ''
    }

    return new Date(date).toLocaleDateString("en-US",
        { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', })
}
interface GroupBodyProps {
    data: Group | undefined
    scrollToBottom?: number
}
const GroupBody: FC<GroupBodyProps> = ({
    data,
}) => {
    const currentProfile = useClientProfile()
    const ref = useRef<HTMLDivElement>(null)
    const scrollIntoView = useScrollToTop()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [scrollIntoView.state, data?.messages])

    useEffect(() => {
        ref.current?.scrollIntoView()
    }, [data?.messages])

    return (
        <div className="p-4">
            <div className='flex justify-center items-center h-[80vh]'>
                <div className='text-center'>
                    <div className='my-5 flex justify-center items-center'>
                        <Avatar className="h-28 w-28">
                            <AvatarImage src={data?.imageUrl} alt="Avatar" />
                            <AvatarFallback>{data?.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3 className='break-all'>
                        {data?.name}
                    </h3>
                    <h6 className="font-normal">
                        {/* {data?.description} */}
                        This is a group chat
                    </h6>
                </div>
            </div>
            <div className='w-full'>
                {data?.messages?.filter((value, index, dateArr) => index === dateArr
                    .findIndex((time) => (dateFormat(time.createdAt) === dateFormat(value.createdAt)))) // this is dateARRAY day by day 
                    .map((item, index) => {
                        return <>
                            <div className='w-full text-center m-2'>{dateFormat(item.createdAt)}</div>

                            {data?.messages?.map((message) => {
                                const member = data?.users?.find((user) => user.id === message.memberId)
                                return <GroupMessagesCard
                                    seen={message.seenBy?.length === data?.users?.length}
                                    profile={currentProfile.state.id === message.memberId}
                                    data={message}
                                    member={member}
                                    key={message.id} />
                            })}
                        </>
                    })}
            </div>
            <div ref={ref} />
        </div>
    );
};

export default GroupBody;




