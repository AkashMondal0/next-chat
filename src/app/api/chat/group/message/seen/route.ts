import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export type GroupMessageSeenSocket = {
    groupId: string,
    seenUserId: string,
    messageIds: string[],
}

export async function POST(req: NextRequest) {

    try {
        const { groupId, seenUserId, messageIds } = await req.json() as GroupMessageSeenSocket

        for (let index = 0; index < messageIds.length; index++) {
            await db.groupMessage.update({
                where: {
                    id: messageIds[index]
                },
                data: {
                    seenBy: {
                        create: {
                            userId: seenUserId,
                        }
                    }
                },
            });
        }
        return NextResponse.json("done", { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("internal error", { status: 500 });
    }
}