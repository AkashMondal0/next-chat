import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { senderId, receiverId, data } = await req.json()
    const messageData = await db.messageDirect.updateMany({
        where: {
            id: {
                in: data
            }
        },
        data: {
            deleted: true
        },
    });

    const messageSeenSocket = {
        senderId,
        receiverId,
        data,
    }

    return NextResponse.json(messageSeenSocket, { status: 200 });
}