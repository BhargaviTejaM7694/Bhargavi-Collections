import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

// Rate limiter: max 10 lookups per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let phone: string;
  try {
    const body = await request.json();
    phone = body.phone?.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!phone || phone.length < 10) {
    return NextResponse.json(
      { error: "Please enter a valid phone number" },
      { status: 400 }
    );
  }

  // Normalize: strip spaces, dashes, and leading +91 or 0
  const normalized = phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, customer_name, items, total_amount, status, created_at")
    .eq("customer_phone", normalized)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Also try with +91 prefix and original input
  let allOrders = data || [];
  if (allOrders.length === 0) {
    const { data: data2 } = await supabaseAdmin
      .from("orders")
      .select("id, customer_name, items, total_amount, status, created_at")
      .or(`customer_phone.eq.${normalized},customer_phone.eq.+91${normalized},customer_phone.eq.91${normalized},customer_phone.eq.0${normalized}`)
      .order("created_at", { ascending: false });
    allOrders = data2 || [];
  }

  const orders = allOrders.map((row) => ({
    id: row.id,
    customerName: row.customer_name,
    items: row.items,
    totalAmount: Number(row.total_amount),
    status: row.status,
    createdAt: row.created_at,
  }));

  return NextResponse.json({ orders });
}
