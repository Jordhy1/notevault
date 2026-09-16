"use client";

import { useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toggleFavorite, togglePinned } from "@/features/notes/mutations";

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return Boolean(element?.tagName === "INPUT" || element?.tagName === "TEXTAREA" || element?.isContentEditable);
}

export function KeyboardShortcuts() {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        document.getElementById("global-search")?.focus();
        return;
      }
      if (isTypingTarget(event.target)) {
        if (key === "escape") (event.target as HTMLElement).blur();
        return;
      }
      if (key === "n") { event.preventDefault(); router.push("/notes/new"); return; }
      const noteMatch = pathname.match(/^\/notes\/([^/]+)$/);
      if (noteMatch && (key === "f" || key === "p")) {
        event.preventDefault();
        startTransition(async () => { if (key === "f") await toggleFavorite(noteMatch[1]); else await togglePinned(noteMatch[1]); router.refresh(); });
      }
      if (noteMatch && key === "e") { event.preventDefault(); document.querySelector<HTMLElement>("[data-note-editor]")?.focus(); }
      if (key === "escape" && document.activeElement instanceof HTMLElement) document.activeElement.blur();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router, startTransition]);

  return null;
}
