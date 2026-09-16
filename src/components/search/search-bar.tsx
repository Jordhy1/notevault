"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Result = { id: string; title: string; type: string };

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    const value = query.trim();
    if (!value) return;
    const timer = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      if (response.ok) setResults(await response.json());
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  return <div className="relative w-full max-w-md"><form action="/search"><input id="global-search" value={query} onChange={(event) => { const value = event.target.value; setQuery(value); if (!value.trim()) setResults([]); }} name="q" placeholder="Search your notes... (⌘K)" className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900" /></form>{results.length > 0 && <div className="absolute z-10 mt-2 w-full rounded-xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">{results.slice(0, 5).map((result) => <Link onClick={() => setQuery("")} href={`/notes/${result.id}`} key={result.id} className="block rounded-lg p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"><span className="text-xs text-zinc-500">{result.type}</span><p className="font-medium">{result.title}</p></Link>)}<Link href={`/search?q=${encodeURIComponent(query)}`} className="block border-t border-zinc-200 p-3 text-sm text-zinc-500 dark:border-zinc-800">View all results</Link></div>}</div>;
}
