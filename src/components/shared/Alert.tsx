"use client"

import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface ToastProps {
    title: string
    description: string
    action: React.ReactNode
}
const Toast = ({ title, description, action }: ToastProps) => {
    const { toast } = useToast()

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: title,
                    description: description,
                    action: (
                        <>
                            {action}
                        </>
                    ),
                })
            }}
        >
            Show Toast
        </Button>
    )
}

export default Toast