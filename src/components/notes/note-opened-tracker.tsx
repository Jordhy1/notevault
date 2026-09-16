"use client";

import { useEffect } from "react";
import { markNoteOpened } from "@/features/notes/mutations";

export function NoteOpenedTracker({ noteId }: { noteId: string }) {
  useEffect(() => {
    void markNoteOpened(noteId).catch(() => {
      // Tracking recency must never interrupt the note experience.
    });
  }, [noteId]);

  return null;
}
