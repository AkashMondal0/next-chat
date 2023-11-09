import { login_credential } from "@/interface/type";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import db from "@/lib/db";
const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: NextRequest) {

    const data: login_credential = await req.json()

    const user = await db.user.findUnique({
        where: {
            email: data.email,
        }
    })

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const checkPassword = await bcrypt.compare(data.password, user.password)

    if (!checkPassword) {
        return NextResponse.json({ message: "Password is incorrect" }, { status: 404 });
    }

    const token = jwt.sign({ id: user.id }, secret as string, { expiresIn: "1h" })

    return NextResponse.json(token, { status: 200 })
}