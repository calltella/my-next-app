// /app/src/routes/notes/notesRoute.ts

import { Hono } from "hono";
import { notes } from "@/db/schema/notes";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";

export const notesRoute = new Hono();

notesRoute.get("/", async (c) => {
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );
  const filesResponse = await db.select().from(notes).orderBy(desc(notes.id));
  return c.json(filesResponse);
});

notesRoute.post("/insert", async (c) => {
  const formData = await c.req.formData();

  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return c.json({ error: "Invalid form data" }, 400);
  }

  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );

  await db.insert(notes).values({
    title,
    content,
  });

  return c.redirect("/notes");
});