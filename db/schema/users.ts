// /app/db/schema/users.ts

import { sqliteTable, text, integer, index, uniqueIndex, unique } from 'drizzle-orm/sqlite-core';
import { relations } from "drizzle-orm";
import { timestamps } from "./columns.helpers"

export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
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
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull()
    .unique()
    .references(() => user.id),
  type: text("type").notNull(),
  themeMode: text("theme_mode", {
    enum: [
      "default",
      "light",
      "dark",
      "system"
    ]
  }).default("default"),
  colorThemes: text("color_themes", {
    enum: [
      "default",
      "blue",
      "green",
      "purple",
      "orange"
    ]
  }).default("default"),
});

// references = DBレベルの外部キー制約
// relations = DrizzleのORMレベルの関連定義（型・JOIN用）
export const userRelations = relations(user, ({ one }) => ({
  account: one(account),
}));

// schemaからTypeを宣言（読み取り用）
export type User = typeof user.$inferSelect;

// schemaからTypeを宣言（書き込み用）
export type NewUser = typeof user.$inferInsert;
