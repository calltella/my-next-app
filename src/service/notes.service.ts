// /app/src/service/notes.service.ts

import { notes } from "@/db/schema/notes";

import { getDB } from "@/lib/utils/db";
import { desc } from "drizzle-orm";

export async function getAllNotes() {
  const db = await getDB();
  return db.select().from(notes).orderBy(desc(notes.id));
}

export async function createNote(title: string, content: string) {
  const db = await getDB();
  await db.insert(notes).values({
    title,
    content,
  });
}
