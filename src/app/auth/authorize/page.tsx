import { userAuthorized } from "@/Query/user"
import { redirect } from "next/navigation"

export default async function Authorize() {

    if (userAuthorized()) {
        return redirect("/")
    }

    return redirect("/")
}