import { MessageDirect } from '@/interface/type';
import { FC } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface MessagesCardProps {
    data: MessageDirect
    profile: boolean
    isReply?: boolean
}
const MessagesCard: FC<MessagesCardProps> = ({
    data,
    profile
}) => {

    // if (profile) {
    //     return <></>
    // }
    return (
        <div className={`my-3 flex items-center ${profile ? "justify-end" : " justify-start"}`}>
            <div className={`px-4 py-1 rounded-2xl border 
            ${profile ? "bg-primary/90 text-primary-foreground" : "bg-accent"}`}>
                <div className='flex items-center gap-4'>
                    {data.content}
                    <div className='flex gap-1 mt-3'>
                        <div className='text-sm text-gray-500'>
                            {new Date(data.createdAt as Date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </div>
                        {profile ? <div className='text-sm text-gray-500'>
                            <CheckCheck size={20} className='text-sky-400' />
                        </div> : null}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessagesCard;