import {FC} from 'react';
import SearchModal from '@/components/modal/search_user';

interface ModalProviderProps {
    children?: React.ReactNode
}
const ModalProvider:FC<ModalProviderProps> = ({
    children
}) => {
  return (
    <>
      <SearchModal/>
    </>
  );
};

export default ModalProvider;