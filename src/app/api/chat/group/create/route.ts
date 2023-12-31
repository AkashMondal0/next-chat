import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { users, name } = await req.json()
        const authorId = new URL(req.url).searchParams.get("authorId");
        // console.log(users, name, authorId)
        const groupUsers = users.map((userId: string) => {
            return { id: userId }
        }).concat({ id: authorId })

        const groupMembers = users.map((userId: string) => {
            return { role: "MEMBER", userId: userId}
        }).concat({ role: "ADMIN", userId: authorId})


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

        for (let index = 0; index < groupUsers.length; index++) {
            socket.emit("group_chat_list", {
                senderId: groupUsers[index].id,
                data: createConversation
            })
        }
        return NextResponse.json(createConversation, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("internal error", { status: 500 });
    }
}
