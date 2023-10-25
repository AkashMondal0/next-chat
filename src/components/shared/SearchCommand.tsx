"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { User, search_data_user } from "@/interface/type"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Loader2, UserCheck, UserPlus } from "lucide-react"
import axios from "axios"
import { useMutation, useQuery } from '@tanstack/react-query'
import qs from "query-string"
import useClientProfile from "@/hooks/client-profile"

interface SearchCommandProps {
  data: User[] | undefined
  secondaryData?: search_data_user[]
  status?: 'pending' | 'error' | 'success'
  error?: string
}
export default function SearchCommand({
  data,
  secondaryData,
  status,
  error
}: SearchCommandProps) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        {status === "error" && <CommandEmpty>{error}</CommandEmpty>}
        <CommandGroup heading="Result">
          {status === "pending" ?
            <Loader2 className='animate-spin text-zinc-500 mx-auto w-16 h-16 mb-8' /> :
            <>{data?.map((item, index) => <UserItem key={item.id} data={item} />)}</>}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          {secondaryData?.map((item, index) => {
            return (
              <CommandItem key={index}>
                {item.imageUrl && (<></>)}
                <span>{item.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}


const UserItem = ({ data }: { data: search_data_user }) => {

  const currentProfile = useClientProfile()

  const postUser = async () => {
    const url = qs.stringifyUrl({
      url: "/api/chat/direct/create",
      query: {
        senderId: currentProfile.state.id
      }
    });
    const receiverUser = {
      id: data.id,
      name: data.name,
      image: data.imageUrl
    }
    let res = await axios.post(url, receiverUser)
    return res
  }
  const mutation = useMutation({ mutationFn: postUser })

  return (
    <CommandItem className="h-12 my-2 flex justify-between">
      <div className="flex items-center">
        {data.imageUrl && (<Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={data.imageUrl} alt="Avatar" />
          <AvatarFallback>{data.name[0]}</AvatarFallback>
        </Avatar>)}
        <span>{data.name}</span>
      </div>
      <>
        {mutation.isPending ?
          <Loader2 className='animate-spin text-zinc-500 ml-auto w-6 h-6 mr-2' />
          : mutation.isSuccess ? <UserCheck className="mx-2 cursor-pointer" />
            : <UserPlus className="mx-2 cursor-pointer" onClick={() => mutation.mutate()} />}
      </>
    </CommandItem>
  )
}