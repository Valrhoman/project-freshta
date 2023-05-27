import { NextResponse } from "next/server";

export async function GET() {
  console.log("incoming hello");
  return NextResponse.json({ message: "hello" });
}
