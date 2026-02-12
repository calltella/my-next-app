

import type { Note } from "@/db/schema/notes";
import { createNote } from "./actions"
import { utcFormatDateTimeWithDay } from "@/lib/utils/date"


export default async function NotesPage() {
  const res = await fetch(
    '/api/notes',
    { cache: "no-store" }
  );

  const notes: Note[] = await res.json();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Notes</h1>

      {/* ノート作成フォーム */}
      <form action="/api/notes/insert"
        method="post" className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="タイトル"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="内容"
            rows={4}
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
        >
          登録
        </button>
      </form>

      {/* ノート一覧 */}
      {notes.length === 0 ? (
        <p className="text-gray-500">ノートがありません</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((f: Note) => (
            <li key={f.id} className="rounded border p-4">
              <h2 className="font-semibold">{f.title}</h2>
              <p className="mt-2 text-gray-700">{f.content}</p>
              <p className="mt-2 text-xs text-gray-400">
                {utcFormatDateTimeWithDay(f.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
