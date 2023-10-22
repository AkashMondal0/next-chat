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
import { search_data_user } from "@/interface/type"

interface SearchCommandProps {
  data: search_data_user[]
  secondaryData?: search_data_user[]
}
export default function SearchCommand({
  data,
  secondaryData,
}: SearchCommandProps) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Result">
          {data.map((item, index) => {
            return (
              <CommandItem key={index} className="h-12 my-2">
                {item.imageUrl && (<></>)}
                <span>{item.name}</span>
              </CommandItem>
            )
          })}
          {/* <CommandItem>
            <Calendar  />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem> */}
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
          {/* <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem> */}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
