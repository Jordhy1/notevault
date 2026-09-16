import { notFound } from "next/navigation";
import { getTagById } from "@/features/tags/queries";
import { NoteGrid } from "@/components/notes/note-card";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const tag = await getTagById(tagId);
  if (!tag) notFound();
  return <><h1 className="text-3xl font-bold">#{tag.name}</h1><div className="mt-8"><NoteGrid notes={tag.notes.map(({ note }) => ({ ...note, tags: [], collection: null }))} /></div></>;
}
