"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/features/notes/mutations";
import { invalidateNotesCache } from "@/lib/client/notes-cache";

const noteTypes = ["GENERAL", "PROMPT", "IDEA", "STUDY", "WORK", "CODE", "BOOKMARK", "TODO", "REFERENCE"] as const;
type NoteType = (typeof noteTypes)[number];

export function NewNoteForm({ initialType = "GENERAL" }: { initialType?: NoteType }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<NoteType>(initialType);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const editor = useEditor({ immediatelyRender: false, extensions: [StarterKit.configure({ underline: false }), Underline, TaskList, TaskItem.configure({ nested: true })], content: "", editorProps: { attributes: { class: "tiptap min-h-[45vh] p-5 outline-none" } } });

  if (!editor) return <div className="mt-8 min-h-[50vh] animate-pulse rounded-2xl border bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900" />;
  const submit = () => {
    if (!title.trim()) { setError("Add a title before creating the note."); return; }
    setError("");
    startTransition(async () => {
      try { const note = await createNote({ title, content: editor.getHTML(), type, tagNames: [] }); invalidateNotesCache(); router.push(`/notes/${note.id}`); }
      catch { setError("Unable to create note. Please try again."); }
    });
  };
  return <div className="mt-8 space-y-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Untitled note" className="w-full bg-transparent text-3xl font-bold outline-none" autoFocus /><select value={type} onChange={(event) => setType(event.target.value as NoteType)} className="rounded-lg border bg-transparent px-3 py-2 text-sm dark:border-zinc-700"><option value="GENERAL">General</option>{noteTypes.filter((value) => value !== "GENERAL").map((value) => <option key={value} value={value}>{value}</option>)}</select></div><div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"><div className="flex flex-wrap gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800"><button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rounded-md px-2 py-1 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">B</button><button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rounded-md px-2 py-1 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">I</button><button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded-md px-2 py-1 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">List</button><button type="button" onClick={() => editor.chain().focus().toggleTaskList().run()} className="rounded-md px-2 py-1 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Todo</button></div><EditorContent editor={editor} /></div><div className="flex items-center justify-between gap-4"><p role="alert" className="text-sm text-red-600">{error}</p><button disabled={pending} onClick={submit} className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900">{pending ? "Creating..." : "Create note"}</button></div></div>;
}
