import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function GET(req: NextRequest) {

    const token = new URL(req.url).searchParams.get("token");

    if (!token) {
        return NextResponse.json({ message: "No token found" }, { status: 404 });
    }

    const verify = jwt.verify(token, secret as string) as { id: string };

    if (!verify?.id) {
        return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }

    const user = await db.user.findUnique({
        where: {
            id: verify.id,
        }
    });

    return NextResponse.json(user, { status: 200 })
}