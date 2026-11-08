import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifySessionToken } from "@/lib/session";
import sharp from "sharp";

const MAX_DIMENSION = 1080;

async function resizeImage(buffer: Buffer, contentType: string): Promise<{ data: Buffer; contentType: string }> {
  const isImage = contentType.startsWith("image/") && !contentType.includes("svg");
  if (!isImage) return { data: buffer, contentType };

  const image = sharp(buffer);
  const metadata = await image.metadata();

  const width = metadata.width || 0;
  const height = metadata.height || 0;

  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
    return {
      data: await image.jpeg({ quality: 80 }).toBuffer(),
      contentType: "image/jpeg",
    };
  }

  return {
    data: await image
      .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer(),
    contentType: "image/jpeg",
  };
}

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

    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    const { data: optimized, contentType } = await resizeImage(rawBuffer, file.type);

    const ext = contentType === "image/jpeg" ? "jpg" : file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-").replace(/\.[^.]+$/, "")}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, optimized, {
        contentType,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
