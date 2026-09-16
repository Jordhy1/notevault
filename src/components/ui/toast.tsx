"use client";

type ToastProps = { message: string; tone?: "success" | "error" };

export function Toast({ message, tone = "success" }: ToastProps) {
  if (!message) return null;
  return <div role="status" className={`fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${tone === "error" ? "bg-red-700" : "bg-zinc-950 dark:bg-white dark:text-zinc-950"}`}>{message}</div>;
}
