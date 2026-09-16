import { notFound } from "next/navigation";
import { getCollectionById } from "@/features/collections/queries";
import { NoteGrid } from "@/components/notes/note-card";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;
  const collection = await getCollectionById(collectionId);
  if (!collection) notFound();
  return <><h1 className="text-3xl font-bold">{collection.name}</h1><div className="mt-8"><NoteGrid notes={collection.notes.map((note) => ({ ...note, collection, tags: note.tags, isPinned: note.isPinned, isFavorite: note.isFavorite }))} /></div></>;
}
