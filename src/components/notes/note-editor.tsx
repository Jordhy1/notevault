"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useEffect, useRef, useState, useTransition } from "react";
import { updateNoteContent } from "@/features/notes/mutations";
import { invalidateNotesCache } from "@/lib/client/notes-cache";

type Props = { note: { id: string; title: string; content: string; type: string; collection?: { id: string } | null; tags: { tag: { name: string } }[] } };

export function NoteEditor({ note }: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState("Saved");
  const [pending, startTransition] = useTransition();
  const firstRender = useRef(true);
  const editor = useEditor({ immediatelyRender: false, extensions: [StarterKit.configure({ link: false, underline: false }), Underline, Link.configure({ openOnClick: false }), TaskList, TaskItem.configure({ nested: true })], content: note.content, editorProps: { attributes: { class: "tiptap min-h-[45vh] p-5 outline-none" } }, onUpdate: ({ editor: nextEditor }) => setContent(nextEditor.getHTML()) });

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setStatus("Writing...");
    const timer = setTimeout(() => {
      setStatus("Saving...");
      startTransition(async () => {
        try { await updateNoteContent({ id: note.id, title, content }); invalidateNotesCache(); setStatus("Saved"); }
        catch { setStatus("Error saving"); }
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content, note.id]);

  if (!editor) return <div className="min-h-[50vh] animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900" />;
  const setLink = () => { const url = window.prompt("URL", editor.getAttributes("link").href ?? "https://"); if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run(); };
  return <div className="space-y-5"><input id="note-title" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full bg-transparent text-3xl font-bold outline-none" placeholder="Untitled note" /><div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"><EditorToolbar editor={editor} setLink={setLink} /><div data-note-editor><EditorContent editor={editor} /></div></div><p className="text-sm text-zinc-500">{pending ? "Saving..." : status}</p></div>;
}

function EditorToolbar({ editor, setLink }: { editor: NonNullable<ReturnType<typeof useEditor>>; setLink: () => void }) {
  return <div className="flex flex-wrap gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800"><ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton><ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton><ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></ToolbarButton><ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton><ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>List</ToolbarButton><ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton><ToolbarButton active={editor.isActive("taskList")} onClick={() => editor.chain().focus().toggleTaskList().run()}>Todo</ToolbarButton><ToolbarButton active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</ToolbarButton><ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</ToolbarButton><ToolbarButton active={editor.isActive("link")} onClick={setLink}>Link</ToolbarButton><ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>Clear</ToolbarButton></div>;
}

export function ToolbarButton({ active = false, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`rounded-md px-2 py-1 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 ${active ? "bg-zinc-200 dark:bg-zinc-700" : "text-zinc-600 dark:text-zinc-300"}`}>{children}</button>;
}
