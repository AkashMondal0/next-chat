import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user1Id = "1"
    const user2Id = "2"

    const createConversation = await db.conversation.create({
        data: {
            lastMessage: "new conversation",
            users: {
                connect: [
                    { id: "yUe6h5Sw1NoSYpJFS-q5zKLNAPQmP0g0" },
                    { id: "ZeT23wOw9ofuvJAlZGOaSUKU7meZ8sVi" },
                ],
            },
        },
    });
    return NextResponse.json(createConversation, { status: 200 });
}