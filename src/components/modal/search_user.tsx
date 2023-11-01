'use client'
import { FC, useEffect, useState } from 'react';
import { Modal } from '../shared/Modal';
import SearchCommand from '../shared/SearchCommand';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { Users } from 'lucide-react';
import { Button } from '../ui/button';

const fetchUsers = async () => {
  const res = await axios.get('/api/users');
  return res.data;
}
interface SearchModalProps { }

const SearchModal: FC<SearchModalProps> = () => {
  const currentProfile = useClientProfile()

  const filterUser = (users: User[]) => {
    const removeConversationUsers = users.filter(user => !currentProfile.conversations.map((c) => c.users.includes(user)));
    return removeConversationUsers.filter(user => user.id !== currentProfile?.state.id)
  }

  const { status, data, error } = useQuery<User[]>({
    queryKey: ['usersList'],
    queryFn: fetchUsers,
  })

  return (<Modal title={"Search User"} trigger={<Button variant={"ghost"}>
    <Users className='w-6 h-6 cursor-pointer' />
  </Button>}>
    <SearchCommand
      data={filterUser(data ? data : [])}
      status={status}
      error={error?.message} />
  </Modal>)
};

export default SearchModal;