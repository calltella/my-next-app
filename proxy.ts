// /proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  runtime: 'edge',
  matcher: ["/dashboard/:path*"],
};