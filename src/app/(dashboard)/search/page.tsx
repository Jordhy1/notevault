import { searchNotes } from "@/features/search/search";
import { NoteGrid } from "@/components/notes/note-card";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const notes = await searchNotes(q);
  return <div className="mx-auto max-w-6xl"><h1 className="text-3xl font-bold">Search results</h1><p className="mt-2 text-sm text-zinc-500">{q ? `Results for “${q}”` : "Search your notes by title, content, tag, or collection."}</p><div className="mt-8">{q && !notes.length ? <div className="rounded-2xl border border-dashed p-12 text-center text-zinc-500">No notes found.<br />Try another keyword or tag.</div> : <NoteGrid notes={notes} />}</div></div>;
}
