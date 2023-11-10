import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    
    const users = await db.user.findMany();

    if (!users) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
}