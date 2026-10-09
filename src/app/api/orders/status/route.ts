import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/composio-email";
import { verifySessionToken } from "@/lib/session";

const statusMessages: Record<string, { subject: string; heading: string; message: string; color: string }> = {
  ordered: {
    subject: "Your order has been placed successfully",
    heading: "Order Confirmed",
    message: "Thank you for your order! We have received it and will begin processing shortly. You will receive updates as your order progresses.",
    color: "#EAB308",
  },
  processing: {
    subject: "Your order is being processed",
    heading: "Order Processing",
    message: "We have started processing your order. Our team is carefully preparing your jewellery items.",
    color: "#2563eb",
  },
  shipped: {
    subject: "Your order has been shipped",
    heading: "Order Shipped",
    message: "Great news! Your order has been shipped and is on its way to you. You will receive it soon.",
    color: "#7c3aed",
  },
  delivered: {
    subject: "Your order has been delivered",
    heading: "Order Delivered",
    message: "Your order has been delivered! We hope you love your new jewellery. Thank you for shopping with us.",
    color: "#16a34a",
  },
};

export async function POST(request: NextRequest) {
  // Require admin authentication
  const session = request.cookies.get("admin_session")?.value;
  if (!session || !verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { customerName, customerEmail, orderId, items, totalAmount, newStatus } = body;

    if (!statusMessages[newStatus]) {
      return NextResponse.json({ success: true, emailSent: false });
    }

    if (!process.env.COMPOSIO_API_KEY || !process.env.COMPOSIO_USER_ID) {
      return NextResponse.json({ success: true, emailSent: false, reason: "Email not configured" });
    }

    const { subject, heading, message, color } = statusMessages[newStatus];
    const hasCustomerEmail = customerEmail && customerEmail.trim();

    const itemRows = (items as { name: string; price: number }[])
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;">${item.name}</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">₹${item.price.toLocaleString("en-IN")}</td>
          </tr>`
      )
      .join("");

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
        <div style="background:#1a3a2a;padding:20px;text-align:center;">
          <h1 style="color:#D4A843;margin:0;font-size:22px;">BhargaviTeja Collections</h1>
        </div>

        <div style="padding:24px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-block;background:${color};color:#fff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
              ${heading}
            </div>
          </div>

          <p style="font-size:16px;color:#333;">Dear ${customerName},</p>
          <p style="font-size:15px;color:#555;line-height:1.6;">${message}</p>

          <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0 0 8px;font-size:13px;color:#888;">Order ID</p>
            <p style="margin:0;font-size:16px;font-weight:700;color:#1a3a2a;">${orderId}</p>
          </div>

          <h3 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;font-size:15px;">Order Items</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
            <thead>
              <tr style="background:#f0f5f1;">
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;font-size:13px;">Item</th>
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;font-size:13px;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr style="background:#1a3a2a;">
                <td style="padding:10px 12px;color:#fff;font-weight:700;font-size:14px;">Total</td>
                <td style="padding:10px 12px;color:#D4A843;font-weight:700;text-align:right;font-size:14px;">₹${Number(totalAmount).toLocaleString("en-IN")}</td>
              </tr>
            </tfoot>
          </table>

          <p style="font-size:14px;color:#888;margin-top:20px;">If you have any questions, feel free to call us at <strong>+91 91003 69789</strong>.</p>
        </div>

        <div style="background:#f0f5f1;padding:16px;text-align:center;color:#666;font-size:12px;">
          <p style="margin:0;">Thank you for shopping with BhargaviTeja Collections</p>
        </div>
      </div>
    `;

    if (hasCustomerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: `${subject} — ${orderId}`,
        htmlBody,
      });
    }

    const ownerEmail = process.env.ORDER_RECIPIENT_EMAIL || "bhargavitejacollections@gmail.com";
    try {
      const ownerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
          <div style="background:#1a3a2a;padding:20px;text-align:center;">
            <h1 style="color:#D4A843;margin:0;font-size:22px;">Order Status Updated</h1>
            <p style="color:#f0f5f1;margin:8px 0 0;">BhargaviTeja Collections</p>
          </div>
          <div style="padding:24px;">
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-block;background:${color};color:#fff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                ${heading}
              </div>
            </div>
            <table style="width:100%;margin-bottom:20px;">
              <tr><td style="padding:4px 0;color:#666;width:130px;">Order ID:</td><td style="padding:4px 0;font-weight:600;">${orderId}</td></tr>
              <tr><td style="padding:4px 0;color:#666;">Customer:</td><td style="padding:4px 0;font-weight:600;">${customerName}</td></tr>
              <tr><td style="padding:4px 0;color:#666;">Email:</td><td style="padding:4px 0;">${customerEmail}</td></tr>
              <tr><td style="padding:4px 0;color:#666;">New Status:</td><td style="padding:4px 0;"><span style="background:${color};color:#fff;padding:3px 10px;border-radius:12px;font-size:13px;font-weight:600;">${heading}</span></td></tr>
            </table>
            <h3 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;font-size:15px;">Order Items</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
              <thead>
                <tr style="background:#f0f5f1;">
                  <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;font-size:13px;">Item</th>
                  <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;font-size:13px;">Price</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
              <tfoot>
                <tr style="background:#1a3a2a;">
                  <td style="padding:10px 12px;color:#fff;font-weight:700;font-size:14px;">Total</td>
                  <td style="padding:10px 12px;color:#D4A843;font-weight:700;text-align:right;font-size:14px;">₹${Number(totalAmount).toLocaleString("en-IN")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div style="background:#f0f5f1;padding:16px;text-align:center;color:#666;font-size:12px;">
            <p style="margin:0;">Automated notification from BhargaviTeja Collections</p>
          </div>
        </div>
      `;
      await sendEmail({
        to: ownerEmail,
        subject: `Order ${orderId} — Status: ${heading} | ${customerName}`,
        htmlBody: ownerHtml,
      });
    } catch (ownerErr) {
      console.error("Owner status notification email failed:", ownerErr);
    }

    return NextResponse.json({ success: true, emailSent: true });
  } catch (err) {
    console.error("Status email error:", err);
    return NextResponse.json(
      { success: true, emailSent: false, reason: err instanceof Error ? err.message : "Email failed" },
    );
  }
}
