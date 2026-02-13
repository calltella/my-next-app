// /app/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserFromDb, getAccountFromDb } from "@/lib/utils/auth";
import type { ColorThemeKey } from "@/app/theme/colorTheme";
import type { UserRole, ThemeMode } from "@/src/types/user"
const isProduction = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }
        console.log(`/app/auth.ts : ${email}`)
        // ユーザー認証
        const user = await getUserFromDb(email, password);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return null;
        }
        // return user object with their profile data
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role ?? undefined,
          avatarUrl: user.avatarUrl ?? undefined,
        };
      },
    }),
    // --- 本番環境のみ OAuth を追加 ---
    ...(isProduction
      ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      const userId = token.id as string;
      const account = await getAccountFromDb(userId)
      session.user.id = token.id as string;
      session.user.role = token.role as UserRole;
      session.user.themeMode = account?.themeMode ?? "light";
      session.user.themeColor = account?.colorThemes ?? "default";
      return session;
    },
  },
  trustHost: true, // hostを信用する
});
