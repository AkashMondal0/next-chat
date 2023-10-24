'use client'
import { FC } from 'react';
import { Modal } from '../shared/Modal';
import SearchCommand from '../shared/SearchCommand';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Users } from 'lucide-react';
import { Button } from '../ui/button';

interface SearchModalProps { }
const SearchModal: FC<SearchModalProps> = () => {
  const profile = useClientProfile()
  const { user: auth0User, error: UserError, isLoading } = useUser();

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    return res.data;
  }

  const { status, data, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })


  return (<Modal title={"Search User"} trigger={<Button variant={"ghost"}><Users className='w-6 h-6 cursor-pointer'/></Button>}>
    <SearchCommand
      data={data?.filter(user => user.id !== auth0User?.sid)}
      status={status}
      error={error?.message} />
  </Modal>)
};

export default SearchModal;