import { headers } from "next/headers";

/**
 * Server Action / Server Component 専用
 * Next.js 15 対応版
 */
export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();

  const host = headersList.get("host");
  if (!host) {
    throw new Error("Host header not found");
  }

  const protocol =
    headersList.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");

  return `${protocol}://${host}`;
}
