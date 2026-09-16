"use client";

import { useState, useTransition } from "react";
import { createCollection, deleteCollection, updateCollection } from "@/features/collections/mutations";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Toast } from "@/components/ui/toast";

type Collection = { id: string; name: string; description: string | null; icon: string | null; _count: { notes: number } };

export function CollectionManager({ initialCollections }: { initialCollections: Collection[] }) {
  const [collections, setCollections] = useState(initialCollections);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Collection | null>(null);
  const run = (action: () => Promise<unknown>, success: string) => startTransition(async () => { try { await action(); setMessage(success); } catch { setMessage("Unable to update collection"); } });

  return <div className="space-y-6"><form onSubmit={(event) => { event.preventDefault(); if (!name.trim()) return; run(async () => { const collection = await createCollection({ name }); setCollections((current) => [...current, { ...collection, description: collection.description ?? null, icon: collection.icon ?? null, _count: { notes: 0 } }]); setName(""); }, "Collection created"); }} className="flex max-w-lg gap-2"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="New collection name" className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none dark:border-zinc-800 dark:bg-zinc-900" /><button disabled={pending} className="rounded-xl bg-zinc-950 px-4 py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950">Add</button></form><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{collections.map((collection) => <div key={collection.id} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{collection.icon ?? "📁"} {collection.name}</h2><p className="mt-2 text-sm text-zinc-500">{collection._count.notes} notes</p></div><div className="flex gap-2"><button disabled={pending} onClick={() => { const nextName = window.prompt("Collection name", collection.name); if (nextName?.trim()) run(async () => { await updateCollection(collection.id, { name: nextName }); setCollections((current) => current.map((item) => item.id === collection.id ? { ...item, name: nextName } : item)); }, "Collection renamed"); }} className="text-xs text-zinc-500 underline">Rename</button><button disabled={pending} onClick={() => setDeleteTarget(collection)} className="text-xs text-red-600 underline">Delete</button></div></div></div>)}</div>{!collections.length && <p className="rounded-2xl border border-dashed p-10 text-center text-zinc-500">No collections yet.</p>}<Toast message={message} tone={message === "Unable to update collection" ? "error" : "success"} /><ConfirmDialog open={Boolean(deleteTarget)} title="Delete collection?" description="Notes inside it will be kept, but the collection itself will be removed." onCancel={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) run(async () => { await deleteCollection(deleteTarget.id); setCollections((current) => current.filter((item) => item.id !== deleteTarget.id)); }, "Collection deleted"); setDeleteTarget(null); }} pending={pending} /></div>;
}
