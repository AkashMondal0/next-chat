/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { userLogin, userRegister } from "@/Query/user"
import { useToast } from "@/components/ui/use-toast"
import useClientProfile from "@/hooks/client-profile"

export default function AuthenticationPage() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: "",
        signUp: false
    })
    const router = useRouter()
    const currentProfile = useClientProfile()
    const { toast } = useToast()
    const mutationLogin = useMutation({
        mutationFn: userLogin,
    })
    const mutationRegister = useMutation({
        mutationFn: userRegister,
    })


    useEffect(() => {
        if (mutationLogin.data || mutationRegister.data) {
            currentProfile.setLoginToken(mutationLogin.data || mutationRegister.data)
            router.push("/")
        }
        if (mutationLogin.error && !input.signUp) {
            toast({
                title: `Login Failed`,
                // @ts-ignore
                description: mutationLogin.error?.response.data,
                action: (
                    <>
                    </>
                ),
            })
        }
        if (mutationRegister.error && input.signUp) {
            toast({
                title: `Register Failed`,
                // @ts-ignore
                description: mutationRegister.error?.response.data,
                action: (
                    <>
                    </>
                ),
            })
        }
    }, [mutationLogin.data, mutationRegister.data, mutationLogin.error, mutationRegister.error])

    const handle = async () => {
        input.signUp ? mutationRegister.mutate(input) : mutationLogin.mutate(input)
    }

    const signWithGoogle = async () => {
    }

    return (
        <div className="h-screen p-1 flex justify-center items-center">
            <Card className="md:w-96 md:h-auto w-full h-full pt-16 md:pt-0">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        {input.signUp ? "Sign Up" : "Sign In"}
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" onClick={signWithGoogle}>
                            <Github className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    {input.signUp ? <div className="grid gap-2">
                        <Label htmlFor="name">name</Label>
                        <Input id="name" type="name" placeholder="m@example.com"
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                        />
                    </div> : <></>}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com"
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password"
                            onChange={(e) => setInput({ ...input, password: e.target.value })} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                already have an account?
                                <span className="text-primary-foreground cursor-pointer text-sky-400" onClick={() => setInput({ ...input, signUp: !input.signUp })}>
                                    {input.signUp ? " Sign In" : " Sign Up"}
                                </span>
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        disabled={mutationLogin.isPending || mutationRegister.isPending}
                        className="w-full" onClick={handle}>
                        {input.signUp ? "Sign Up" : "Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}