"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primary = [["Home", "/", "⌂"], ["Search", "/search", "⌕"], ["Favorites", "/favorites", "☆"], ["Pinned", "/pinned", "!"], ["Recent", "/recent", "◷"]] as const;

export function WorkspaceSidebar({ footer }: { footer: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("notevault-sidebar") === "collapsed");
  const toggle = () => { const next = !collapsed; setCollapsed(next); window.localStorage.setItem("notevault-sidebar", next ? "collapsed" : "expanded"); };

  return <aside className={`hidden shrink-0 border-r border-zinc-200/80 bg-[#f2f2ef] transition-[width] duration-200 dark:border-zinc-800 dark:bg-[#1d1d1b] md:block ${collapsed ? "w-[72px]" : "w-64"}`}><div className="flex h-full min-h-screen flex-col p-3"><div className={`flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}><Link href="/" className="flex items-center gap-2 rounded-lg py-2 font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900">N</span>{!collapsed && <span>NoteVault</span>}</Link><button onClick={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-200/70 dark:hover:bg-zinc-800">{collapsed ? ">" : "<"}</button></div><Link href="/notes/new" className={`mt-5 flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white ${collapsed ? "px-0" : ""}`}><span>+</span>{!collapsed && "New note"}</Link><nav className="mt-6 space-y-1" aria-label="Workspace navigation">{primary.map(([label, href, icon]) => <SidebarLink key={href} href={href} label={label} icon={icon} collapsed={collapsed} active={href === "/" ? pathname === "/" : pathname.startsWith(href)} />)}</nav><div className="mt-7"><p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ${collapsed ? "sr-only" : ""}`}>Organize</p><SidebarLink href="/collections" label="Collections" icon="[]" collapsed={collapsed} active={pathname.startsWith("/collections")} /><SidebarLink href="/tags" label="Tags" icon="#" collapsed={collapsed} active={pathname.startsWith("/tags")} /></div>{!collapsed && <div className="mt-6 rounded-lg border border-zinc-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40"><p className="text-xs font-medium">Your library</p><p className="mt-1 text-[11px] text-zinc-500">Capture something worth keeping.</p></div>}<div className="mt-auto space-y-1"><SidebarLink href="/settings" label="Settings" icon="*" collapsed={collapsed} active={pathname.startsWith("/settings")} />{footer}</div></div></aside>;
}

function SidebarLink({ href, label, icon, collapsed, active }: { href: string; label: string; icon: string; collapsed: boolean; active: boolean }) {
  return <Link href={href} title={collapsed ? label : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${collapsed ? "justify-center px-0" : ""} ${active ? "bg-zinc-200/80 font-medium text-zinc-950 dark:bg-zinc-800 dark:text-white" : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"}`}><span className="flex w-5 justify-center text-sm">{icon}</span>{!collapsed && label}</Link>;
}
