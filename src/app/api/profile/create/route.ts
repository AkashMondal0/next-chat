import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {

    const data = await request.json();
    // console.log(data)

    if (!data) {
        return new Response("No data", { status: 401 });
    }

    const user = await db.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (user) {
        return NextResponse.json("Already user exits", { status: 200 });
    }

    const newUser = await db.user.create({
        data: {
            id: data.id,
            email: data.email,
            name: data.name,
            imageUrl: data.picture || "",
            phone: "",
            status: "",
            userId: data.id,
        }
    })

    return NextResponse.json(newUser, { status: 200 });
}