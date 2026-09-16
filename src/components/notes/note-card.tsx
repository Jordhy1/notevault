import Link from "next/link";
import { stripHtml } from "@/lib/utils/text";

export type NoteCardData = { id: string; title: string; content: string; type: string; isPinned: boolean; isFavorite: boolean; updatedAt: Date | string; collection?: { name: string } | null; tags: { tag: { name: string } }[] };
type NoteCardProps = { note: NoteCardData };

export function NoteCard({ note }: NoteCardProps) {
  return <Link href={`/notes/${note.id}`} className="group block rounded-xl border border-zinc-200/90 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-[0_8px_24px_rgb(24_24_22_/_0.06)] dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600"><div className="flex items-start justify-between gap-4"><div><span className="rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800">{note.type}</span><h3 className="mt-3 line-clamp-1 font-semibold tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{note.title}</h3></div><span aria-label={note.isFavorite ? "Favorite" : note.isPinned ? "Pinned" : undefined} className="text-sm text-zinc-400">{note.isFavorite ? "*" : note.isPinned ? "!" : ""}</span></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{stripHtml(note.content) || "Empty note"}</p><div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-500">{note.collection && <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">{note.collection.name}</span>}{note.tags.slice(0, 3).map(({ tag }) => <span key={tag.name}>#{tag.name}</span>)}</div></Link>;
}

export function NoteGrid({ notes }: { notes: NoteCardData[] }) {
  if (!notes.length) return <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">Nothing here yet. Create your first note to get started.</p>;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{notes.map((note) => <NoteCard key={note.id} note={note} />)}</div>;
}
