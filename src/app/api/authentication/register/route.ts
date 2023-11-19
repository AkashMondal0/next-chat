import { register_credential } from "@/interface/type";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import db from "@/lib/db";

const saltRounds = 10;
const secret = process.env.NEXT_PUBLIC_JWT_SECRET;


export async function POST(req: NextRequest) {

  try {
    const data: register_credential = await req.json()

    if (!data.email && !data.password) {
        return new NextResponse("email and password is required", { status: 400 });
    }

    const alreadyUser = await db.user.findUnique({
        where: {
            email: data.email,
        }
    })

    if (alreadyUser) {
        return new NextResponse("user already exist", { status: 401 });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);

    const newUser = await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hash,
            imageUrl: data.imageUrl || "",
            cloudMessageId: "",
            phone: "",
            status: "",
            userId: "",
            
        }
    })

    const token = jwt.sign({ id: newUser.id }, secret as string, { expiresIn: "1h" })

    return NextResponse.json(token , { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}