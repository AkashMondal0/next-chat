"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"


export function SheetSide({children,trigger}:{children:React.ReactNode,trigger:React.ReactNode}) {
    return (

        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
                {children}
            </SheetContent>
        </Sheet>

    )
}
