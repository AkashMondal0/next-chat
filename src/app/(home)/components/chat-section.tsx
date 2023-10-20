import { SheetSide } from '@/components/shared/Sheet';
import { Card } from '@/components/ui/card';
import {FC} from 'react';

interface ChatSectionProps {}
const ChatSection:FC<ChatSectionProps> = () => {
  return (
    <>
      <h1>ChatSection</h1>
      <SheetSide/>

    </>
  );
};

export default ChatSection;