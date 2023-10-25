import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface ChatFooterProps { }
const ChatFooter: FC<ChatFooterProps> = () => {
    
    return (
        <div className={cn('navbar-blur', "w-full h-20 bottom-0 z-50 md:px-10 sticky border-t")}>
            <div className="flex justify-between items-center h-full w-full px-3">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="send a message" />
                    <Button type="submit">Send</Button>
                </div>
            </div>
        </div>
    );
};

export default ChatFooter;