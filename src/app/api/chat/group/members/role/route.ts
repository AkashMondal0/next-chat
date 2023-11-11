import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {

        const { newAdminUserId, groupId, makeRole } = await req.json()

        if (!groupId) {
            return NextResponse.json("You must provide a group id", { status: 400 });
        }

        const authorId = new URL(req.url).searchParams.get("authorId");

        if (!authorId) {
            return NextResponse.json("You are not authorized to create a group", { status: 401 });
        }

        if (!newAdminUserId) {
            return NextResponse.json("You must provide a new admin user id", { status: 400 });
        }

        const createConversation = await db.group.update({
            where: {
                id: groupId,
                authorId: authorId,
                Members: {
                    some: {
                        userId: authorId,
                        role: "ADMIN"
                    }
                },
            },
            data: {
                Members: {
                    updateMany: {
                        where: {
                            userId: newAdminUserId
                        },
                        data: {
                            role: makeRole
                        }
                    }
                },
            },
            include: {
                Members: true,
                users: true,
            },
        });
        return NextResponse.json(createConversation, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("internal error", { status: 500 });
    }
}