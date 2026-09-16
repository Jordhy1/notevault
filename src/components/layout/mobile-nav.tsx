import Link from "next/link";

const items = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Search", href: "/search", icon: "⌕" },
  { label: "Collections", href: "/collections", icon: "▦" },
  { label: "More", href: "/settings", icon: "⋯" },
];

export function MobileNav() {
  return <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/95" aria-label="Mobile navigation"><div className="mx-auto flex max-w-md items-end justify-between"><Link href="/" className="flex w-16 flex-col items-center gap-1 text-xs text-zinc-500"><span className="text-xl">⌂</span><span>Home</span></Link><Link href="/search" className="flex w-16 flex-col items-center gap-1 text-xs text-zinc-500"><span className="text-xl">⌕</span><span>Search</span></Link><Link href="/notes/new" aria-label="Create note" className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-2xl text-white shadow-lg dark:bg-white dark:text-zinc-950">+</Link>{items.slice(2).map((item) => <Link key={item.href} href={item.href} className="flex w-16 flex-col items-center gap-1 text-xs text-zinc-500"><span className="text-xl">{item.icon}</span><span>{item.label}</span></Link>)}</div></nav>;
}
