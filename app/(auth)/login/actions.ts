// /app/app/(auth)/login/actions.ts
"use server";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type NextRedirectError = {
  digest: string;
};

function isNextRedirectError(error: unknown): error is NextRedirectError {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const next = formData.get("next") as string | null;

  if (!email || !password) {
    redirect("/login?error=AuthError");
  }
  console.log(`email: ${email} - password: ${password}`)
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: next || "/user/dashboard",
    });
  } catch (error: unknown) {
    /**
     * ✅ 成功時の NEXT_REDIRECT は必ず素通し
     */
    if (isNextRedirectError(error)) {
      throw error;
    }

    console.error("Login failed:", error);
    /**
     * ❌ それ以外はすべてログイン画面へ
     */
    redirect("/login?error=AuthError");
  }
}
