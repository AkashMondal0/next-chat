import db from "@/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const auth0_user = await getSession();
    const users = await db.user.findMany()
    console.log(auth0_user?.user.sid)
    console.log(params.id)
    if (!users) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
}