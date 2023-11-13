import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const { receiverId } = await req.json()
    const senderId = new URL(req.url).searchParams.get("senderId")


    const createConversation = await db.conversation.create({
        data: {
            lastMessage: "new conversation",
            users: {
                connect: [
                    { id: senderId },
                    { id: receiverId },
                ],
            },
        },
    });


    socket.emit("user_chat_list", {
        receiverId: receiverId,
        senderId: senderId,
        data: createConversation
    })
    return NextResponse.json(createConversation, { status: 200 });
}