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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth"
import { auth, provider } from "@/firebase.config"
import { useState } from "react"
import useClientProfile from "@/hooks/client-profile"
import axios from "axios"
import { setCookie } from 'cookies-next';

export default function AuthenticationPage() {
    const router = useRouter()
    const currentProfile = useClientProfile()
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: "",
        signUp: false
    })

    const handle = async () => {
        input.signUp ?
            await createUserWithEmailAndPassword(auth, input.email, input.password)
                .then((user) => {
                    axios.post("/api/profile/create", {
                        id: user.user.uid,
                        email: user.user.email,
                        name: input.name,
                    }).then((response) => {
                        setCookie("profile", user.user.uid,{
                            // one hour
                            maxAge: 60 * 60,
                        })
                        currentProfile.setState(response.data)
                        router.replace("/")
                    })
                }
                ).catch((error) => {
                    console.log(error)
                })
            :
            await signInWithEmailAndPassword(auth, input.email, input.password)
                .then((user) => {
                    setCookie("profile", user.user.uid,{
                        // one hour
                        maxAge: 60 * 60,
                    })
                    router.replace("/")
                }).catch((error) => {
                    console.log(error)
                })
    }

    const signWithGoogle = async () => {
        signInWithRedirect(auth, provider)
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
                    <Button className="w-full" onClick={handle}>
                        {input.signUp ? "Sign Up" : "Sign In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}