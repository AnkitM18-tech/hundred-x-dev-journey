import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  try {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return NextResponse.json({
      message: "You have signed up successfully!",
    });
  } catch (error) {
    throw new Error("error creating user!");
  }
}
