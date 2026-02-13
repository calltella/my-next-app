// /app/src/service/notes.service.ts

import { getDB } from "@/lib/utils/db";

export async function getUser(
  email: string
) {
  const db = await getDB();
  return await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });
}

export async function getAccount(
  userId: string,
) {
  const db = await getDB();
  return await db.query.account.findFirst({
    where: (u, { eq }) => eq(u.userId, userId),
  });
}


