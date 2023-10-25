import { SheetSide } from '@/components/shared/Sheet';
import {FC} from 'react';
import Sidebar from '../../../components/sidebar/sidebar';
import { Button } from '@/components/ui/button';

interface ChatSectionProps {}
const ChatSection:FC<ChatSectionProps> = () => {
  return (
    <>
      <h1>ChatSection</h1>
      <SheetSide trigger={<Button>open</Button>}>
        <Sidebar/>
      </SheetSide>

    </>
  );
};

export default ChatSection;