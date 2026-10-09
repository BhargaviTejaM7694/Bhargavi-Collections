import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/composio-email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ success: false, error: "Name, phone and message are required" }, { status: 400 });
    }

    const ownerEmail = process.env.ORDER_RECIPIENT_EMAIL || "bhargavitejacollections@gmail.com";

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
        <div style="background:#3a0a0a;padding:20px;text-align:center;">
          <h1 style="color:#D4A843;margin:0;font-size:22px;">New Customer Query</h1>
          <p style="color:#f0f5f1;margin:8px 0 0;font-size:14px;">BhargaviTeja Collections</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;margin-bottom:20px;">
            <tr><td style="padding:8px 0;color:#666;width:100px;vertical-align:top;font-weight:600;">Name:</td><td style="padding:8px 0;color:#333;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;vertical-align:top;font-weight:600;">Email:</td><td style="padding:8px 0;color:#333;">${email || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;vertical-align:top;font-weight:600;">Phone:</td><td style="padding:8px 0;color:#333;">+91 ${phone}</td></tr>
          </table>
          <div style="background:#fdf2f2;border-left:4px solid #D4A843;padding:16px;border-radius:0 8px 8px 0;">
            <h3 style="margin:0 0 8px;color:#3a0a0a;font-size:14px;">Customer Message:</h3>
            <p style="margin:0;color:#333;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="font-size:13px;color:#888;margin-top:20px;">Reply to this customer at: ${email || `+91 ${phone}`}</p>
        </div>
        <div style="background:#f5f0eb;padding:16px;text-align:center;color:#666;font-size:12px;">
          <p style="margin:0;">This query was submitted via the Contact form on your website.</p>
        </div>
      </div>
    `;

    if (process.env.COMPOSIO_API_KEY && process.env.COMPOSIO_USER_ID) {
      await sendEmail({
        to: ownerEmail,
        subject: `Customer Query from ${name} | BhargaviTeja Collections`,
        htmlBody,
      });
      return NextResponse.json({ success: true, emailSent: true });
    }

    return NextResponse.json({ success: true, emailSent: false, reason: "Email not configured" });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 }
    );
  }
}
