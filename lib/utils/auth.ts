import bcrypt from "bcryptjs";
import type { ThemeMode } from "@/src/types/user"
import type { ColorThemeKey } from "@/app/theme/colorTheme";
import { getUser, getAccount } from "@/src/service/users.service"
import type { User } from "@/db/schema/users";

/**
 * メールアドレスとハッシュ化前パスワードでユーザーを取得
 * @param email string
 * @param password string（平文）
 */
export async function getUserFromDb(
  email: string,
  password: string
): Promise<User | null> {
  const user = await getUser(email); // emailで検索

  if (!user) return null;

  if (!user.passwordHash) return null;

  console.log(`/app/lib/utils/auth.ts : ${user.passwordHash}`)
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) return null;

  return user;
}

/**
 * userId から account を取得
 */
export async function getAccountFromDb(userId: string) {
  return await getAccount(userId);
}