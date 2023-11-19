import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ModalProps {
    children: React.ReactNode
    footer?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
    trigger?: React.ReactNode
}
export function Modal({
    children,
    footer,
    title,
    description,
    trigger
}: ModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger ? trigger : <Button variant="outline">open</Button>}
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    {footer}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
