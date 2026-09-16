"use client";

import { NoteGrid } from "@/components/notes/note-card";
import { useNotesCache } from "@/components/notes/notes-cache-provider";

type NotesView = "all" | "favorites" | "pinned" | "recent";
const labels: Record<NotesView, { title: string; description: string }> = { all: { title: "Notes", description: "Everything you have captured in NoteVault." }, favorites: { title: "Favorites", description: "Notes you want to keep close." }, pinned: { title: "Pinned", description: "Important notes that should stay visible." }, recent: { title: "Recent", description: "Notes you opened most recently." } };

export function CachedNoteList({ view }: { view: NotesView }) {
  const { notes, loading, error, reload } = useNotesCache(view);
  const label = labels[view];
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-semibold tracking-tight">{label.title}</h1><p className="mt-2 text-sm text-zinc-500">{label.description}</p></div></div><div className="mt-8">{loading ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="h-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" /><div className="h-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" /><div className="h-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" /></div> : error ? <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"><p>Unable to load notes.</p><button onClick={reload} className="mt-4 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white">Try again</button></div> : <NoteGrid notes={notes} />}</div></div>;
}
