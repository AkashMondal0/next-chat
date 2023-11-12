'use client'
import { FC, useEffect, useState } from 'react';
import { Modal } from '../shared/Modal';
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { UserPlus2, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { getSearchUser } from '@/Query/user';
import Group_Create_Command from '../shared/Group-Create-Command';
import { DialogClose } from '../ui/dialog';

interface GroupCreateModalProps { }

const GroupCreateModal: FC<GroupCreateModalProps> = () => {
  const mutation = useMutation({ mutationFn: getSearchUser })
  const [addUserToGroup, setAddUserToGroup] = useState<User["id"][]>([])

  useEffect(() => {
    if (!mutation.data) {
      mutation.mutate()
    }
  }, [])

  const addUserToGroupHandler = (id: User["id"]) => {
    setAddUserToGroup([...addUserToGroup, id])
  }

  const removeUserFromGroupHandler = (id: User["id"]) => {
    setAddUserToGroup(addUserToGroup.filter((item) => item !== id))
  }

  const createGroupHandler = () => {
    console.log(addUserToGroup)
  }

  return (<Modal title={"Create Group"} trigger={<Button variant={"ghost"}>
    <UserPlus2 className='w-6 h-6 cursor-pointer' />
  </Button>}>
    <Group_Create_Command
      addUserToGroupHandler={addUserToGroupHandler}
      removeUserFromGroupHandler={removeUserFromGroupHandler}
      addUserToGroup={addUserToGroup}
      data={mutation.data ? mutation.data : []}
      status={mutation.isPending}
      error={mutation.error} />
      <Button className="w-full" onClick={createGroupHandler}>
        Create Group
      </Button>
    {/* <DialogClose onClick={createGroupHandler}>
    </DialogClose> */}
  </Modal>)
};

export default GroupCreateModal;