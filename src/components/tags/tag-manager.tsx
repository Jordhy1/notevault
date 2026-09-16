"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createTag, deleteTag, renameTag } from "@/features/tags/mutations";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Toast } from "@/components/ui/toast";

type Tag = { id: string; name: string; _count: { notes: number } };

export function TagManager({ initialTags }: { initialTags: Tag[] }) {
  const [tags, setTags] = useState(initialTags);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);
  const run = (action: () => Promise<unknown>, success: string) => startTransition(async () => { try { await action(); setMessage(success); } catch { setMessage("Unable to update tag"); } });

  return <div className="space-y-6"><form onSubmit={(event) => { event.preventDefault(); if (!name.trim()) return; run(async () => { const tag = await createTag({ name }); setTags((current) => [...current, { ...tag, _count: { notes: 0 } }]); setName(""); }, "Tag created"); }} className="flex max-w-lg gap-2"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="New tag name" className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none dark:border-zinc-800 dark:bg-zinc-900" /><button disabled={pending} className="rounded-xl bg-zinc-950 px-4 py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950">Add</button></form><div className="flex flex-wrap gap-3">{tags.map((tag) => <div key={tag.id} className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 dark:border-zinc-800"><Link href={`/tags/${tag.id}`} className="text-sm">#{tag.name} <span className="text-zinc-500">{tag._count.notes}</span></Link><button disabled={pending} onClick={() => { const nextName = window.prompt("Tag name", tag.name); if (nextName?.trim()) run(async () => { await renameTag(tag.id, { name: nextName }); setTags((current) => current.map((item) => item.id === tag.id ? { ...item, name: nextName.toLowerCase() } : item)); }, "Tag renamed"); }} className="text-xs text-zinc-500 underline">Rename</button><button disabled={pending} onClick={() => setDeleteTarget(tag)} aria-label={`Delete ${tag.name}`} className="text-xs text-red-600">×</button></div>)}</div>{!tags.length && <p className="rounded-2xl border border-dashed p-10 text-center text-zinc-500">No tags yet.</p>}<Toast message={message} tone={message === "Unable to update tag" ? "error" : "success"} /><ConfirmDialog open={Boolean(deleteTarget)} title="Delete tag?" description="The tag will be removed from every note using it." onCancel={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) run(async () => { await deleteTag(deleteTarget.id); setTags((current) => current.filter((item) => item.id !== deleteTarget.id)); }, "Tag deleted"); setDeleteTarget(null); }} pending={pending} /></div>;
}
