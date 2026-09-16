import { ThemeSelector } from "@/components/theme/theme-selector";
export default function SettingsPage() { return <><h1 className="text-3xl font-bold">Settings</h1><section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"><h2 className="text-lg font-semibold">Appearance</h2><p className="mt-2 text-sm text-zinc-500">System is the default and follows your device preference.</p><div className="mt-5"><ThemeSelector /></div></section></>;
}
