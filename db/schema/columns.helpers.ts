
import { text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const timestamps = {
  updatedAt: text("updated_at"),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: text("deleted_at"),
}

export default timestamps;