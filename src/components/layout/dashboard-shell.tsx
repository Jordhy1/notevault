import { signOut } from "@/auth";
import { SearchBar } from "@/components/search/search-bar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { KeyboardShortcuts } from "@/components/keyboard/keyboard-shortcuts";
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar";
import { NotesCacheProvider } from "@/components/notes/notes-cache-provider";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <KeyboardShortcuts />
      <WorkspaceSidebar
        footer={
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white">
              <span className="flex w-5 justify-center">↪</span><span>Sign out</span>
            </button>
          </form>
        }
      />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-[var(--background)]/90 px-5 py-3 backdrop-blur dark:border-zinc-800/80 md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <SearchBar />
            <div className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 sm:flex">JR</div>
          </div>
        </header>
        <NotesCacheProvider><main className="w-full min-w-0 p-5 pb-28 md:p-8 lg:p-10"><div className="mx-auto max-w-7xl">{children}</div></main></NotesCacheProvider>
      </div>
      <MobileNav />
    </div>
  );
}
