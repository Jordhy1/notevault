"use client";

import { useTheme, type Theme } from "./theme-provider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return <label className="grid max-w-xs gap-2 text-sm font-medium">Appearance<select suppressHydrationWarning value={theme} onChange={(event) => setTheme(event.target.value as Theme)} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 font-normal dark:border-zinc-800 dark:bg-zinc-900"><option value="system">System (default)</option><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
