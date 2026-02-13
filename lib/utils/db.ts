import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareBindings } from "@/src/types/env";
import * as schema from "@/db/schema";

export type AppDB = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Cloudflare D1 DB instance を取得
 * 必ず request context 内で呼ぶこと
 */
export async function getDB(): Promise<AppDB> {
  const { env } = await getCloudflareContext<CloudflareBindings>({ async: true });

  if (!("DB" in env)) {
    throw new Error("D1 binding not found");
  }

  return drizzle((env as CloudflareBindings).DB, { schema });
}
