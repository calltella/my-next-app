// /app/app/api/[[...route]]/route.ts

import { Hono } from "hono";
import { handle } from "hono/vercel";


import { filesRoute } from "@/src/routes/files";
import { uploadRoute } from "@/src/routes/upload";
import { downloadRoute } from "@/src/routes/download";

import { notesRoute } from "@/src/routes/notes/notesRoute"

const app = new Hono().basePath("/api");

// ファイル共有アプリ
app.route("/files", filesRoute);
app.route("/upload", uploadRoute);
app.route("/download", downloadRoute);

// ノートアプリ
app.route("/notes", notesRoute);

// Next.js は「GET / POST を Hono に渡すだけ」
const handler = handle(app);

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
