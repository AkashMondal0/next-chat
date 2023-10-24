import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const createConversation = await db.conversation.create({
        data: {
            lastMessage: "new conversation",
            users: {
                connect: [
                    { id:  "SWB69ZNeXwm8OGCXNWOyundRQ1pXLW5W"},
                    { id: "zurzHVhofee5k7r8luG9qwXykAQhCU7z" },
                ],
            },
        },
    });
    return NextResponse.json(createConversation, { status: 200 });
}