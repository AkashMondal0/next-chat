import db from "@/lib/db";
import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, response:NextResponse) {

    // const profileId = getCookie('profile', { req: request, res: response })
    const profileId = new URL(request.url).searchParams.get("userId");

    if (!profileId) {
        return NextResponse.json({ message: "No token found" }, { status: 404 });
    }

    const userList = await db.conversation.findMany({
        where: {
            users: {
                some: {
                    id: profileId
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