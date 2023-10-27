import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { user: string } }) {
    const user = await db.user.findUnique({
        where: {
            userId: params.user,
        },
        include: {
            conversations: {
                select: {
                    id: true,
                },
            },
        }
    });


    if (!user) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}