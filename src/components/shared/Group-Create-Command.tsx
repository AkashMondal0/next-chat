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
import { Check, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"


interface SearchCommandProps {
  data: User[] | undefined
  secondaryData?: search_data_user[]
  status?: boolean
  error?: any
  addUserToGroupHandler: (id: User["id"]) => void
  addUserToGroup: User["id"][]
  removeUserFromGroupHandler: (id: User["id"]) => void
  Action?: React.ReactNode
}
export default function Group_Create_Command({
  data,
  secondaryData,
  status,
  error,
  addUserToGroupHandler,
  addUserToGroup,
  removeUserFromGroupHandler,
  Action
}: SearchCommandProps) {

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        {error && <CommandEmpty>{error.message}</CommandEmpty>}
        <CommandGroup heading="Result">
          {status ?
            <Loader2 className='animate-spin text-zinc-500 mx-auto w-16 h-16 mb-8' /> :
            <>{data?.map((item, index) => <UserItem
              addUserToGroupHandler={addUserToGroupHandler}
              removeUserFromGroupHandler={removeUserFromGroupHandler}
              addUserToGroup={addUserToGroup}
              key={item.id} data={item} />)}</>}
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

interface UserItemProps {
  data: User
  addUserToGroupHandler: (id: User["id"]) => void
  addUserToGroup: User["id"][]
  removeUserFromGroupHandler: (id: User["id"]) => void
}

const UserItem: React.FC<UserItemProps> = ({ data,
  removeUserFromGroupHandler,
  addUserToGroupHandler, addUserToGroup }) => {


  return (
    <CommandItem className="h-12 my-2 flex justify-between" >
      <div className="flex items-center">
        {data.imageUrl && (<Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={data.imageUrl} alt="Avatar" />
          <AvatarFallback>{data.name[0]}</AvatarFallback>
        </Avatar>)}
        <span>{data.name}</span>
      </div>
      <>
        <Checkbox className=" 
        text-zinc-500
        border-zinc-500
        hover:border-zinc-600
        focus:border-zinc-600
        focus:ring-zinc-500
        focus:ring-2
        rounded-full
        w-6
        h-6"
          checked={addUserToGroup.includes(data.id)}
          onClick={() => {
            addUserToGroup.includes(data.id) ?
              removeUserFromGroupHandler(data.id) :
              addUserToGroupHandler(data.id)
          }}
        /></>
    </CommandItem>
  )
}