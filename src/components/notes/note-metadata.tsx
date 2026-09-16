"use client";

import { useState, useTransition } from "react";
import { updateNoteMetadata } from "@/features/notes/mutations";
import { invalidateNotesCache } from "@/lib/client/notes-cache";

type Props = {
  note: { id: string; title: string; content: string; type: string; collectionId: string | null; tags: { tag: { name: string } }[] };
  collections: { id: string; name: string }[];
};

export function NoteMetadata({ note, collections }: Props) {
  const [type, setType] = useState(note.type);
  const [collectionId, setCollectionId] = useState(note.collectionId ?? "");
  const [tags, setTags] = useState(note.tags.map(({ tag }) => tag.name).join(", "));
  const [status, setStatus] = useState("");
  const [pending, startTransition] = useTransition();
  const save = (nextType = type, nextCollectionId = collectionId, nextTags = tags) => startTransition(async () => {
    setStatus("Saving...");
    try { await updateNoteMetadata({ id: note.id, type: nextType as never, collectionId: nextCollectionId || null, tagNames: nextTags.split(",").map((tag) => tag.trim()).filter(Boolean) }); invalidateNotesCache(); setStatus("Saved"); }
    catch { setStatus("Error saving"); }
  });
  return <div className="flex flex-wrap items-end gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
    <label className="grid gap-1 text-xs text-zinc-500">Type<select value={type} onChange={(event) => { const value = event.target.value; setType(value); save(value, collectionId, tags); }} className="rounded-lg border bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-white">{["GENERAL", "PROMPT", "IDEA", "STUDY", "WORK", "CODE", "BOOKMARK", "TODO", "REFERENCE"].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
    <label className="grid gap-1 text-xs text-zinc-500">Collection<select value={collectionId} onChange={(event) => { const value = event.target.value; setCollectionId(value); save(type, value, tags); }} className="rounded-lg border bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-white"><option value="">No collection</option>{collections.map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}</select></label>
    <label className="grid min-w-52 flex-1 gap-1 text-xs text-zinc-500">Tags <input value={tags} onChange={(event) => setTags(event.target.value)} onBlur={() => save()} placeholder="react, idea" className="rounded-lg border bg-transparent px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-white" /></label>
    <span className="text-xs text-zinc-500">{pending ? "Saving..." : status}</span>
  </div>;
}
