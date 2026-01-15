import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    username: "Sumana",
    email: "2Ct3j@example.com",
    name: "Sumana Ghosh",
    id: "1001",
  });
}
