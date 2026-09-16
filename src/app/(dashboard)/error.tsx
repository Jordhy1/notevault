"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-red-950 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-100"><p className="text-sm font-medium text-red-700 dark:text-red-300">Workspace error</p><h2 className="mt-2 text-xl font-semibold">This page could not load.</h2><p className="mt-2 text-sm text-red-800/80 dark:text-red-200/80">Your notes are safe. Try loading the page again, or return to the home workspace.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={reset} className="rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 dark:bg-red-100 dark:text-red-950">Try again</button><Link href="/" className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-950">Go home</Link></div>{error.digest && <p className="mt-5 text-xs text-red-700/70 dark:text-red-300/70">Reference: {error.digest}</p>}</div>;
}
