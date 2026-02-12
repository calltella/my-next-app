import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto";

export const files = sqliteTable("files", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  fileName: text("fileName").notNull(),
  filePath: text("filePath").notNull(),
  contentType: text("contentType").notNull(),
  expiresAt: text("expiresAt").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// schemaからTypeを宣言（読み取り用）
export type File = typeof files.$inferSelect;

// schemaからTypeを宣言（書き込み用）
export type NewFile = typeof files.$inferInsert;

