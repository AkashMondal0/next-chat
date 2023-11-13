import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const newMessage = await req.json()

        const conversation = await db.group.update({
            where: {
                id: newMessage.groupId,
            },
            data: {
                lastMessage: newMessage.content,
            }
        })

        if (!conversation) {
            return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
        }

        const messageData = await db.groupMessage.create({
            data: {
                content: newMessage.content,
                memberId: newMessage.memberId,
                fileUrl: newMessage.fileUrl,
                groupId: newMessage.groupId,
                seenBy: {
                    create: [{
                        userId: newMessage.memberId,
                    }]
                },
            },
            // include: {
            //     seenBy: true,
            // },
        });

        if (!messageData) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        // const messageSocket = {
        //     senderId: newMessage.memberId,
        //     // receiverId: receiverId,
        //     data: messageData,
        // }

        // socket.emit("message_for_user", messageSocket)
        return NextResponse.json(messageData, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal error", { status: 500 });
    }
}