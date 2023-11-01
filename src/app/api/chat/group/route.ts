import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user1Id = "1"
    const user2Id = "2"

    const createConversation = await db.group.create({
        data: {
            name: "Test Group",
            lastMessage: "new conversation",
            Members: {
                create: [
                    {
                        id: user1Id,
                        userId: user1Id,
                    },
                    
                ],
            },
        }
    });
    return NextResponse.json(createConversation, { status: 200 });
}