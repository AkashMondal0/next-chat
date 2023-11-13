/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useEffect, useState } from 'react';
import { Modal } from '../shared/Modal';
import { useMutation, useQuery } from '@tanstack/react-query'
import { User } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { Loader2, UserPlus2, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { getSearchUser } from '@/api-functions/user';
import Group_Create_Command from '../shared/Group-Create-Command';
import { DialogClose } from '../ui/dialog';
import { createGroupConversation } from '@/api-functions/group-chat';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

interface GroupCreateModalProps { }

const GroupCreateModal: FC<GroupCreateModalProps> = () => {
  const currentProfile = useClientProfile()
  const { toast } = useToast()
  const mutation = useMutation({ mutationFn: getSearchUser })
  const [addUserToGroup, setAddUserToGroup] = useState<User["id"][]>([])
  const [groupName, setGroupName] = useState<string>("")

  const createGroupHandler = () => {
    const data = {
      name: groupName,
      users: addUserToGroup,
      currentProfileId: currentProfile.state.id
    }
    // console.log(data)
    mutationCreateGroup.mutate(data)
  }

  const mutationCreateGroup = useMutation({ mutationFn: createGroupConversation })

  useEffect(() => {
    if (!mutation.data) {
      mutation.mutate()
    }
  }, [])

  useEffect(() => {
    if (mutationCreateGroup.isSuccess && mutationCreateGroup.data) {
      toast({
        title: `Group ${groupName} created`,
        description: new Date().toLocaleTimeString(),
      })
      setGroupName("")
      setAddUserToGroup([])
    } if (mutationCreateGroup.isError) {
      toast({
        title: `Error`,
        description: "Group Create Error",
      })
    }
  }, [mutationCreateGroup.data, mutationCreateGroup.isError])

  const filterUser = (users: User[]) => {
    return users.filter(user => user.id !== currentProfile.state.id)
  }

  const addUserToGroupHandler = (id: User["id"]) => {
    setAddUserToGroup([...addUserToGroup, id])
  }

  const removeUserFromGroupHandler = (id: User["id"]) => {
    setAddUserToGroup(addUserToGroup.filter((item) => item !== id))
  }

  return (<Modal title={"Create Group"} trigger={<Button variant={"ghost"}>
    <UserPlus2 className='w-6 h-6 cursor-pointer' />
  </Button>}>
    <Input
      value={groupName}
      onChange={(e) => setGroupName(e.target.value)}
      type="text" placeholder="Group Name" />
    {
      mutationCreateGroup.isError && <p className="text-red-500 text-sm">Error: {mutationCreateGroup.error?.message}</p>
    }
    <Group_Create_Command
      addUserToGroupHandler={addUserToGroupHandler}
      removeUserFromGroupHandler={removeUserFromGroupHandler}
      addUserToGroup={addUserToGroup}
      data={filterUser(mutation.data ? mutation.data : [])}
      status={mutation.isPending}
      error={mutation.error} />
    {mutationCreateGroup.isSuccess ?
      <DialogClose onClick={createGroupHandler}>
        <Button className="w-full" variant={'outline'}>
          Done
        </Button>
      </DialogClose>
      :
      <Button className="w-full" onClick={createGroupHandler} disabled={mutationCreateGroup.isPending}>
        {mutationCreateGroup.isPending ? <Loader2 className='animate-spin text-zinc-500 w-8 h-8' /> : "Create Group"}
      </Button>}
  </Modal>)
};

export default GroupCreateModal;