import getCurrentProfile from "@/lib/user/current-user-page";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const user = await getCurrentProfile()

    console.log(user)

    return NextResponse.json(user, { status: 200 })
}