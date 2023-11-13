import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const newMessage = await req.json()
    const receiverId = new URL(req.url).searchParams.get("receiverId");


    const conversation = await db.conversation.update({
        where: {
            id: newMessage.conversationId,
        },
        data: {
            lastMessage: newMessage.content,
        }
    })

    if (!conversation) {
        return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
    }

    const messageData = await db.messageDirect.create({
        data: {
            content: newMessage.content,
            memberId: newMessage.memberId,
            fileUrl: newMessage.fileUrl,
            isGroup: true,
            groupId: newMessage.groupId,
            seenBy: {
                create: [{
                    userId: newMessage.memberId,
                }]
            },
        },
        include: {
            seenBy: true,
        },
    });

    if (!messageData) {
        return NextResponse.json({ message: "Message not found" }, { status: 404 });
    }

    const messageSocket = {
        senderId: newMessage.memberId,
        receiverId: receiverId,
        data: messageData,
    }

    socket.emit("message_for_user", messageSocket)
    return NextResponse.json(messageData, { status: 200 });
}