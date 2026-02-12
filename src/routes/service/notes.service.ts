import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { notes } from "@/db/schema/notes";




export async function getAllNotes() {
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );

  return db.select().from(notes);
}

export async function createNote(title: string, content: string) {
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );

  await db.insert(notes).values({
    title,
    content,
  });
}
