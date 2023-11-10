import db from "@/lib/db";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, response: NextResponse) {

    // get cookie
    // const token = getCookie('profile', { req: request, res: response })
    const token = new URL(request.url).searchParams.get("userId");
    const cloudId = new URL(request.url).searchParams.get("cloudId");


    if (!token || !cloudId) {
        return NextResponse.json({ message: "No token found" }, { status: 404 });
    }

    const users = await db.user.update({
        where: {
            id: token
        },
        data: {
            cloudMessageId:cloudId
        }
    })

    if (!users) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
}