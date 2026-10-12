import { createClient } from "@supabase/supabase-js";
import { put } from "@vercel/blob";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}
if (!blobToken) {
  console.error("Missing BLOB_READ_WRITE_TOKEN — set it in .env.local or environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateTable(table, prefix) {
  const { data, error } = await supabase.from(table).select("id, image");
  if (error) { console.error(`Failed to fetch ${table}:`, error); return; }

  let migrated = 0;
  for (const row of data || []) {
    if (!row.image || !row.image.startsWith("data:")) continue;

    const match = row.image.match(/^data:(.+?);base64,(.+)$/);
    if (!match) continue;

    const mimeType = match[1];
    const ext = mimeType.split("/")[1] || "png";
    const buffer = Buffer.from(match[2], "base64");

    try {
      const blob = await put(`${prefix}/${row.id}.${ext}`, buffer, {
        access: "public",
        contentType: mimeType,
        token: blobToken,
      });

      const { error: updateErr } = await supabase
        .from(table)
        .update({ image: blob.url })
        .eq("id", row.id);

      if (updateErr) {
        console.error(`  Failed to update ${row.id}:`, updateErr);
      } else {
        migrated++;
        console.log(`  Migrated ${row.id} → ${blob.url}`);
      }
    } catch (err) {
      console.error(`  Upload failed for ${row.id}:`, err.message);
    }
  }
  console.log(`${table}: ${migrated} images migrated`);
}

console.log("Migrating product images...");
await migrateTable("products", "products");
console.log("\nMigrating category images...");
await migrateTable("categories", "categories");
console.log("\nDone!");
