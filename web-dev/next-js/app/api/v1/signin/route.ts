import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });
  return NextResponse.json({
    message: "You have signed in successfully!",
    user,
  });
}
