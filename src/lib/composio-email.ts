import Composio from "@composio/client";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY!,
});

export async function sendEmail({
  to,
  subject,
  htmlBody,
}: {
  to: string;
  subject: string;
  htmlBody: string;
}) {
  const result = await composio.tools.execute("GMAIL_SEND_EMAIL", {
    connected_account_id: process.env.COMPOSIO_CONNECTED_ACCOUNT_ID!,
    user_id: process.env.COMPOSIO_USER_ID!,
    arguments: {
      recipient_email: to,
      subject,
      body: htmlBody,
      is_html: true,
      user_id: "me",
    },
  });

  if (!result.successful) {
    throw new Error(result.error || "Composio email failed");
  }

  return result;
}
