import { NewNoteForm } from "@/components/notes/new-note-form";

export default async function NewNotePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const allowed = ["GENERAL", "PROMPT", "IDEA", "STUDY", "WORK", "CODE", "BOOKMARK", "TODO", "REFERENCE"] as const;
  const initialType = allowed.includes(type as (typeof allowed)[number]) ? type as (typeof allowed)[number] : "GENERAL";
  return <div className="mx-auto max-w-3xl"><p className="text-sm text-zinc-500">Create something worth keeping</p><h1 className="mt-2 text-3xl font-bold">New note</h1><NewNoteForm initialType={initialType} /></div>;
}
