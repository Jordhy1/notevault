"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteNote, toggleFavorite, togglePinned } from "@/features/notes/mutations";
import { Toast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { invalidateNotesCache } from "@/lib/client/notes-cache";

export function NoteActions({ note }: { note: { id: string; isFavorite: boolean; isPinned: boolean; content: string } }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [favorite, setFavorite] = useState(note.isFavorite);
  const [pinned, setPinned] = useState(note.isPinned);
  const run = (action: () => Promise<unknown>, success: string) => startTransition(async () => {
    try { await action(); invalidateNotesCache(); setMessage(success); router.refresh(); } catch { setMessage("Something went wrong"); }
  });
  const copy = async () => { try { const text = new DOMParser().parseFromString(note.content, "text/html").body.textContent ?? note.content; await navigator.clipboard.writeText(text); setMessage("Copied"); } catch { setMessage("Unable to copy"); } };

  return <div className="flex flex-wrap items-center gap-2">
    <button disabled={pending} onClick={() => { setFavorite((value) => !value); run(() => toggleFavorite(note.id), favorite ? "Removed from favorites" : "Added to favorites"); }} className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800">{favorite ? "* Favorited" : "☆ Favorite"}</button>
    <button disabled={pending} onClick={() => { setPinned((value) => !value); run(() => togglePinned(note.id), pinned ? "Unpinned" : "Pinned"); }} className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800">{pinned ? "! Pinned" : "Pin"}</button>
    <button onClick={copy} className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Copy</button>
    <button disabled={pending} onClick={() => setConfirmOpen(true)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950">Delete</button>
    <ConfirmDialog open={confirmOpen} title="Delete this note?" description="This action cannot be undone." onCancel={() => setConfirmOpen(false)} onConfirm={() => run(async () => { await deleteNote(note.id); setConfirmOpen(false); router.push("/notes"); }, "Deleted")} pending={pending} />
    <Toast message={message} tone={message.includes("Unable") || message === "Something went wrong" ? "error" : "success"} />
  </div>;
}
