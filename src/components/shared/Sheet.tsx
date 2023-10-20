"use client"

import Sidebar from "@/app/(home)/components/sidebar"
import { Button } from "../ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "../ui/sheet"


export function SheetSide() {
    return (

        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">open</Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>

    )
}
