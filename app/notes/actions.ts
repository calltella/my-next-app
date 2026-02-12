'use server';
import { revalidatePath } from "next/cache";
import { getBaseUrl } from "@/lib/utils/getBaseUrl"

export async function createNote(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("Invalid form data");
  }

  if (!title.trim()) {
    throw new Error("Title is required");
  }

  const baseUrl = await getBaseUrl();

  const response = await fetch(`${baseUrl}/api/notes/insert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });



  if (!response.ok) {
    throw new Error(
      `Upload failed: ${response.status} ${response.statusText}`
    );
  }

  // /notes を再検証 → 一覧が更新される
  revalidatePath("/notes");
}