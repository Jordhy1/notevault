import { notFound } from "next/navigation";
import { getNoteById } from "@/features/notes/queries";
import { getCollections } from "@/features/collections/queries";
import { NoteEditor } from "@/components/notes/note-editor";
import { NoteActions } from "@/components/notes/note-actions";
import { NoteMetadata } from "@/components/notes/note-metadata";
import { NoteOpenedTracker } from "@/components/notes/note-opened-tracker";
import Link from "next/link";

export default async function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params;
  const [note, collections] = await Promise.all([getNoteById(noteId), getCollections()]);
  if (!note) notFound();
  return <div className="mx-auto max-w-3xl"><NoteOpenedTracker noteId={note.id} /><Link href="/notes" className="text-sm text-zinc-500">Back to notes</Link><div className="mt-8 space-y-5"><NoteActions note={note} /><NoteMetadata note={{ ...note, collectionId: note.collectionId }} collections={collections} /><NoteEditor note={note} /></div></div>;
}
