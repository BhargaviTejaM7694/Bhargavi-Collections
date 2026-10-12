import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifySessionToken } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session || !verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("id, image")
      .order("created_at", { ascending: true });

    if (error) throw error;

    let migrated = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const product of products || []) {
      if (!product.image || !product.image.startsWith("data:")) {
        skipped++;
        continue;
      }

      try {
        const match = product.image.match(/^data:(.+?);base64,(.+)$/);
        if (!match) {
          skipped++;
          continue;
        }

        const mimeType = match[1];
        const base64Data = match[2];
        const ext = mimeType.split("/")[1] || "png";
        const buffer = Buffer.from(base64Data, "base64");

        const blob = await put(
          `products/${product.id}.${ext}`,
          buffer,
          { access: "public", contentType: mimeType }
        );

        const { error: updateError } = await supabase
          .from("products")
          .update({ image: blob.url })
          .eq("id", product.id);

        if (updateError) throw updateError;
        migrated++;
      } catch (err) {
        errors.push(`${product.id}: ${err instanceof Error ? err.message : "unknown"}`);
      }
    }

    // Also migrate category images
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("id, image");

    if (!catError) {
      for (const cat of categories || []) {
        if (!cat.image || !cat.image.startsWith("data:")) continue;

        try {
          const match = cat.image.match(/^data:(.+?);base64,(.+)$/);
          if (!match) continue;

          const mimeType = match[1];
          const base64Data = match[2];
          const ext = mimeType.split("/")[1] || "png";
          const buffer = Buffer.from(base64Data, "base64");

          const blob = await put(
            `categories/${cat.id}.${ext}`,
            buffer,
            { access: "public", contentType: mimeType }
          );

          await supabase
            .from("categories")
            .update({ image: blob.url })
            .eq("id", cat.id);

          migrated++;
        } catch (err) {
          errors.push(`cat-${cat.id}: ${err instanceof Error ? err.message : "unknown"}`);
        }
      }
    }

    return NextResponse.json({ migrated, skipped, errors });
  } catch (err) {
    console.error("Migration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Migration failed" },
      { status: 500 }
    );
  }
}
