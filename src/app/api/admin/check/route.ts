import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;

  if (session && verifySessionToken(session)) {
    return NextResponse.json({ authenticated: true });
  }

  const response = NextResponse.json({ authenticated: false }, { status: 401 });
  if (session) {
    response.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
  }
  return response;
}
