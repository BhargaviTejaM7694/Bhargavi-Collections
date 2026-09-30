import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sendEmail } from "@/lib/composio-email";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const customerPhone = formData.get("customerPhone") as string;
    const addressLine1 = formData.get("addressLine1") as string;
    const addressLine2 = formData.get("addressLine2") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pincode = formData.get("pincode") as string;
    const items = JSON.parse(formData.get("items") as string) as {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image?: string;
    }[];
    const totalAmount = formData.get("totalAmount") as string;
    const siteUrl = formData.get("siteUrl") as string;
    const paymentScreenshot = formData.get("paymentScreenshot") as File | null;

    if (!process.env.COMPOSIO_API_KEY || !process.env.COMPOSIO_USER_ID) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.ORDER_RECIPIENT_EMAIL || "bhargavitejacollections@gmail.com";

    let screenshotUrl = "";
    if (paymentScreenshot) {
      const blob = await put(
        `payments/payment-${customerName.replace(/\s+/g, "-")}-${Date.now()}.${paymentScreenshot.name.split(".").pop() || "png"}`,
        paymentScreenshot,
        { access: "public" }
      );
      screenshotUrl = blob.url;
    }

    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const itemRows = items
      .map(
        (item) => {
          const qty = item.quantity || 1;
          const subtotal = item.price * qty;
          const imgTag = item.image
            ? `<a href="${siteUrl}/products/${item.id}"><img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:8px;" /></a>`
            : "";
          return `<tr>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;">
              <div style="display:flex;align-items:center;gap:8px;">
                ${imgTag}
                <a href="${siteUrl}/products/${item.id}" style="color:#1a3a2a;font-weight:600;text-decoration:none;">${item.name}</a>
              </div>
            </td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">${qty}</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">₹${item.price.toLocaleString("en-IN")}</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">₹${subtotal.toLocaleString("en-IN")}</td>
          </tr>`;
        }
      )
      .join("");

    const paymentSection = screenshotUrl
      ? `<h2 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;">Payment Screenshot</h2>
         <p style="margin:8px 0;">
           <a href="${screenshotUrl}" style="display:inline-block;background:#1a3a2a;color:#D4A843;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;">View Payment Screenshot</a>
         </p>
         <p style="margin:4px 0;">
           <a href="${screenshotUrl}" style="color:#B8860B;font-size:13px;word-break:break-all;">${screenshotUrl}</a>
         </p>`
      : `<h2 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;">Payment Screenshot</h2>
         <p style="color:#666;">No payment screenshot was uploaded.</p>`;

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
        <div style="background:#1a3a2a;padding:20px;text-align:center;">
          <h1 style="color:#D4A843;margin:0;font-size:24px;">New Order Received</h1>
          <p style="color:#f0f5f1;margin:8px 0 0;">Bhargavi Teja Collections</p>
        </div>

        <div style="padding:24px;">
          <h2 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;">Customer Details</h2>
          <table style="width:100%;margin-bottom:20px;">
            <tr><td style="padding:4px 0;color:#666;width:130px;">Name:</td><td style="padding:4px 0;font-weight:600;">${customerName}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Email:</td><td style="padding:4px 0;">${customerEmail}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Phone:</td><td style="padding:4px 0;">+91 ${customerPhone}</td></tr>
            <tr><td style="padding:4px 0;color:#666;">Order Status:</td><td style="padding:4px 0;"><span style="background:#EAB308;color:#fff;padding:3px 10px;border-radius:12px;font-size:13px;font-weight:600;">Ordered</span></td></tr>
          </table>

          <h2 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;">Delivery Address</h2>
          <p style="margin:8px 0;">
            ${addressLine1}<br/>
            ${addressLine2 ? addressLine2 + "<br/>" : ""}
            ${city}, ${state} - ${pincode}
          </p>

          <h2 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;">Order Items</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
            <thead>
              <tr style="background:#f0f5f1;">
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;">Item</th>
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">Qty</th>
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">Price</th>
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
            <tfoot>
              <tr style="background:#1a3a2a;">
                <td colspan="3" style="padding:10px 12px;color:#fff;font-weight:700;">Total (${totalQuantity} item${totalQuantity > 1 ? "s" : ""})</td>
                <td style="padding:10px 12px;color:#D4A843;font-weight:700;text-align:right;">₹${Number(totalAmount).toLocaleString("en-IN")}</td>
              </tr>
            </tfoot>
          </table>

          ${paymentSection}
        </div>

        <div style="background:#f0f5f1;padding:16px;text-align:center;color:#666;font-size:12px;">
          <p style="margin:0;">This is an automated order notification from Bhargavi Teja Collections</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: recipientEmail,
      subject: `New Order from ${customerName} — ₹${Number(totalAmount).toLocaleString("en-IN")} | Status: Ordered`,
      htmlBody,
    });

    if (customerEmail && customerEmail.trim()) {
      try {
        const customerHtml = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
            <div style="background:#1a3a2a;padding:20px;text-align:center;">
              <h1 style="color:#D4A843;margin:0;font-size:22px;">Bhargavi Teja Collections</h1>
            </div>
            <div style="padding:24px;">
              <div style="text-align:center;margin-bottom:24px;">
                <div style="display:inline-block;background:#EAB308;color:#fff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                  Order Confirmed
                </div>
              </div>
              <p style="font-size:16px;color:#333;">Dear ${customerName},</p>
              <p style="font-size:15px;color:#555;line-height:1.6;">Thank you for your order! We have received it and will begin processing shortly. You will receive updates as your order progresses.</p>
              <h3 style="color:#1a3a2a;border-bottom:2px solid #D4A843;padding-bottom:8px;font-size:15px;">Order Items</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
                <thead>
                  <tr style="background:#f0f5f1;">
                    <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;font-size:13px;">Item</th>
                    <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;font-size:13px;">Qty</th>
                    <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;font-size:13px;">Price</th>
                  </tr>
                </thead>
                <tbody>${items.map((item: { name: string; price: number; quantity: number }) => `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;">${item.name}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">${item.quantity || 1}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;">₹${item.price.toLocaleString("en-IN")}</td></tr>`).join("")}</tbody>
                <tfoot>
                  <tr style="background:#1a3a2a;">
                    <td colspan="2" style="padding:10px 12px;color:#fff;font-weight:700;font-size:14px;">Total</td>
                    <td style="padding:10px 12px;color:#D4A843;font-weight:700;text-align:right;font-size:14px;">₹${Number(totalAmount).toLocaleString("en-IN")}</td>
                  </tr>
                </tfoot>
              </table>
              <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 4px;font-size:13px;color:#888;">Delivery Address</p>
                <p style="margin:0;font-size:14px;color:#333;">${addressLine1}${addressLine2 ? ", " + addressLine2 : ""}, ${city}, ${state} - ${pincode}</p>
              </div>
              <p style="font-size:14px;color:#888;margin-top:20px;">If you have any questions, feel free to call us at <strong>+91 91003 69789</strong>.</p>
            </div>
            <div style="background:#f0f5f1;padding:16px;text-align:center;color:#666;font-size:12px;">
              <p style="margin:0;">Thank you for shopping with Bhargavi Teja Collections</p>
            </div>
          </div>
        `;

        await sendEmail({
          to: customerEmail,
          subject: `Order Confirmed — Bhargavi Teja Collections`,
          htmlBody: customerHtml,
        });
      } catch (emailErr) {
        console.error("Customer confirmation email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, screenshotUrl: screenshotUrl || null });
  } catch (err) {
    console.error("Order submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit order" },
      { status: 500 }
    );
  }
}
