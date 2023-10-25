import { FC } from 'react';
interface ChatBodyProps { }
const ChatBody: FC<ChatBodyProps> = () => {
    const tags = Array.from({ length: 500 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
        <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
                <>
                    <div key={tag} className="text-sm">
                        {tag}
                    </div>
                </>
            ))}
        </div>
    );
};

export default ChatBody;




