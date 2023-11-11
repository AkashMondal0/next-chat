import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { users, name } = await req.json()
        const authorId = new URL(req.url).searchParams.get("authorId");

        const groupUsers = users.map((userId: string) => {
            return { id: userId }
        }).concat({ id: authorId })

        const groupMembers = users.map((userId: string) => {
            return { role: "MEMBER", userId: userId, id: userId }
        }).concat({ role: "ADMIN", userId: authorId, id: authorId })


        if (!authorId) {
            return NextResponse.json({ message: "You are not authorized to create a group" }, { status: 401 });
        }

        const createConversation = await db.group.create({
            data: {
                name: name,
                lastMessage: "new group conversation",
                authorId: authorId,
                users: {
                    connect: groupUsers,
                },
                Members: {
                    create: groupMembers,
                },
            },
            include: {
                Members: true,
                users: true,
            },
        });
        return NextResponse.json(createConversation, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("internal error", { status: 500 });
    }
}
