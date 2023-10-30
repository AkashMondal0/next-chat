import db from "@/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET() {
    const profile = await getSession();

    const userList = await db.conversation.findMany({
        where: {
            users: {
                some: {
                    id: profile?.user.sid
                }
            }
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    email: true,
                }
            },
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    seenBy: {
                        select: {
                            userId: true,
                        }
                    
                    },
                }
                // take: 20,
            }
        }
    })

    return NextResponse.json(userList, { status: 200 })
}