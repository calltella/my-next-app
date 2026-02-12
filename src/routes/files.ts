import { Hono } from "hono";
import { files } from "@/db/schema/files";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";

export const filesRoute = new Hono();

filesRoute.get("/", async (c) => {
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );
  const filesResponse = await db.select().from(files);
  return c.json(filesResponse);
});

filesRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );
  const file = await db.select().from(files).where(eq(files.id, id)).limit(1);
  return c.json(file[0]);
});