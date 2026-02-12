import { Hono } from "hono";
import { files } from "@/db/schema/files";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";

export const downloadRoute = new Hono();


downloadRoute.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const db = drizzle(
      (getCloudflareContext().env as any).DB as unknown as D1Database
    );
    const fileResults = await db
      .select()
      .from(files)
      .where(eq(files.id, id))
      .limit(1);

    if (fileResults.length === 0) {
      return c.json({ error: "ファイルが見つかりません" }, 404);
    }

    const fileInfo = fileResults[0];

    if (new Date() > new Date(fileInfo.expiresAt)) {
      return c.json({ error: "ファイルの有効期限が切れています" }, 410); // Gone
    }

    const r2 = (getCloudflareContext().env as any).R2 as unknown as R2Bucket;
    console.log(fileInfo);
    const r2Object = await r2.get(fileInfo.filePath);

    if (r2Object === null) {
      return c.json({ error: "ストレージ上にファイルが見つかりません" }, 404);
    }

    const arrayBuffer = await r2Object.arrayBuffer();
    c.header(
      "Content-Disposition",
      `attachment; filename="${fileInfo.fileName}"`
    );
    c.header(
      "Content-Type",
      fileInfo.contentType || "application/octet-stream"
    );
    c.header("Content-Length", String(arrayBuffer.byteLength));

    return c.body(arrayBuffer);
  } catch (error) {
    console.error("ダウンロードエラー:", error);
    return c.json(
      { error: "ファイルのダウンロード中にエラーが発生しました" },
      500
    );
  }
});