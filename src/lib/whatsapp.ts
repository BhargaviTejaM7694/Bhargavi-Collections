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

async function sendWhatsAppMessage(
  to: string,
  templateName: string,
  languageCode: string,
  components: Record<string, unknown>[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getConfig();
  if (!config) return { success: false, error: "WhatsApp not configured" };

  const url = `${WHATSAPP_API_URL}/${config.phoneNumberId}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to: formatIndianPhone(to),
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      components,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
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

// Message 1: Order created — order number, item count, total
export async function sendOrderConfirmation({
  customerPhone,
  customerName,
  orderId,
  totalAmount,
  itemCount,
}: {
  customerPhone: string;
  customerName: string;
  orderId: string;
  totalAmount: string;
  itemCount: number;
}) {
  return sendWhatsAppMessage(customerPhone, "order_confirmation", "en", [
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
