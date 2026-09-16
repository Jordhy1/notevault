import type { NoteCardData } from "@/components/notes/note-card";

const cache = new Map<string, NoteCardData[]>();

export function getCachedNotes(view: string) {
  return cache.get(view);
}

export function setCachedNotes(view: string, notes: NoteCardData[]) {
  cache.set(view, notes);
}

export function invalidateNotesCache() {
  cache.clear();
  if (typeof window !== "undefined") window.dispatchEvent(new Event("notevault:invalidate-notes"));
}
