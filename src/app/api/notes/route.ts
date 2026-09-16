import { NextResponse } from "next/server";
import { getFavoriteNotes, getPinnedNotes, getRecentNotes, getNotes } from "@/features/notes/queries";

export async function GET(request: Request) {
  const view = new URL(request.url).searchParams.get("view") ?? "recent";
  try {
    const notes = view === "favorites" ? await getFavoriteNotes() : view === "pinned" ? await getPinnedNotes() : view === "all" ? await getNotes() : await getRecentNotes();
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json({ error: "Unable to load notes" }, { status: 500 });
  }
}
