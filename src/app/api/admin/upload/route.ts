import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifySessionToken } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session || !verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(
      `products/${Date.now()}-${file.name.replace(/\s+/g, "-")}`,
      file,
      { access: "public" }
    );

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
