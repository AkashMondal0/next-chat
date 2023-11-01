import db from "@/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const profile = await getSession();

    if (!profile) {
        return NextResponse.json("Auth Failed", { status: 401 })
    }
    const conversationId = new URL(req.url).searchParams.get("conversationId")?.toString();
    const skipMessage = new URL(req.url).searchParams.get("conversationId")?.toString();
    const takeMessage = new URL(req.url).searchParams.get("conversationId")?.toString();


    const messages = await db.messageDirect.findMany({
        where: {
            conversationId: conversationId
        },
        include: {
            seenBy: {
                select: {
                    userId: true,
                }
            },
            
        },
        orderBy: {
            createdAt: "asc"
        },
        take: takeMessage ? parseInt(takeMessage) : 20,
        skip: skipMessage ? parseInt(skipMessage) : 20,
    })

    return NextResponse.json(messages, { status: 200 })
}