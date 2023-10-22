import { FC } from 'react';
import { Modal } from '../shared/Modal';
import SearchCommand from '../shared/SearchCommand';

interface SearchModalProps { }
const SearchModal: FC<SearchModalProps> = () => {
  return <Modal title={"Search User"}>
    <SearchCommand data={[
      {
        // fake data
        name: "John Doe",
        imageUrl: "https://avatars.githubusercontent.com/u/55942632?v=4",
        id: "1",
        email: ""
      },

      {
        // fake data
        name: "John Doe2",
        imageUrl: "https://avatars.githubusercontent.com/u/55942632?v=4",
        id: "2",
        email: ""
      },
      
    ]} />
  </Modal>
};

export default SearchModal;