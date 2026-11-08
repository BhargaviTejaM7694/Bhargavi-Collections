const WHATSAPP_API_URL = "https://graph.facebook.com/v21.0";

interface WhatsAppConfig {
  phoneNumberId: string;
  accessToken: string;
}

function getConfig(): WhatsAppConfig | null {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) return null;
  return { phoneNumberId, accessToken };
}

function formatIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

async function sendWhatsAppRequest(
  phoneNumberId: string,
  accessToken: string,
  body: Record<string, unknown>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const url = `${WHATSAPP_API_URL}/${phoneNumberId}/messages`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data?.error?.message || `HTTP ${res.status}`;
      console.error("WhatsApp API error:", errMsg, data);
      return { success: false, error: errMsg };
    }

    return { success: true, messageId: data?.messages?.[0]?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("WhatsApp send failed:", msg);
    return { success: false, error: msg };
  }
}

async function sendWhatsAppMessage(
  to: string,
  templateName: string,
  languageCode: string,
  components: Record<string, unknown>[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getConfig();
  if (!config) return { success: false, error: "WhatsApp not configured" };

  return sendWhatsAppRequest(config.phoneNumberId, config.accessToken, {
    messaging_product: "whatsapp",
    to: formatIndianPhone(to),
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      components,
    },
  });
}

async function sendImageMessage(
  to: string,
  imageUrl: string,
  caption: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getConfig();
  if (!config) return { success: false, error: "WhatsApp not configured" };

  return sendWhatsAppRequest(config.phoneNumberId, config.accessToken, {
    messaging_product: "whatsapp",
    to: formatIndianPhone(to),
    type: "image",
    image: {
      link: imageUrl,
      caption,
    },
  });
}

// Message 1: Order created — order number, item count, total, then product images
export async function sendOrderConfirmation({
  customerPhone,
  customerName,
  orderId,
  totalAmount,
  itemCount,
  items,
}: {
  customerPhone: string;
  customerName: string;
  orderId: string;
  totalAmount: string;
  itemCount: number;
  items?: { name: string; quantity: number; image?: string }[];
}) {
  const result = await sendWhatsAppMessage(customerPhone, "order_confirmation", "en", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: orderId },
        { type: "text", text: `${itemCount}` },
        { type: "text", text: `₹${Number(totalAmount).toLocaleString("en-IN")}` },
      ],
    },
  ]);

  if (result.success && items?.length) {
    const itemsWithImages = items.filter((item) => item.image);
    for (const item of itemsWithImages) {
      const qty = item.quantity || 1;
      const caption = `${item.name}${qty > 1 ? ` (Qty: ${qty})` : ""}`;
      try {
        await sendImageMessage(customerPhone, item.image!, caption);
      } catch (err) {
        console.error(`Failed to send image for ${item.name}:`, err);
      }
    }
  }

  return result;
}

// Message 2: Order status changed to Processing
export async function sendOrderProcessing({
  customerPhone,
  customerName,
  orderId,
}: {
  customerPhone: string;
  customerName: string;
  orderId: string;
}) {
  return sendWhatsAppMessage(customerPhone, "order_processing", "en", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: orderId },
      ],
    },
  ]);
}

// Message 3: Order status changed to Shipped (delivery in 3-5 days)
export async function sendOrderShipped({
  customerPhone,
  customerName,
  orderId,
}: {
  customerPhone: string;
  customerName: string;
  orderId: string;
}) {
  return sendWhatsAppMessage(customerPhone, "order_shipped", "en", [
    {
      type: "body",
      parameters: [
        { type: "text", text: customerName },
        { type: "text", text: orderId },
      ],
    },
  ]);
}

export function isWhatsAppConfigured(): boolean {
  return getConfig() !== null;
}
