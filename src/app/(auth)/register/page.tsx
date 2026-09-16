import { signIn } from "@/auth";
import { registerWithPassword } from "@/features/auth/mutations";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-6 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold">Create your NoteVault account</h1>
        <form className="mt-6 space-y-4" action={async (formData) => {
          "use server";
          await registerWithPassword({ name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") });
          await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/" });
        }}>
          <input name="name" required placeholder="Name" className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-950" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-950" />
          <input name="password" type="password" minLength={8} required placeholder="Password (min. 8 characters)" className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-950" />
          <button type="submit" className="w-full rounded-lg bg-zinc-950 px-4 py-3 font-medium text-white dark:bg-white dark:text-zinc-950">Create account</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-zinc-500"><span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />OR<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" /></div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border px-6 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Sign up with Google
          </button>
        </form>
        <p className="mt-6 text-sm text-zinc-500">Already have an account? <Link href="/login" className="underline">Sign in</Link></p>
      </div>
    </main>
  );
}
