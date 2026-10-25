import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";
import { supabase } from "@/lib/supabase";

async function migrateUrl(url: string, fileName: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = response.headers.get("content-type") || "image/png";

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, buffer, { contentType, upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session || !verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = { products: 0, variants: 0, categories: 0, errors: [] as string[] };

    const { data: products } = await supabase
      .from("products")
      .select("id, image, variants")
      .order("created_at", { ascending: true });

    for (const product of products || []) {
      if (product.image && product.image.includes("vercel-storage.com")) {
        try {
          const ext = product.image.split(".").pop()?.split("?")[0] || "png";
          const newUrl = await migrateUrl(product.image, `product-${product.id}.${ext}`);
          await supabase.from("products").update({ image: newUrl }).eq("id", product.id);
          results.products++;
        } catch (err) {
          results.errors.push(`product ${product.id}: ${err instanceof Error ? err.message : "unknown"}`);
        }
      }

      if (product.variants && Array.isArray(product.variants)) {
        let variantsUpdated = false;
        const updatedVariants = [...product.variants];
        for (let i = 0; i < updatedVariants.length; i++) {
          const v = updatedVariants[i];
          if (v.image && v.image.includes("vercel-storage.com")) {
            try {
              const ext = v.image.split(".").pop()?.split("?")[0] || "png";
              const newUrl = await migrateUrl(v.image, `variant-${product.id}-${i}.${ext}`);
              updatedVariants[i] = { ...v, image: newUrl };
              variantsUpdated = true;
              results.variants++;
            } catch (err) {
              results.errors.push(`variant ${product.id}-${i}: ${err instanceof Error ? err.message : "unknown"}`);
            }
          }
        }
        if (variantsUpdated) {
          await supabase.from("products").update({ variants: updatedVariants }).eq("id", product.id);
        }
      }
    }

    const { data: categories } = await supabase
      .from("categories")
      .select("id, image");

    for (const cat of categories || []) {
      if (cat.image && cat.image.includes("vercel-storage.com")) {
        try {
          const ext = cat.image.split(".").pop()?.split("?")[0] || "png";
          const newUrl = await migrateUrl(cat.image, `category-${cat.id}.${ext}`);
          await supabase.from("categories").update({ image: newUrl }).eq("id", cat.id);
          results.categories++;
        } catch (err) {
          results.errors.push(`category ${cat.id}: ${err instanceof Error ? err.message : "unknown"}`);
        }
      }
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("Migration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Migration failed" },
      { status: 500 }
    );
  }
}
