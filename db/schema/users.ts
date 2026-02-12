// /app/db/schema/users.ts

import { sqliteTable, text, integer, index, uniqueIndex, unique } from 'drizzle-orm/sqlite-core';
import { randomUUID } from "crypto";
import { timestamps } from "./columns.helpers"

export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  email: text("email").unique().notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url").default("default.png"),
  passwordHash: text("password_hash"),
  emailVerified: text("email_verified"),
  isActive: integer("is_active", { mode: 'boolean' }).default(true),
  role: text("role", { enum: ["user", "admin"] }).default("user"),
  ...timestamps
}, (t) => [
  index("name_idx").on(t.name),
  uniqueIndex("email_idx").on(t.email)
]);

export const account = sqliteTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("user_id").references(() => user.id),
  type: text("type").notNull(),
  colorThemes: text("color_thmemes", {
    enum: [
      "default",
      "blue",
      "green",
      "purple",
      "orange"
    ]
  }).default("default"),
}, (t) => [
  unique().on(t.userId, t.type)
])

// references = DBレベルの外部キー制約
// relations = DrizzleのORMレベルの関連定義（型・JOIN用）

// schemaからTypeを宣言（読み取り用）
export type User = typeof user.$inferSelect;

// schemaからTypeを宣言（書き込み用）
export type NewUser = typeof user.$inferInsert;
