import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const profileId = new URL(request.url).searchParams.get("userId");

        if (!profileId) {
            return NextResponse.json({ message: "No token found" }, { status: 404 });
        }

        const userList = await db.group.findMany({
            where: {
                users: {
                    some: {
                        id: profileId
                    }
                }
            },
            include: {
                Members: {
                    select: {
                        id: true,
                        userId: true,
                        role: true,
                        groupId: true,
                    }
                },
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
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}