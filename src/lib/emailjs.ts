import emailjs from "@emailjs/browser";

interface EmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  productName: string;
  productPrice: string;
  productLink: string;
  paymentScreenshotUrl: string;
}

export async function sendOrderEmail(data: EmailData): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables not configured");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      address_line1: data.addressLine1,
      address_line2: data.addressLine2,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      product_name: data.productName,
      product_price: data.productPrice,
      product_link: data.productLink,
      payment_screenshot: data.paymentScreenshotUrl,
    },
    publicKey
  );
}
