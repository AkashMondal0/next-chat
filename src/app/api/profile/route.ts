import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {

    const token = new URL(request.url).searchParams.get("userId");

    if (!token) {
        return NextResponse.json({ message: "No token found" }, { status: 404 });
    }

    const users = await db.user.findUnique({
        where: {
            id: token,
            userId: token
        }
    })
    // console.log(users,token)

    if (!users) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
}