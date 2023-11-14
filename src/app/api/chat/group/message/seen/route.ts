import db from "@/lib/db";
import socket from "@/lib/socket";
import { NextRequest, NextResponse } from "next/server";

export type GroupMessageSeenSocket = {
    groupId: string,
    seenUserId: string,
    messageIds: string[],
}

export async function POST(req: NextRequest) {

    const { groupId, seenUserId, messageIds } = await req.json() as GroupMessageSeenSocket

    // console.log("groupId", groupId)
    // console.log("seenUserId", seenUserId)
    // console.log(messageIds)

    // for (let index = 0; index < messageIds.length; index++) {
    //     await db.groupMessage.update({
    //         where: {
    //             id: messageIds[index]
    //         },
    //         data: {
    //             seenBy: {
    //                 create: {
    //                     userId: seenUserId,
    //                 }
    //             }
    //         },
    //     });
    // }


    // const messageSeenSocket: GroupMessageSeenSocket = {
    //     groupId,
    //     seenUserId,
    //     messageIds,
    // }

    // socket.emit("group_message_for_user_seen", messageSeenSocket);

    return NextResponse.json("done", { status: 200 });
}