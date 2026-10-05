import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const SECRET =
  process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const id = randomBytes(24).toString("hex");
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const data = `${id}.${expires}`;
  const sig = sign(data);
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  if (!SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [id, expiresStr, providedSig] = parts;
  const expires = Number(expiresStr);
  if (isNaN(expires) || Date.now() > expires) return false;

  const expectedSig = sign(`${id}.${expiresStr}`);
  try {
    return timingSafeEqual(
      Buffer.from(providedSig, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  } catch {
    return false;
  }
}
