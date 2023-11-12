'use client'
import { FC, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import SearchCommand from '../shared/SearchCommand';
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import { getSearchUser } from '@/Query/user';

interface SearchModalProps { }

const SearchModal: FC<SearchModalProps> = () => {
  const currentProfile = useClientProfile()
  const mutation = useMutation({ mutationFn: getSearchUser })

  // already in conversation
  const filterUser = (users: User[]) => {
    return users.filter(user =>
      !currentProfile.conversations.some(conversation =>
        conversation.users.some(innerUser => innerUser.id === user.id)
      )
    ).filter(user => user.id !== currentProfile.state.id)
  }

  useEffect(() => {
    if(!mutation.data){
      mutation.mutate()
    }
  }, [])

  return (<Modal title={"Search User"} trigger={<Button variant={"ghost"}>
    <Users className='w-6 h-6 cursor-pointer' />
  </Button>}>
    <SearchCommand
      data={filterUser(mutation.data ? mutation.data : [])}
      status={mutation.isPending}
      error={mutation.error} />
  </Modal>)
};

export default SearchModal;