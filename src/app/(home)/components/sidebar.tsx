import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserNav } from "./user-nav"

export default function Sidebar({ data }: any) {
    return (
        <Card className="col-span-3 border-none">
            <ScrollArea className="h-screen w-96">
                <div className="flex justify-between w-full p-6 items-center">
                    <CardTitle>Sky Solo Chat</CardTitle>
                    <UserNav />
                </div>
                <CardContent>
                    <div className="space-y-8">
                        {Array(10).fill(10).map((sale: any) => (
                            <div className="flex items-center" key={sale}>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}