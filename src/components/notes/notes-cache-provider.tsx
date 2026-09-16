"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { NoteCardData } from "@/components/notes/note-card";

type NotesView = "all" | "favorites" | "pinned" | "recent";
type CacheState = Partial<Record<NotesView, NoteCardData[]>>;
type NotesCacheValue = { get: (view: NotesView) => NoteCardData[] | undefined; load: (view: NotesView) => void; reload: (view?: NotesView) => void; loading: (view: NotesView) => boolean; error: (view: NotesView) => boolean };
const NotesCacheContext = createContext<NotesCacheValue | null>(null);

export function NotesCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<CacheState>({});
  const [pending, setPending] = useState<Set<NotesView>>(new Set());
  const [errors, setErrors] = useState<Set<NotesView>>(new Set());
  const inflight = useRef(new Map<NotesView, Promise<void>>());

  const load = useCallback((view: NotesView) => {
    if (cache[view] || inflight.current.has(view)) return;
    setPending((current) => new Set(current).add(view));
    setErrors((current) => { const next = new Set(current); next.delete(view); return next; });
    const request = fetch(`/api/notes?view=${view}`).then(async (response) => { if (!response.ok) throw new Error("Unable to load notes"); return response.json() as Promise<NoteCardData[]>; }).then((notes) => { setCache((current) => ({ ...current, [view]: notes })); }).catch(() => { setErrors((current) => new Set(current).add(view)); }).finally(() => { inflight.current.delete(view); setPending((current) => { const next = new Set(current); next.delete(view); return next; }); });
    inflight.current.set(view, request);
  }, [cache]);

  const reload = useCallback((view?: NotesView) => { if (view) setCache((current) => { const next = { ...current }; delete next[view]; return next; }); else setCache({}); }, []);

  useEffect(() => { const invalidate = () => reload(); window.addEventListener("notevault:invalidate-notes", invalidate); return () => window.removeEventListener("notevault:invalidate-notes", invalidate); }, [reload]);

  const value = useMemo<NotesCacheValue>(() => ({ get: (view) => cache[view], load, reload, loading: (view) => pending.has(view), error: (view) => errors.has(view) }), [cache, errors, load, pending, reload]);
  return <NotesCacheContext.Provider value={value}>{children}</NotesCacheContext.Provider>;
}

export function useNotesCache(view: NotesView) {
  const context = useContext(NotesCacheContext);
  if (!context) throw new Error("useNotesCache must be used inside NotesCacheProvider");
  const notes = context.get(view);
  useEffect(() => { if (!notes && !context.loading(view) && !context.error(view)) context.load(view); }, [context, view, notes]);
  return { notes: notes ?? [], loading: !notes && context.loading(view), error: context.error(view), reload: () => { context.reload(view); context.load(view); } };
}
