import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateUrl(url, fileName) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url} (${response.status})`);
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

async function main() {
  console.log("Starting migration from Vercel Blob to Supabase Storage...\n");

  const results = { products: 0, variants: 0, categories: 0, errors: [] };

  // Migrate products
  const { data: products, error: prodErr } = await supabase
    .from("products")
    .select("id, image, variants")
    .order("created_at", { ascending: true });

  if (prodErr) { console.error("Failed to fetch products:", prodErr); process.exit(1); }

  for (const product of products || []) {
    // Migrate main image
    if (product.image && product.image.includes("vercel-storage.com")) {
      try {
        const ext = product.image.split(".").pop()?.split("?")[0] || "png";
        const newUrl = await migrateUrl(product.image, `product-${product.id}.${ext}`);
        await supabase.from("products").update({ image: newUrl }).eq("id", product.id);
        results.products++;
        console.log(`  [OK] Product image: ${product.id}`);
      } catch (err) {
        const msg = `product ${product.id}: ${err.message}`;
        results.errors.push(msg);
        console.error(`  [FAIL] ${msg}`);
      }
    }

    // Migrate variant images
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
            console.log(`  [OK] Variant image: ${product.id} - ${v.color}`);
          } catch (err) {
            const msg = `variant ${product.id}-${i}: ${err.message}`;
            results.errors.push(msg);
            console.error(`  [FAIL] ${msg}`);
          }
        }
      }
      if (variantsUpdated) {
        await supabase.from("products").update({ variants: updatedVariants }).eq("id", product.id);
      }
    }
  }

  // Migrate categories
  const { data: categories, error: catErr } = await supabase
    .from("categories")
    .select("id, image");

  if (!catErr) {
    for (const cat of categories || []) {
      if (cat.image && cat.image.includes("vercel-storage.com")) {
        try {
          const ext = cat.image.split(".").pop()?.split("?")[0] || "png";
          const newUrl = await migrateUrl(cat.image, `category-${cat.id}.${ext}`);
          await supabase.from("categories").update({ image: newUrl }).eq("id", cat.id);
          results.categories++;
          console.log(`  [OK] Category image: ${cat.id}`);
        } catch (err) {
          const msg = `category ${cat.id}: ${err.message}`;
          results.errors.push(msg);
          console.error(`  [FAIL] ${msg}`);
        }
      }
    }
  }

  console.log("\n--- Migration Complete ---");
  console.log(`Products migrated: ${results.products}`);
  console.log(`Variants migrated: ${results.variants}`);
  console.log(`Categories migrated: ${results.categories}`);
  if (results.errors.length > 0) {
    console.log(`Errors: ${results.errors.length}`);
    results.errors.forEach(e => console.log(`  - ${e}`));
  } else {
    console.log("No errors!");
  }
}

main().catch(err => { console.error("Fatal error:", err); process.exit(1); });
